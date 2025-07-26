function FileReaderComponent() {
    const [infoList, setInfoList] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [showUniqueOnly, setShowUniqueOnly] = React.useState(false);
    const [sortType, setSortType] = React.useState("id-asc");
    const [sorting, setSorting] = React.useState(false);

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

    const filteredList = showUniqueOnly
        ? infoList.filter(c => c.flags && c.flags.includes("UNIQUE"))
        : infoList;

    const [sortedList, setSortedList] = React.useState([]);
    React.useEffect(() => {
        setSorting(true);
        setTimeout(() => {
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
        }, 0);
    }, [filteredList, sortType]);

    return (
        <div id="container">
            <h1>*bandモンスターエディタ</h1>
            <div style={{ marginBottom: "1em" }}>
                <input type="file" accept=".txt" onChange={handleFileChange} />
                <span style={{ margin: "0 0.5em" }}>(旧型式)</span>
            </div>
            <div style={{ marginBottom: "1em" }}>
                <input
                    type="file"
                    accept=".json,.jsonc,application/json"
                    onChange={handleJsonImport}
                />
                <span style={{ margin: "0 0.5em" }}>(json/jsonc)</span>
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
                    <div id="search">
                        <input type="text" id="searchText" placeholder="検索" />
                        <button id="searchButton">検索</button>
                    </div>
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
                        <button
                            id="uniqueFilterButton"
                            style={{
                                marginLeft: "1em",
                                background: showUniqueOnly ? "#ffd700" : "#f5f5f5",
                                color: "#333",
                                border: "1px solid #888",
                                borderRadius: "4px",
                                padding: "0.3em 1em",
                                cursor: "pointer"
                            }}
                            onClick={() => setShowUniqueOnly(v => !v)}
                        >
                            {showUniqueOnly ? "UNIQUEのみ表示中（解除）" : "UNIQUEのみ表示"}
                        </button>
                        <div id="jump">
                            <select
                                id="jumpSelect"
                                onChange={e => {
                                    const anchorId = e.target.value;
                                    if (anchorId) {
                                        const anchor = document.getElementById(anchorId);
                                        if (anchor) {
                                            anchor.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }
                                    }
                                }}
                                defaultValue=""
                            >
                                <option value="" disabled>モンスターへジャンプ</option>
                                {filteredList.map((creature) => {
                                    const label = `${creature.serialNumber} : ${creature.name}`;
                                    const truncated = label.length > 50 ? label.slice(0, 47) + "..." : label;
                                    return (
                                        <option
                                            key={creature.serialNumber}
                                            value={`creature-${creature.serialNumber}`}
                                        >
                                            {truncated}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div id="detail-lists">
                    {sortedList.map((creature, index) => (
                        <MonsterDetail key={index} creature={creature} index={index} infoList={infoList} />
                    ))}
                </div>
            </div>
            {sorting && (
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
        </div>
    );
}