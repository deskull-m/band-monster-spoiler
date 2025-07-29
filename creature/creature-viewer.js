function FileReaderComponent() {
    const [infoList, setInfoList] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [sortType, setSortType] = React.useState("id-asc");
    const [sorting, setSorting] = React.useState(false);
    const [editingCreature, setEditingCreature] = React.useState(null);
    const [editingIndex, setEditingIndex] = React.useState(-1);
    const [searchText, setSearchText] = React.useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLoading(true);
                setProgress(0);
                const text = e.target.result;
                const datas = text.split(/\r\nN\:/);
                let list = [];
                const total = datas.length - 1;

                function processChunk(i) {
                    if (i < datas.length) {
                        let data = "N:" + datas[i];
                        let creature = new Creature(data);
                        list.push(creature);
                        setProgress(Math.round((i / total) * 100));

                        if (i % 10 === 0) {
                            setTimeout(() => processChunk(i + 1), 0);
                        } else {
                            processChunk(i + 1);
                        }
                    } else {
                        setInfoList(list);
                        setProgress(100);
                        setLoading(false);
                    }
                }
                processChunk(1);
            };
            reader.readAsText(file);
        }
    };

    const handleUrlLoad = async () => {
        setLoading(true);
        setProgress(0);
        try {
            const response = await fetch('https://raw.githubusercontent.com/deskull-m/bakabakaband/refs/heads/develop/lib/edit/MonsterRaceDefinitions.txt');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();

            // GitHubデータは改行コードが\nのみの可能性があるので、より柔軟な分割を行う
            const datas = text.split(/\r?\n(?=N:)/);

            let list = [];
            const total = datas.length;
            let processedCount = 0;

            // バッチ処理でタイムアウトを防ぐ
            function processChunk(startIndex) {
                const batchSize = 100; // バッチサイズを増やして効率化
                const endIndex = Math.min(startIndex + batchSize, datas.length);

                for (let i = startIndex; i < endIndex; i++) {
                    let data = datas[i];

                    // データの前処理と検証を強化
                    if (!data || !data.trim()) continue;

                    // N:で始まっていない場合はスキップ
                    if (!data.trim().startsWith('N:')) {
                        continue;
                    }

                    // 改行コードを統一（GitHubは\nだけの可能性）
                    data = data.replace(/\r?\n/g, '\r\n');

                    try {
                        let creature = new Creature(data);
                        if (creature && creature.serialNumber != null && creature.name) {
                            list.push(creature);
                        }
                    } catch (creatureError) {
                        // エラーのあるエントリはスキップして続行
                    }
                    processedCount++;
                }

                const progress = Math.round((processedCount / total) * 100);
                setProgress(progress);

                if (endIndex < datas.length) {
                    // 次のバッチを非同期で処理
                    setTimeout(() => processChunk(endIndex), 1); // タイムアウトを短縮
                } else {
                    setInfoList(list);
                    setProgress(100);
                    setLoading(false);
                }
            }

            // 処理開始
            processChunk(0);
        } catch (error) {
            console.error('GitHubからの読み込みエラー:', error);
            alert('GitHubからの読み込みに失敗しました: ' + error.message);
            setLoading(false);
            setProgress(0);
        }
    };

    const handleJsonImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLoading(true);
                setProgress(0);
                try {
                    let text = e.target.result;
                    text = text.replace(/\/\/.*$/mg, "")
                        .replace(/\/\*[\s\S]*?\*\//g, "");
                    let obj;
                    try {
                        obj = JSON.parse(text);
                    } catch (jsonErr) {
                        alert("JSONのパースに失敗しました: " + jsonErr.message);
                        setLoading(false);
                        return;
                    }
                    let monstersArr = [];
                    if (Array.isArray(obj)) {
                        monstersArr = obj;
                    } else if (Array.isArray(obj.monsters)) {
                        monstersArr = obj.monsters;
                    } else {
                        alert("不正なJSON形式です（配列またはmonstersプロパティが必要）");
                        setLoading(false);
                        return;
                    }
                    let creatures = [];
                    try {
                        creatures = monstersArr.map((data, idx) => {
                            try {
                                if (data.evolve) {
                                    data.next_exp = data.evolve.need_exp ?? 0;
                                    data.next_mon = data.evolve.to ?? 0;
                                }
                                if (Array.isArray(data.blows)) {
                                    data.blows = data.blows.map(b => ({
                                        method: b.method ?? "",
                                        effect: b.effect ?? "",
                                        damage_dice: b.damage_dice ?? ""
                                    }));
                                }
                                if (Array.isArray(data.escorts)) {
                                    data.escorts = data.escorts.map(e => ({
                                        escorts_id: e.escorts_id,
                                        escort_num: e.escort_num
                                    }));
                                }
                                if (Array.isArray(data.artifacts)) {
                                    data.artifacts = data.artifacts.map(a => ({
                                        drop_artifact_id: a.drop_artifact_id,
                                        drop_probability: a.drop_probability
                                    }));
                                }
                                return Creature.getJson(data);
                            } catch (e) {
                                throw new Error(`monsters[${idx}]の変換に失敗: ${e.message}`);
                            }
                        });
                    } catch (convErr) {
                        alert("データ変換エラー: " + convErr.message);
                        setLoading(false);
                        return;
                    }
                    setInfoList(creatures);
                    setProgress(100);
                } catch (e) {
                    alert("JSONの読み込みに失敗しました: " + e.message);
                }
                setLoading(false);
            };
            reader.readAsText(file);
        }
    };

    const handleAddNewMonster = () => {
        // 新しいモンスターIDを決定（既存の最大ID + 1）
        const maxId = infoList.length > 0 ? Math.max(...infoList.map(c => c.serialNumber)) : 0;
        const newId = maxId + 1;

        // 新しいモンスターのデフォルトデータを作成
        const newMonsterData = `N:${newId}:新しいモンスター
E:NewMonster
G:?:w
I:110:1d1:10:10:0
W:1:1:0:0:0
F:BASH_DOOR`;

        try {
            const newCreature = new Creature(newMonsterData);
            if (newCreature && newCreature.serialNumber != null && newCreature.name) {
                const newList = [...infoList, newCreature];
                setInfoList(newList);

                // 新しく追加されたモンスターにスクロール
                setTimeout(() => {
                    const anchor = document.getElementById(`creature-${newId}`);
                    if (anchor) {
                        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 100);

                alert(`新しいモンスター（ID: ${newId}）が追加されました`);
            } else {
                alert('新しいモンスターの作成に失敗しました');
            }
        } catch (error) {
            console.error('新しいモンスター作成エラー:', error);
            alert('新しいモンスターの作成中にエラーが発生しました: ' + error.message);
        }
    };

    const handleAddNewMonsterFromTemplate = (template) => {
        // 新しいモンスターIDを決定（既存の最大ID + 1）
        const maxId = infoList.length > 0 ? Math.max(...infoList.map(c => c.serialNumber)) : 0;
        const newId = maxId + 1;

        // テンプレートに基づいてデータを作成
        let newMonsterData;
        switch (template) {
            case 'weak':
                newMonsterData = `N:${newId}:弱いモンスター
E:WeakMonster
G:w:w
I:110:1d4:10:5:10
W:1:1:1:0:0
F:BASH_DOOR`;
                break;
            case 'normal':
                newMonsterData = `N:${newId}:普通のモンスター
E:NormalMonster
G:o:B
I:110:3d8:12:15:20
W:10:2:50:0:0
F:BASH_DOOR | OPEN_DOOR`;
                break;
            case 'strong':
                newMonsterData = `N:${newId}:強いモンスター
E:StrongMonster
G:O:r
I:120:10d10:15:25:30
W:30:1:1000:0:0
F:BASH_DOOR | OPEN_DOOR | SMART`;
                break;
            case 'unique':
                newMonsterData = `N:${newId}:ユニークモンスター
E:UniqueMonster
G:@:v
I:115:20d20:20:30:50
W:50:1:5000:0:0
F:UNIQUE | MALE | SMART | BASH_DOOR | OPEN_DOOR`;
                break;
            default:
                newMonsterData = `N:${newId}:新しいモンスター
E:NewMonster
G:?:w
I:110:1d1:10:10:0
W:1:1:0:0:0
F:BASH_DOOR`;
        }

        try {
            const newCreature = new Creature(newMonsterData);
            if (newCreature && newCreature.serialNumber != null && newCreature.name) {
                const newList = [...infoList, newCreature];
                setInfoList(newList);

                // 新しく追加されたモンスターにスクロール
                setTimeout(() => {
                    const anchor = document.getElementById(`creature-${newId}`);
                    if (anchor) {
                        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 100);

                alert(`新しいモンスター（ID: ${newId}）が追加されました`);
            } else {
                alert('新しいモンスターの作成に失敗しました');
            }
        } catch (error) {
            console.error('新しいモンスター作成エラー:', error);
            alert('新しいモンスターの作成中にエラーが発生しました: ' + error.message);
        }
    };

    const handleDeleteMonster = (serialNumber) => {
        if (confirm(`モンスター ID: ${serialNumber} を削除しますか？この操作は取り消せません。`)) {
            const newList = infoList.filter(creature => creature.serialNumber !== serialNumber);
            setInfoList(newList);
            alert(`モンスター ID: ${serialNumber} が削除されました`);
        }
    };

    const handleCopyMonster = (originalCreature) => {
        // 新しいモンスターIDを決定（既存の最大ID + 1）
        const maxId = infoList.length > 0 ? Math.max(...infoList.map(c => c.serialNumber)) : 0;
        const newId = maxId + 1;

        try {
            // 元のモンスターのテキストデータをコピーして新しいIDに変更
            const originalData = originalCreature.textDetails;
            const newData = originalData.replace(
                /^N:\d+:(.*)$/m,
                `N:${newId}:${originalCreature.name}のコピー`
            );

            const newCreature = new Creature(newData);
            if (newCreature && newCreature.serialNumber != null && newCreature.name) {
                const newList = [...infoList, newCreature];
                setInfoList(newList);

                // 新しく追加されたモンスターにスクロール
                setTimeout(() => {
                    const anchor = document.getElementById(`creature-${newId}`);
                    if (anchor) {
                        anchor.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                }, 100);

                alert(`モンスター「${originalCreature.name}」がコピーされました（新ID: ${newId}）`);
            } else {
                alert('モンスターのコピーに失敗しました');
            }
        } catch (error) {
            console.error('モンスターコピーエラー:', error);
            alert('モンスターのコピー中にエラーが発生しました: ' + error.message);
        }
    };

    const handleEditMonster = (creature, index) => {
        // sortedListのindexではなく、infoList内での実際のindexを取得
        const actualIndex = infoList.findIndex(c => c.serialNumber === creature.serialNumber);
        setEditingCreature(creature);
        setEditingIndex(actualIndex);
    };

    const handleSaveEdit = (updatedCreature) => {
        if (editingIndex === -1) {
            alert('編集対象のモンスターが見つかりません');
            return;
        }

        const newList = [...infoList];
        newList[editingIndex] = updatedCreature;
        setInfoList(newList);
        setEditingCreature(null);
        setEditingIndex(-1);
        alert('モンスターが更新されました');
    };

    const handleCancelEdit = () => {
        setEditingCreature(null);
        setEditingIndex(-1);
    };

    const filteredList = React.useMemo(() => {
        return infoList.filter(creature => {
            if (!searchText.trim()) return true;
            const searchLower = searchText.toLowerCase();
            return (
                (creature.name && creature.name.toLowerCase().includes(searchLower)) ||
                (creature.english_name && creature.english_name.toLowerCase().includes(searchLower))
            );
        });
    }, [infoList, searchText]);

    const [sortedList, setSortedList] = React.useState([]);

    React.useEffect(() => {
        // データが空の場合はソート処理をスキップ
        if (filteredList.length === 0) {
            setSortedList([]);
            setSorting(false);
            return;
        }

        setSorting(true);

        // より短いタイムアウトでソート処理を実行
        const timeoutId = setTimeout(() => {
            const sorted = [...filteredList].sort((a, b) => {
                switch (sortType) {
                    case "id-asc": return a.serialNumber - b.serialNumber;
                    case "id-desc": return b.serialNumber - a.serialNumber;
                    case "level-asc": return a.depth - b.depth;
                    case "level-desc": return b.depth - a.depth;
                    case "speed-asc": return a.speed - b.speed;
                    case "speed-desc": return b.speed - a.speed;
                    case "hp-asc": return a.hp_expected - b.hp_expected;
                    case "hp-desc": return b.hp_expected - a.hp_expected;
                    case "ac-asc": return a.armor_class - b.armor_class;
                    case "ac-desc": return b.armor_class - a.armor_class;
                    case "vision-asc": return a.vision - b.vision;
                    case "vision-desc": return b.vision - a.vision;
                    case "alert-asc": return a.alertness - b.alertness;
                    case "alert-desc": return b.alertness - a.alertness;
                    case "rarity-asc": return a.rarity - b.rarity;
                    case "rarity-desc": return b.rarity - a.rarity;
                    default: return 0;
                }
            });
            setSortedList(sorted);
            setSorting(false);
        }, 10);

        // クリーンアップ関数でタイムアウトをクリア
        return () => clearTimeout(timeoutId);
    }, [filteredList, sortType]);

    return (
        <div id="container">
            <h1>*bandモンスターエディタ</h1>
            <div style={{ marginBottom: "1em" }}>
                <div style={{ marginBottom: "0.5em" }}>
                    <input type="file" accept=".txt" onChange={handleFileChange} />
                    <span style={{ margin: "0 0.5em", color: "#ccc" }}>(ローカルファイル)</span>
                    <button
                        onClick={handleUrlLoad}
                        style={{
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.5em 1em",
                            cursor: "pointer",
                            marginLeft: "0.5em"
                        }}
                        disabled={loading}
                    >
                        GitHubから読み込み
                    </button>
                </div>
                <div>
                    <input
                        type="file"
                        accept=".json,.jsonc,application/json"
                        onChange={handleJsonImport}
                    />
                    <span style={{ margin: "0 0.5em", color: "#ccc" }}>(json/jsonc)</span>
                </div>
                <div style={{ marginTop: "0.5em" }}>
                    <button
                        onClick={handleAddNewMonster}
                        style={{
                            background: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.5em 1em",
                            cursor: "pointer",
                            marginRight: "0.5em"
                        }}
                        disabled={loading}
                    >
                        ➕ 新規モンスター追加
                    </button>
                    <div style={{ display: "inline-block", marginLeft: "0.5em" }}>
                        <span style={{ marginRight: "0.5em", color: "#666" }}>テンプレート:</span>
                        <button
                            onClick={() => handleAddNewMonsterFromTemplate('weak')}
                            style={{
                                background: "#6c757d",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                padding: "0.3em 0.6em",
                                cursor: "pointer",
                                marginRight: "0.3em",
                                fontSize: "0.9em"
                            }}
                            disabled={loading}
                        >
                            弱敵
                        </button>
                        <button
                            onClick={() => handleAddNewMonsterFromTemplate('normal')}
                            style={{
                                background: "#17a2b8",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                padding: "0.3em 0.6em",
                                cursor: "pointer",
                                marginRight: "0.3em",
                                fontSize: "0.9em"
                            }}
                            disabled={loading}
                        >
                            普通
                        </button>
                        <button
                            onClick={() => handleAddNewMonsterFromTemplate('strong')}
                            style={{
                                background: "#dc3545",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                padding: "0.3em 0.6em",
                                cursor: "pointer",
                                marginRight: "0.3em",
                                fontSize: "0.9em"
                            }}
                            disabled={loading}
                        >
                            強敵
                        </button>
                        <button
                            onClick={() => handleAddNewMonsterFromTemplate('unique')}
                            style={{
                                background: "#ffd700",
                                color: "#333",
                                border: "none",
                                borderRadius: "3px",
                                padding: "0.3em 0.6em",
                                cursor: "pointer",
                                fontSize: "0.9em"
                            }}
                            disabled={loading}
                        >
                            ユニーク
                        </button>
                    </div>
                    <div style={{ marginTop: "0.3em" }}>
                        <span style={{ color: "#666", fontSize: "0.9em" }}>
                            新しいモンスターをリストの最後に追加します
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: "1em" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
                    <label htmlFor="monster-search" style={{ color: "#666", fontSize: "0.9em" }}>
                        モンスター検索:
                    </label>
                    <input
                        id="monster-search"
                        type="text"
                        placeholder="日本語名または英語名で検索..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{
                            padding: "0.5em",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            fontSize: "0.9em",
                            width: "300px"
                        }}
                    />
                    {searchText && (
                        <button
                            onClick={() => setSearchText("")}
                            style={{
                                background: "#6c757d",
                                color: "white",
                                border: "none",
                                borderRadius: "3px",
                                padding: "0.3em 0.6em",
                                cursor: "pointer",
                                fontSize: "0.8em"
                            }}
                        >
                            クリア
                        </button>
                    )}
                    <span style={{ color: "#666", fontSize: "0.8em", marginLeft: "0.5em" }}>
                        {filteredList.length} / {infoList.length} 件
                    </span>
                </div>
            </div>

            {loading && (
                <div style={{ margin: "1em 0" }}>
                    <div style={{
                        width: "100%",
                        background: "#eee",
                        borderRadius: "4px",
                        overflow: "hidden",
                        height: "1.2em"
                    }}>
                        <div style={{
                            width: `${progress}%`,
                            background: "#4caf50",
                            height: "100%",
                            transition: "width 0.2s"
                        }} />
                    </div>
                    <div style={{ textAlign: "right", fontSize: "0.9em" }}>{progress}%</div>
                </div>
            )}

            <div style={{ textAlign: "right", margin: "1em 0" }}>
                <button
                    style={{
                        background: "#333c44",
                        color: "#e0e0e0",
                        border: "1px solid #555",
                        borderRadius: "4px",
                        padding: "0.5em 1em",
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        const monstetBlock = `[${infoList.map(c => c.putJson()).join(",\n")}]`;
                        const allJson = `{\n"versions": 1.0,\n"monsters": ${monstetBlock}\n}`;
                        const blob = new Blob([allJson], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "all_monsters.jsonc";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }}
                >
                    JSONCエクスポート
                </button>
            </div>

            <div id="editor">
                <div id="pagenation">
                    <div id="sort" style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ marginRight: "1em" }}>ソート:</span>
                        <label style={{ marginRight: "0.5em" }}>
                            <input
                                type="radio"
                                name="sort"
                                value="id-asc"
                                checked={sortType === "id-asc"}
                                onChange={() => setSortType("id-asc")}
                            />
                            ID昇順
                        </label>
                        <label style={{ marginRight: "0.5em" }}>
                            <input
                                type="radio"
                                name="sort"
                                value="id-desc"
                                checked={sortType === "id-desc"}
                                onChange={() => setSortType("id-desc")}
                            />
                            ID降順
                        </label>
                        {/* 他のソートオプションも同様に... */}
                    </div>
                </div>
                <div id="detail-lists">
                    <table className="table table-striped table-dark">
                        <thead>
                            <tr>
                                <th style={{ width: "80px" }}>ID</th>
                                <th style={{ width: "200px" }}>日本語名</th>
                                <th style={{ width: "200px" }}>英語名</th>
                                <th style={{ width: "80px" }}>レベル</th>
                                <th style={{ width: "100px", textAlign: "center" }}>シンボル</th>
                                <th style={{ width: "220px", textAlign: "center" }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedList.map((creature, index) => (
                                <MonsterTableRow
                                    key={index}
                                    creature={creature}
                                    index={index}
                                    infoList={infoList}
                                    onDelete={handleDeleteMonster}
                                    onCopy={handleCopyMonster}
                                    onEdit={handleEditMonster}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {sorting && filteredList.length > 0 && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(255,255,255,0.6)",
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            width: "60px",
                            height: "60px",
                            border: "8px solid #ccc",
                            borderTop: "8px solid #1976d2",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite"
                        }}
                    />
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg);}
                            100% { transform: rotate(360deg);}
                        }
                    `}</style>
                </div>
            )}

            {/* 編集フォーム */}
            {editingCreature && (
                <MonsterEditForm
                    creature={editingCreature}
                    onSave={handleSaveEdit}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}