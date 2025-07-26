function MonsterDetail({ creature, index, infoList }) {
    const [showModal, setShowModal] = React.useState(false);
    const [tab, setTab] = React.useState("rinfo");

    // 魔法・特殊能力の日本語化マップ
    const spellMap = {
        "SHRIEK": "叫ぶ",
        "DISPEL": "魔力消去",
        "ROCKET": "ロケット",
        "SHOOT": "射撃",
        "BR_ACID": "酸のブレス",
        "BR_ELEC": "電撃のブレス",
        "BR_FIRE": "火炎のブレス",
        "BR_COLD": "冷気のブレス",
        "BR_POIS": "毒のブレス",
        "BR_NETH": "地獄のブレス",
        "BR_LITE": "閃光のブレス",
        "BR_DARK": "暗黒のブレス",
        "BR_CONF": "混乱のブレス",
        "BR_SOUN": "轟音のブレス",
        "BR_CHAO": "カオスのブレス",
        "BR_DISE": "劣化のブレス",
        "BR_NEXU": "因果混乱のブレス",
        "BR_TIME": "時間逆転のブレス",
        "BR_INER": "遅鈍のブレス",
        "BR_GRAV": "重力のブレス",
        "BR_SHAR": "破片のブレス",
        "BR_PLAS": "プラズマのブレス",
        "BR_FORC": "フォースのブレス",
        "BR_MANA": "魔力のブレス",
        "BA_NUKE": "放射能球",
        "BR_NUKE": "放射性廃棄物のブレス",
        "BA_CHAO": "ログルス球",
        "BR_DISI": "分解のブレス",
        "BA_ACID": "アシッド・ボール",
        "BA_ELEC": "サンダー・ボール",
        "BA_FIRE": "ファイア・ボール",
        "BA_COLD": "アイス・ボール",
        "BA_POIS": "悪臭雲",
        "BA_NETH": "地獄球",
        "BA_WATE": "ウォーター・ボール",
        "BA_MANA": "魔力の嵐",
        "BA_DARK": "暗黒の嵐",
        "DRAIN_MANA": "魔力吸収",
        "MIND_BLAST": "精神攻撃",
        "BRAIN_SMASH": "脳攻撃",
        "CAUSE_1": "軽傷の呪い",
        "CAUSE_2": "重症の呪い",
        "CAUSE_3": "致命傷の呪い",
        "CAUSE_4": "秘孔を突く",
        "BO_ACID": "アシッド・ボルト",
        "BO_ELEC": "サンダー・ボルト",
        "BO_FIRE": "ファイア・ボルト",
        "BO_COLD": "アイス・ボルト",
        "BA_LITE": "スター・バースト",
        "BO_NETH": "地獄の矢",
        "BO_WATE": "ウォーター・ボルト",
        "BO_MANA": "魔力の矢",
        "BO_PLAS": "プラズマ・ボルト",
        "BO_ICEE": "極寒の矢",
        "MISSILE": "マジック・ミサイル",
        "SCARE": "恐慌",
        "BLIND": "盲目",
        "CONF": "混乱",
        "SLOW": "減速",
        "HOLD": "麻痺",
        "HASTE": "加速",
        "HAND_DOOM": "破滅の手",
        "HEAL": "治癒",
        "INVULNER": "無敵化",
        "BLINK": "ショート・テレポート",
        "TPORT": "テレポート",
        "WORLD": "時を止める",
        "SPECIAL": "特殊攻撃",
        "TELE_TO": "テレポート・バック",
        "TELE_AWAY": "テレポート・アウェイ",
        "TELE_LEVEL": "テレポート・レベル",
        "PSY_SPEAR": "サイコスピア",
        "DARKNESS": "暗闇生成",
        "TRAPS": "トラップ生成",
        "FORGET": "記憶消去",
        "RAISE_DEAD": "死者復活",
        "S_KIN": "血族召喚",
        "S_CYBER": "サイバーデーモン召喚",
        "S_MONSTER": "モンスター召喚",
        "S_MONSTERS": "複数モンスター召喚",
        "S_ANT": "アリ召喚",
        "S_SPIDER": "蜘蛛召喚",
        "S_HOUND": "ハウンド召喚",
        "S_HYDRA": "ヒドラ召喚",
        "S_ANGEL": "天使召喚",
        "S_DEMON": "悪魔召喚",
        "S_UNDEAD": "アンデッド召喚",
        "S_DRAGON": "ドラゴン召喚",
        "S_HI_UNDEAD": "上級アンデッド召喚",
        "S_HI_DRAGON": "古代ドラゴン召喚",
        "S_AMBERITES": "アンバライト召喚",
        "S_UNIQUE": "ユニーク召喚",
        "S_DEAD_UNIQUE": "死亡ユニーク召喚",
        "BO_VOID": "ヴォイド・ボルト",
        "BO_ABYSS": "アビス・ボルト",
        "BR_VOID": "虚無のブレス",
        "BR_ABYSS": "深淵のブレス",
        "BA_VOID": "虚無のボール",
        "BA_ABYSS": "深淵のボール",
        "BA_METEOR": "隕石のボール",
        "BO_METEOR": "隕石のボルト",
        "BO_LITE": "光のボルト"
    };

    return (
        <div id={index} key={index}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <a id={`creature-${creature.serialNumber}`}></a>
                    <h3 style={{ display: "inline-block", margin: 0 }}>
                        <span className="num">{creature.serialNumber}</span>{creature.name} / {creature.ename}
                    </h3>
                </div>
                <button
                    style={{
                        marginLeft: "1em",
                        background: "none",
                        border: "none",
                        color: "#90caf9",
                        cursor: "pointer",
                        fontSize: "1.2em"
                    }}
                    title="ページトップに戻る"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    ↑
                </button>
            </div>
            <h4>ステータス</h4>
            <div
                className="status-flex"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5em",
                    marginBottom: "1em",
                    alignItems: "center"
                }}
            >
                <div>
                    <strong>レベル</strong><br />
                    {creature.depth}
                </div>
                <div>
                    <strong>出現レア度</strong><br />
                    {creature.rarity}
                </div>
                <div>
                    <strong>HP期待値</strong><br />
                    {creature.hp_expected}({creature.hitPoints})
                </div>
                <div>
                    <strong>加速</strong><br />
                    {creature.speed}
                </div>
                <div>
                    <strong>視界</strong><br />
                    {creature.vision}
                </div>
                <div>
                    <strong>魔法・特殊能力</strong><br />
                    {
                        (() => {
                            if (!creature.skills || creature.skills.length === 0) return "―";

                            let skillList = [];

                            if (Array.isArray(creature.skills)) {
                                skillList = creature.skills;
                            } else if (typeof creature.skills === 'string') {
                                skillList = creature.skills.split(/[|,\s]+/).map(s => s.trim()).filter(s => s);
                            } else if (creature.skills && typeof creature.skills === 'object') {
                                if (Array.isArray(creature.skills.list)) {
                                    skillList = creature.skills.list;
                                } else if (creature.skills.list && typeof creature.skills.list === 'string') {
                                    skillList = creature.skills.list.split(/[|,\s]+/).map(s => s.trim()).filter(s => s);
                                }
                            }

                            if (skillList.length === 0) {
                                return "―";
                            }

                            const spells = skillList.map(spell => {
                                return spellMap[spell] || spell;
                            });

                            return spells.join(", ");
                        })()
                    }
                </div>
                {/* 他のステータス要素も同様に... */}
            </div>

            <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                        setTab("rinfo");
                        setShowModal(true);
                    }}
                >
                    編集
                </button>
            </div>

            {/* 編集モーダル */}
            <div
                className={`modal fade${showModal ? " show" : ""}`}
                tabIndex="-1"
                style={{
                    display: showModal ? "block" : "none",
                    background: "rgba(0,0,0,0.5)"
                }}
                aria-modal={showModal ? "true" : undefined}
                role="dialog"
            >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <ul className="nav nav-tabs modal-title" style={{ marginBottom: 0 }}>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link${tab === "rinfo" ? " active" : ""}`}
                                        onClick={() => setTab("rinfo")}
                                        style={{ border: "none", background: "none" }}
                                    >
                                        r_info
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className={`nav-link${tab === "json" ? " active" : ""}`}
                                        onClick={() => setTab("json")}
                                        style={{ border: "none", background: "none" }}
                                    >
                                        .json
                                    </button>
                                </li>
                            </ul>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {tab === "rinfo" && (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-secondary mb-2"
                                        onClick={() => navigator.clipboard.writeText(creature.textDetails)}
                                        title="*_infoをコピー"
                                    >
                                        コピー
                                    </button>
                                    <textarea
                                        className="form-control"
                                        value={creature.textDetails}
                                        rows={Math.max(3, creature.textDetails.split('\n').length)}
                                        style={{ width: "100%", resize: "vertical" }}
                                        readOnly
                                    />
                                </>
                            )}
                            {tab === "json" && (
                                <>
                                    <button
                                        className="btn btn-sm btn-outline-secondary mb-2"
                                        onClick={() => navigator.clipboard.writeText(creature.putJson())}
                                        title="JSONをコピー"
                                    >
                                        コピー
                                    </button>
                                    <textarea
                                        className="form-control"
                                        value={creature.putJson()}
                                        rows={Math.max(3, creature.textDetails.split('\n').length)}
                                        style={{ width: "100%", resize: "vertical" }}
                                        readOnly
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}