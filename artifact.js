class Artifact {
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
                case "I":
                    [this.tval, this.sval, this.pval] = values.map(v => v.trim());
                    break;
                case "W":
                    [this.depth, this.rarity, this.weight, this.cost] = values.map(v => v.trim());
                    break;
                case "P":
                    [this.base_ac, this.base_damage, this.plus_to_hit, this.plus_to_dam, this.plus_to_ac] = values.map(v => v.trim());
                    break;
                case "F":
                    if (!this.flags) this.flags = [];
                    this.flags.push(...line.substring(2).split("|").map(f => f.trim()).filter(f => f));
                    break;
            }
        }
    }
}

function parseArtifactData(text) {
    const datas = text.split(/\r?\nN:/);
    const artifacts = [];
    for (let i = 1; i < datas.length; ++i) {
        const artifactText = "N:" + datas[i];
        artifacts.push(new Artifact(artifactText));
    }
    return artifacts;
}

function ArtifactDetail({ artifact }) {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <strong>No.{artifact.serialNumber}</strong> {artifact.name}
            </div>
            <div className="card-body">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5em" }}>
                    <div>
                        <strong>tval/sval/pval</strong><br />
                        {artifact.tval} / {artifact.sval} / {artifact.pval}
                    </div>
                    <div>
                        <strong>階/レア/重さ/値段</strong><br />
                        {artifact.depth} / {artifact.rarity} / {artifact.weight} / {artifact.cost}
                    </div>
                    <div>
                        <strong>基礎AC/ダメ/命中/ダメ+/AC+</strong><br />
                        {artifact.base_ac} / {artifact.base_damage} / {artifact.plus_to_hit} / {artifact.plus_to_dam} / {artifact.plus_to_ac}
                    </div>
                    <div>
                        <strong>フラグ</strong><br />
                        {artifact.flags ? artifact.flags.join(", ") : "―"}
                    </div>
                </div>
                <details style={{ marginTop: "1em" }}>
                    <summary>生データ</summary>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{artifact.rawText}</pre>
                </details>
            </div>
        </div>
    );
}

function ArtifactViewer() {
    const [artifacts, setArtifacts] = React.useState([]);
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
                    const parsed = parseArtifactData(e.target.result);
                    setArtifacts(parsed);
                    setProgress(100);
                    setLoading(false);
                }, 0);
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="container mt-4">
            <h1>*band アーティファクトリスト</h1>
            <p>アーティファクト定義ファイルを読み込んで下さい</p>
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
                        const artifactBlock = JSON.stringify(artifacts.map(a => a.toJson()), null, 2);
                        const allJson = `{\n  "version": 1.0,\n  "artifacts": ${artifactBlock}\n}`;
                        const blob = new Blob([allJson], { type: "application/json" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "all_artifacts.jsonc";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }}
                >
                    JSONCエクスポート
                </button>
            </div>
            <div>
                {artifacts.map(artifact => (
                    <ArtifactDetail key={artifact.serialNumber} artifact={artifact} />
                ))}
            </div>
        </div>
    );
}

Artifact.prototype.toJson = function () {
    // フレーバー抽出（F:FLAVOR_JA:xxx|FLAVOR_EN:yyy|... などがあれば対応）
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
        base_item: {
            type_value: Number(this.tval) || 0,
            subtype_value: Number(this.sval) || 0
        },
        parameter_value: Number(this.pval) || 0,
        level: Number(this.depth) || 0,
        rarity: Number(this.rarity) || 0,
        weight: Number(this.weight) || 0,
        cost: Number(this.cost) || 0,
        base_ac: Number(this.base_ac) || 0,
        base_dice: this.base_damage ?? "",
        hit_bonus: Number(this.plus_to_hit) || 0,
        damage_bonus: Number(this.plus_to_dam) || 0,
        ac_bonus: Number(this.plus_to_ac) || 0,
        flags: this.flags ? [...this.flags] : [],
        flavor: {
            ja: flavor_ja,
            en: flavor_en
        }
    };
};
