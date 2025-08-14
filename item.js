class Item {
    constructor(text) {
        const lines = text.split(/\r?\n/);
        let _ = undefined;
        this.rawText = text;
        this.flavor_ja = "";
        this.flavor_en = "";
        for (const line of lines) {
            if (!line.trim()) continue;
            const key = line.charAt(0);
            const values = line.substring(2).split(":");
            switch (key) {
                case "N":
                    [this.serialNumber, this.name] = values.map(v => v.trim());
                    break;
                case "E":
                    [this.ename] = values.map(v => v.trim());
                    break;
                case "G":
                    [this.symbol, this.color] = values.map(v => v.trim());
                    break;
                case "I":
                    [this.tval, this.sval, this.pval] = values.map(v => v.trim());
                    break;
                case "W":
                    if(values.length === 4) {
                        [this.depth, _, this.weight, this.cost] = values.map(v => v.trim());
                    }
                    else if (values.length === 3) {
                        [this.depth, this.weight, this.cost] = values.map(v => v.trim());
                    }
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
                case "D":
                    const flavorLine = line.substring(2).trim();
                    if (flavorLine.startsWith("$")) {
                        this.flavor_en += flavorLine.substring(1).trim();
                    } else {
                        this.flavor_ja += flavorLine;
                    }
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
                <strong>No.{item.serialNumber}</strong> {item.name} / {item.ename}
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
                <div className="progress-container">
                    <div className="progress-bar">
                        <div 
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="progress-text">{progress}%</div>
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

    // allocations
    let allocations = [];
    if (this.alloc) {
        allocations = this.alloc.map(a => {
            const [depth, rarity] = a.split(":").map(x => Number(x.trim()));
            return { depth, rarity };
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
            color: colorSymbol[this.color] ?? this.color ?? ""
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
        flags: this.flags ? [...this.flags] : [],
        flavor: {
            ja: this.flavor_ja,
            en: this.flavor_en
        }
    };
};

// 使い方例：
// const jsonList = items.map(item => item.toJson());