class Item {
    constructor(text) {
        const lines = text.split(/\r?\n/);
        this.rawText = text;
        for (const line of lines) {
            if (!line.trim()) continue;
            const key = line.charAt(0);
            const values = line.substring(2).split(":");
            switch (key) {
                case "N":
                    [this.serialNumber, this.name] = values.map(v => v.trim());
                    break;
                case "G":
                    [this.symbol, this.color] = values.map(v => v.trim());
                    break;
                case "I":
                    [this.tval, this.sval, this.pval] = values.map(v => v.trim());
                    break;
                case "W":
                    [this.depth, this.weight, this.cost] = values.map(v => v.trim());
                    break;
                case "P":
                    [this.base_ac, this.base_damage, this.plus_to_hit, this.plus_to_dam, this.plus_to_ac] = values.map(v => v.trim());
                    break;
                case "A":
                    if (!this.alloc) this.alloc = [];
                    this.alloc.push(values.map(v => v.trim()).join(":"));
                    break;
                case "F":
                    if (!this.flags) this.flags = [];
                    this.flags.push(...line.substring(2).split("|").map(f => f.trim()).filter(f => f));
                    break;
            }
        }
    }
}

function parseItemData(text) {
    // 各アイテムごとに分割
    const datas = text.split(/\r?\nN:/);
    const items = [];
    for (let i = 1; i < datas.length; ++i) {
        const itemText = "N:" + datas[i];
        items.push(new Item(itemText));
    }
    return items;
}

function ItemDetail({ item }) {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <strong>No.{item.serialNumber}</strong> {item.name}
            </div>
            <div className="card-body">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5em" }}>
                    <div>
                        <strong>記号/色</strong><br />
                        {item.symbol} / {item.color}
                    </div>
                    <div>
                        <strong>種別</strong><br />
                        {
                            (() => {
                                const tvalMap = {
                                    0: "なし",
                                    1: "スケルトン",
                                    2: "空き瓶",
                                    3: "ガラクタ",
                                    4: "ホイッスル",
                                    5: "スパイク",
                                    7: "宝箱",
                                    8: "魔法の像",
                                    9: "彫像",
                                    10: "モンスターの死体/骨",
                                    11: "モンスターボール",
                                    15: "クリムゾン用弾薬",
                                    16: "スリング用弾",
                                    17: "弓用矢",
                                    18: "クロスボウ用ボルト",
                                    19: "投射武器",
                                    20: "シャベル/つるはし",
                                    21: "メイス系武器",
                                    22: "斧/槍系武器",
                                    23: "剣系武器",
                                    30: "ブーツ",
                                    31: "グローブ",
                                    32: "兜",
                                    33: "冠",
                                    34: "盾",
                                    35: "クローク",
                                    36: "ソフトアーマー",
                                    37: "ハードアーマー",
                                    38: "ドラゴンスケイルメイル",
                                    39: "光源",
                                    40: "アミュレット",
                                    45: "指輪",
                                    50: "カード",
                                    55: "スタッフ",
                                    65: "ワンド",
                                    66: "ロッド",
                                    69: "書物",
                                    70: "巻物",
                                    75: "薬",
                                    77: "フラスコ",
                                    80: "食料",
                                    90: "生命の書",
                                    91: "魔術の書",
                                    92: "自然の書",
                                    93: "カオスの書",
                                    94: "死の書",
                                    95: "トランプの書",
                                    96: "秘術の書",
                                    97: "クラフトの書",
                                    98: "デーモンの書",
                                    99: "聖戦の書",
                                    105: "音楽の書",
                                    106: "必殺の書",
                                    107: "ヘックスの書",
                                    108: "罠",
                                    109: "素材",
                                    127: "金貨"
                                };
                                const tvalId = Number(item.tval);
                                const tvalName = tvalMap.hasOwnProperty(tvalId) ? tvalMap[tvalId] : "不明";
                                return `${item.tval} (${tvalName})`;
                            })()
                        }
                    </div>
                    <div>
                        <strong>tval/sval/pval</strong><br />
                        {item.tval} / {item.sval} / {item.pval}
                    </div>
                    <div>
                        <strong>階/重さ/値段</strong><br />
                        {item.depth} / {item.weight} / {item.cost}
                    </div>
                    <div>
                        <strong>基礎AC/ダメ/命中/ダメ+/AC+</strong><br />
                        {item.base_ac} / {item.base_damage} / {item.plus_to_hit} / {item.plus_to_dam} / {item.plus_to_ac}
                    </div>
                    <div>
                        <strong>配分</strong><br />
                        {item.alloc ? item.alloc.join(", ") : "―"}
                    </div>
                    <div>
                        <strong>フラグ</strong><br />
                        {item.flags ? item.flags.join(", ") : "―"}
                    </div>
                </div>
                <details style={{ marginTop: "1em" }}>
                    <summary>生データ</summary>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{item.rawText}</pre>
                </details>
            </div>
        </div>
    );
}

function ItemViewer() {
    const [items, setItems] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [loading, setLoading] = React.useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLoading(true);
                setProgress(0);
                setTimeout(() => {
                    const parsed = parseItemData(e.target.result);
                    setItems(parsed);
                    setProgress(100);
                    setLoading(false);
                }, 0);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="container mt-4">
            <h1>*band アイテムリスト</h1>
            <p>アイテム定義ファイルを読み込んで下さい</p>
            <input type="file" accept=".txt" onChange={handleFileChange} />
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
            <div>
                {items.map(item => (
                    <ItemDetail key={item.serialNumber} item={item} />
                ))}
            </div>
        </div>
    );
}

Item.prototype.toJson = function () {
    // 色名変換
    const colorMap = {
        'D': 'Black', 'w': 'White', 's': 'Gray', 'o': 'Orange',
        'r': 'Red', 'g': 'Green', 'b': 'Blue', 'u': 'Brown',
        'd': 'Dark Gray', 'W': 'Light Gray', 'v': 'Violet', 'y': 'Yellow',
        'R': 'Light Red', 'G': 'Light Green', 'B': 'Light Blue', 'U': 'Light Brown'
    };
    // allocations
    let allocations = [];
    if (this.alloc) {
        allocations = this.alloc.map(a => {
            const [depth, rarity] = a.split(":").map(x => Number(x.trim()));
            return { depth, rarity };
        });
    }
    // flavor抽出（例: F:FLAVOR_JA:xxx|FLAVOR_EN:yyy|... などがあれば対応）
    let flavor_ja = "";
    let flavor_en = "";
    if (this.flags) {
        this.flags.forEach(f => {
            if (f.startsWith("FLAVOR_JA:")) flavor_ja = f.replace("FLAVOR_JA:", "");
            if (f.startsWith("FLAVOR_EN:")) flavor_en = f.replace("FLAVOR_EN:", "");
        });
    }
    return {
        id: Number(this.serialNumber),
        name: {
            ja: this.name ?? "",
            en: this.ename ?? ""
        },
        symbol: {
            character: this.symbol != "" && this.symbol != null ? this.symbol : " ",
            color: colorMap[this.color] ?? this.color ?? ""
        },
        itemkind: {
            type_value: Number(this.tval) || 0,
            subtype_value: Number(this.sval) || 0
        },
        parameter_value: Number(this.pval) || 0,
        level: Number(this.depth) || 0,
        weight: Number(this.weight) || 0,
        cost: Number(this.cost) || 0,
        base_ac: Number(this.base_ac) || 0,
        base_dice: this.base_damage || "0d0",
        hit_bonus: Number(this.plus_to_hit) || 0,
        damage_bonus: Number(this.plus_to_dam) || 0,
        ac_bonus: Number(this.plus_to_ac) || 0,
        allocations: [ {
            depth: Number(this.depth) || 0,
            rarity: Number(this.rarity) || 1,
        } ],
        flavor: {
            ja: flavor_ja,
            en: flavor_en
        }
    };
};

// 使い方例：
// const jsonList = items.map(item => item.toJson());