class Terrain {
    constructor(text) {
        const lines = text.split(/\r?\n/);
        this.rawText = text;
        this.flavor_ja = "";
        this.flavor_en = "";

        for (const line of lines) {
            if (!line.trim()) continue;
            const key = line.charAt(0);
            const values = line.substring(2).split(":");
            switch (key) {
                case "N":
                    [this.serialNumber, this.tag] = values.map(v => v.trim());
                    break;
                case "J":
                    [this.name] = values.map(v => v.trim());
                    break;
                case "E":
                    [this.ename] = values.map(v => v.trim());
                    break;
                case "G":
                    [this.symbol, this.color, this.attr_flags] = values.map(v => v.trim());
                    break;
                case "M":
                    [this.move_cost, this.line_of_sight] = values.map(v => v.trim());
                    break;
                case "B":
                    [this.priority, , this.lighting] = values.map(v => v.trim());
                    break;
                case "F":
                    if (!this.flags) this.flags = [];
                    this.flags.push(...line.substring(2).split("|").map(f => f.trim()).filter(f => f));
                    break;
                case "D":
                    const flavorLine = line.substring(2).trim();
                    if (flavorLine.startsWith("$")) {
                        this.flavor_en += (this.flavor_en ? "\n" : "") + flavorLine.substring(1).trim();
                    } else {
                        this.flavor_ja += (this.flavor_ja ? "\n" : "") + flavorLine;
                    }
                    break;
            }
        }
    }
}

function parseTerrainData(text) {
    const datas = text.split(/\r?\nN:/);
    const terrains = [];
    for (let i = 1; i < datas.length; ++i) {
        const terrainText = "N:" + datas[i];
        terrains.push(new Terrain(terrainText));
    }
    return terrains;
}

function TerrainDetail({ terrain }) {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <strong>No.{terrain.serialNumber}</strong> {terrain.name}
                {terrain.ename && <span> / {terrain.ename}</span>}
            </div>
            <div className="card-body">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5em" }}>
                    <div>
                        <strong>記号/色</strong><br />
                        {terrain.symbol} / {terrain.color}
                    </div>
                    <div>
                        <strong>フラグ</strong><br />
                        {terrain.flags ? terrain.flags.join(", ") : "―"}
                    </div>
                </div>
                <details style={{ marginTop: "1em" }}>
                    <summary>生データ</summary>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{terrain.rawText}</pre>
                </details>
                <details style={{ marginTop: "1em" }}>
                    <summary>JSONデータ</summary>
                    <pre style={{ whiteSpace: "pre-wrap" }}>
                        {JSON.stringify(terrain.toJson(), null, 2)}
                    </pre>
                </details>
            </div>
        </div>
    );
}

Terrain.prototype.toJson = function () {

    return {
        id: Number(this.serialNumber),
        name: {
            ja: this.name ?? "",
            en: this.ename ?? ""
        },
        symbol: {
            character: this.symbol ?? "",
            color: colorSymbol[this.color] ?? this.color ?? ""
        },
        movement: {
            cost: Number(this.move_cost) || 0,
            line_of_sight: this.line_of_sight === "1" || this.line_of_sight === "true"
        },
        priority: Number(this.priority) || 0,
        lighting: Number(this.lighting) || 0,
        attr_flags: this.attr_flags ?? "",
        flags: this.flags ? [...this.flags] : [],
        flavor: {
            ja: this.flavor_ja,
            en: this.flavor_en
        }
    };
};