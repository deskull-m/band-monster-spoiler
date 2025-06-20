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
                    [this.depth, this.rarity, this.weight, this.cost] = values.map(v => v.trim());
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
                        <strong>tval/sval/pval</strong><br />
                        {item.tval} / {item.sval} / {item.pval}
                    </div>
                    <div>
                        <strong>階/レア/重さ/値段</strong><br />
                        {item.depth} / {item.rarity} / {item.weight} / {item.cost}
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

// HTML側で <div id="item-root"></div> を用意し、以下でマウント
//