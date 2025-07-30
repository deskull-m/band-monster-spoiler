// 共通のフラグ翻訳マップ
const FLAG_TRANSLATION = {
    "UNIQUE": "ユニーク",
    "QUESTOR": "クエスト",
    "MALE": "雄",
    "FEMALE": "雌",
    "CHAR_CLEAR": "透明な文字",
    "ATTR_CLEAR": "透明",
    "ATTR_MULTI": "色変化",
    "FORCE_DEPTH": "階層固定",
    "FORCE_MAXHP": "最大HP固定",
    "FORCE_SLEEP": "睡眠固定",
    "FORCE_EXTRA": "追加能力固定",
    "FRIEND": "友好的",
    "FRIENDS": "集団出現",
    "ESCORT": "護衛付き",
    "ESCORTS": "護衛集団",
    "NEVER_BLOW": "打撃なし",
    "NEVER_MOVE": "移動なし",
    "RAND_25": "1/4確率出現",
    "RAND_50": "1/2確率出現",
    "ONLY_GOLD": "金のみドロップ",
    "ONLY_ITEM": "アイテムのみドロップ",
    "DROP_60": "60%でドロップ",
    "DROP_90": "90%でドロップ",
    "DROP_1D2": "1-2個ドロップ",
    "DROP_2D2": "2-4個ドロップ",
    "DROP_3D2": "3-6個ドロップ",
    "DROP_4D2": "4-8個ドロップ",
    "DROP_GOOD": "良質ドロップ",
    "DROP_GREAT": "高品質ドロップ",
    "DROP_USEFUL": "有用ドロップ",
    "DROP_CHOSEN": "選択ドロップ",
    "STUPID": "愚鈍",
    "SMART": "賢い",
    "CAN_SPEAK": "発言",
    "REFLECTING": "反射",
    "INVISIBLE": "透明",
    "COLD_BLOOD": "冷血",
    "EMPTY_MIND": "空虚な心",
    "WEIRD_MIND": "異質な心",
    "MULTIPLY": "増殖",
    "REGENERATE": "再生",
    "SHAPECHANGER": "変身",
    "ATTR_ANY": "任意の色",
    "POWERFUL": "強力",
    "ELDRITCH_HORROR": "狂気誘発",
    "AURA_FIRE": "火炎オーラ",
    "AURA_ELEC": "電撃オーラ",
    "AURA_COLD": "冷気オーラ",
    "AURA_ACID": "酸オーラ",
    "AURA_POISON": "毒オーラ",
    "AURA_NUKE": "放射能オーラ",
    "AURA_PLASMA": "プラズマオーラ",
    "AURA_WATER": "水オーラ",
    "AURA_ICEE": "極寒オーラ",
    "AURA_LITE": "閃光オーラ",
    "AURA_DARK": "暗黒オーラ",
    "AURA_SHARDS": "破片オーラ",
    "AURA_FORCE": "フォースオーラ",
    "AURA_MANA": "魔力オーラ",
    "AURA_METEOR": "隕石オーラ",
    "AURA_CHAOS": "カオスオーラ",
    "AURA_HOLINESS": "聖性オーラ",
    "AURA_NETHER": "地獄オーラ",
    "AURA_DISENCHANT": "劣化オーラ",
    "AURA_NEXUS": "因果混乱オーラ",
    "AURA_TIME": "時間逆転オーラ",
    "AURA_GRAVITY": "重力オーラ",
    "AURA_VOIDS": "虚無オーラ",
    "AURA_ABYSS": "深淵オーラ",
    "OPEN_DOOR": "扉開放",
    "BASH_DOOR": "扉破壊",
    "PASS_WALL": "壁通過",
    "KILL_WALL": "壁破壊",
    "MOVE_BODY": "死体押し退け",
    "KILL_BODY": "死体破壊",
    "TAKE_ITEM": "アイテム拾得",
    "KILL_ITEM": "アイテム破壊",
    "BRAIN_1": "脳1",
    "BRAIN_2": "脳2",
    "BRAIN_3": "脳3",
    "BRAIN_4": "脳4",
    "BRAIN_5": "脳5",
    "BRAIN_6": "脳6",
    "BRAIN_7": "脳7",
    "BRAIN_8": "脳8",
    "NO_CONF": "混乱無効",
    "NO_SLEEP": "睡眠無効",
    "NO_FEAR": "恐怖無効",
    "NO_STUN": "朦朧無効",
    "IM_ACID": "酸免疫",
    "IM_ELEC": "電撃免疫",
    "IM_FIRE": "火炎免疫",
    "IM_COLD": "冷気免疫",
    "IM_POIS": "毒免疫",
    "RES_ACID": "酸耐性",
    "RES_ELEC": "電撃耐性",
    "RES_FIRE": "火炎耐性",
    "RES_COLD": "冷気耐性",
    "RES_POIS": "毒耐性",
    "RES_LITE": "閃光耐性",
    "RES_DARK": "暗黒耐性",
    "RES_NETH": "地獄耐性",
    "RES_WATE": "水耐性",
    "RES_PLAS": "プラズマ耐性",
    "RES_SHAR": "破片耐性",
    "RES_SOUN": "轟音耐性",
    "RES_CHAO": "カオス耐性",
    "RES_NEXU": "因果混乱耐性",
    "RES_DISE": "劣化耐性",
    "RES_WALL": "フォース耐性",
    "RES_INER": "遅鈍耐性",
    "RES_TIME": "時間逆転耐性",
    "RES_GRAV": "重力耐性",
    "RES_TELE": "テレポート耐性",
    "RES_ROCK": "岩石耐性",
    "RES_ABYSS": "深淵耐性",
    "RES_VOID": "虚無魔法耐性",
    "RES_METEOR": "隕石耐性",
    "RES_ALL": "全耐性",
    "HURT_ACID": "酸弱点",
    "HURT_ELEC": "電撃弱点",
    "HURT_FIRE": "火炎弱点",
    "HURT_COLD": "冷気弱点",
    "HURT_POIS": "毒弱点",
    "HURT_LITE": "光弱点",
    "HURT_DARK": "暗黒弱点",
    "HURT_NETH": "地獄弱点",
    "HURT_WATE": "水弱点",
    "HURT_PLAS": "プラズマ弱点",
    "HURT_SHAR": "破片弱点",
    "HURT_SOUN": "轟音弱点",
    "HURT_CHAO": "カオス弱点",
    "HURT_NEXU": "因果混乱弱点",
    "HURT_DISE": "劣化弱点",
    "HURT_WALL": "フォース弱点",
    "HURT_INER": "遅鈍弱点",
    "HURT_TIME": "時間逆転弱点",
    "HURT_GRAV": "重力弱点",
    "HURT_ROCK": "岩石弱点",
    "HURT_ABYSS": "深淵弱点",
    "HURT_VOID": "虚無魔法弱点",
    "HURT_METEOR": "隕石弱点",
    "NO_FEAR": "恐怖無効",
    "NO_STUN": "朦朧無効",
    "NO_CONF": "混乱無効",
    "NO_SLEEP": "睡眠無効",
    "NO_INSTANTLY_DEATH": "即死無効",
    "NO_DEFECATE": "脱糞無効",
    "NO_VOMIT": "嘔吐無効",
    "IM_MELEE": "打撃免疫"
};

// 共通の魔法・特殊能力翻訳マップ
const SPELL_MAP = {
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

function MonsterDetail({ creature, index, infoList }) {
    const [showModal, setShowModal] = React.useState(false);
    const [tab, setTab] = React.useState("detail");

    // フラグの日本語化マップ
    const flagTranslation = FLAG_TRANSLATION;

    // 魔法・特殊能力の日本語化マップ
    const spellMap = SPELL_MAP;

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
            <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                        setTab("detail");
                        setShowModal(true);
                    }}
                >
                    詳細表示
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
                                        className={`nav-link${tab === "detail" ? " active" : ""}`}
                                        onClick={() => setTab("detail")}
                                        style={{ border: "none", background: "none" }}
                                    >
                                        詳細
                                    </button>
                                </li>
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
                            {tab === "detail" && (
                                <div class="status-detail">
                                    <h5>ステータス詳細</h5>
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1em", marginBottom: "1.5em" }}>
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
                                            <strong>アーマークラス</strong><br />
                                            {creature.armor}
                                        </div>
                                        <div>
                                            <strong>体力</strong><br />
                                            {creature.hitPoints}
                                        </div>
                                        <div>
                                            <strong>睡眠</strong><br />
                                            {creature.sleep}
                                        </div>
                                    </div>

                                    <h6>攻撃</h6>
                                    <div style={{ marginBottom: "1.5em" }}>
                                        {creature.attacks && creature.attacks.length > 0 ? (
                                            <ul>
                                                {creature.attacks.map((attack, idx) => (
                                                    <li key={idx}>{attack.description || `${attack.method} ${attack.damage}`}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>攻撃なし</p>
                                        )}
                                    </div>

                                    <h6>魔法・特殊能力</h6>
                                    <div style={{ marginBottom: "1.5em" }}>
                                        {
                                            (() => {
                                                if (!creature.skills || creature.skills.length === 0) return <p>なし</p>;

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
                                                    return <p>なし</p>;
                                                }

                                                const spells = skillList.map(spell => {
                                                    return spellMap[spell] || spell;
                                                });

                                                return (
                                                    <ul>
                                                        {spells.map((spell, idx) => (
                                                            <li key={idx}>{spell}</li>
                                                        ))}
                                                    </ul>
                                                );
                                            })()
                                        }
                                    </div>

                                    <h6>フラグ</h6>
                                    <div>
                                        {creature.flags && creature.flags.length > 0 ? (
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em" }}>
                                                {creature.flags.map((flag, idx) => (
                                                    <span key={idx} className="badge bg-secondary">
                                                        {flagTranslation[flag] || flag}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>フラグなし</p>
                                        )}
                                    </div>

                                    {creature.description && (
                                        <div style={{ marginTop: "1.5em" }}>
                                            <h6>説明</h6>
                                            <p>{creature.description}</p>
                                        </div>
                                    )}
                                </div>
                            )}
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

// テーブル行用のコンポーネント
function MonsterTableRow({ creature, index, infoList, onDelete, onCopy, onEdit }) {
    const [showModal, setShowModal] = React.useState(false);
    const [tab, setTab] = React.useState("detail");

    // フラグの日本語化マップ（共通定数を使用）
    const flagTranslation = FLAG_TRANSLATION;

    // 魔法・特殊能力の日本語化マップ（共通定数を使用）
    const spellMap = SPELL_MAP;

    return (
        <>
            <tr>
                <td>
                    <span className="num">{creature.serialNumber}</span>
                </td>
                <td>{creature.name}</td>
                <td>{creature.ename}</td>
                <td>{creature.depth}</td>
                <td style={{ textAlign: "center", fontFamily: "monospace", fontSize: "1.2em" }}>
                    <span style={{ color: creature.color || "#e0e0e0" }}>
                        {creature.symbol}
                    </span>
                </td>
                <td style={{ textAlign: "center" }}>
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => {
                            setTab("detail");
                            setShowModal(true);
                        }}
                        style={{ marginRight: "0.3em" }}
                        title="詳細を表示"
                    >
                        📄
                    </button>
                    {onEdit && (
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => onEdit(creature, index)}
                            title="このモンスターを編集"
                            style={{ marginRight: "0.3em" }}
                        >
                            ✏️
                        </button>
                    )}
                    {onCopy && (
                        <button
                            className="btn btn-outline-info btn-sm"
                            onClick={() => onCopy(creature)}
                            title="このモンスターをコピー"
                            style={{ marginRight: "0.3em" }}
                        >
                            📋
                        </button>
                    )}
                    {onDelete && (
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onDelete(creature.serialNumber)}
                            title="このモンスターを削除"
                        >
                            🗑️
                        </button>
                    )}
                </td>
            </tr>

            {/* 詳細モーダル */}
            {showModal && (
                <div
                    className={`modal fade show`}
                    tabIndex="-1"
                    style={{
                        display: "block",
                        background: "rgba(0,0,0,0.5)"
                    }}
                    aria-modal="true"
                    role="dialog"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {creature.serialNumber}: {creature.name} / {creature.ename}
                                </h5>
                                <ul className="nav nav-tabs" style={{ marginLeft: "auto", marginRight: "1rem" }}>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link${tab === "detail" ? " active" : ""}`}
                                            onClick={() => setTab("detail")}
                                            style={{ border: "none", background: "none" }}
                                        >
                                            詳細
                                        </button>
                                    </li>
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
                                {tab === "detail" && (
                                    <div>
                                        <h5>ステータス詳細</h5>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1em", marginBottom: "1.5em" }}>
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
                                                <strong>アーマークラス</strong><br />
                                                {creature.armor}
                                            </div>
                                            <div>
                                                <strong>体力</strong><br />
                                                {creature.hitPoints}
                                            </div>
                                            <div>
                                                <strong>睡眠</strong><br />
                                                {creature.sleep}
                                            </div>
                                        </div>

                                        <h6>攻撃</h6>
                                        <div style={{ marginBottom: "1.5em" }}>
                                            {creature.attacks && creature.attacks.length > 0 ? (
                                                <ul>
                                                    {creature.attacks.map((attack, idx) => (
                                                        <li key={idx}>{attack.description || `${attack.method} ${attack.damage}`}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p>攻撃なし</p>
                                            )}
                                        </div>

                                        <h6>魔法・特殊能力</h6>
                                        <div style={{ marginBottom: "1.5em" }}>
                                            {
                                                (() => {
                                                    if (!creature.skills || creature.skills.length === 0) return <p>なし</p>;

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
                                                        return <p>なし</p>;
                                                    }

                                                    const spells = skillList.map(spell => {
                                                        return spellMap[spell] || spell;
                                                    });

                                                    return (
                                                        <ul>
                                                            {spells.map((spell, idx) => (
                                                                <li key={idx}>{spell}</li>
                                                            ))}
                                                        </ul>
                                                    );
                                                })()
                                            }
                                        </div>

                                        <h6>フラグ</h6>
                                        <div>
                                            {creature.flags && creature.flags.length > 0 ? (
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5em" }}>
                                                    {creature.flags.map((flag, idx) => (
                                                        <span key={idx} className="badge bg-secondary">
                                                            {flagTranslation[flag] || flag}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>フラグなし</p>
                                            )}
                                        </div>

                                        {creature.description && (
                                            <div style={{ marginTop: "1.5em" }}>
                                                <h6>説明</h6>
                                                <p>{creature.description}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
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
            )}
        </>
    );
}

// モンスター編集フォームコンポーネント
function MonsterEditForm({ creature, onSave, onCancel }) {
    // フラグの定義（カテゴリ別に整理）
    const flagCategories = {
        "基本属性": {
            "UNIQUE": "ユニーク",
            "QUESTOR": "クエスト",
            "MALE": "雄",
            "FEMALE": "雌"
        },
        "外見": {
            "CHAR_CLEAR": "透明な文字",
            "ATTR_CLEAR": "透明",
            "ATTR_MULTI": "色変化",
            "ATTR_ANY": "任意の色",
            "SHAPECHANGER": "変身",
            "INVISIBLE": "透明"
        },
        "強制設定": {
            "FORCE_DEPTH": "階層固定",
            "FORCE_MAXHP": "最大HP固定",
            "FORCE_SLEEP": "睡眠固定",
            "FORCE_EXTRA": "追加能力固定"
        },
        "集団行動": {
            "FRIEND": "友好的",
            "FRIENDS": "集団出現",
            "ESCORT": "護衛付き",
            "ESCORTS": "護衛集団"
        },
        "行動制限": {
            "NEVER_BLOW": "打撃なし",
            "NEVER_MOVE": "移動なし",
            "RAND_25": "1/4確率出現",
            "RAND_50": "1/2確率出現"
        },
        "ドロップ": {
            "ONLY_GOLD": "金のみドロップ",
            "ONLY_ITEM": "アイテムのみドロップ",
            "DROP_60": "60%でドロップ",
            "DROP_90": "90%でドロップ",
            "DROP_1D2": "1-2個ドロップ",
            "DROP_2D2": "2-4個ドロップ",
            "DROP_3D2": "3-6個ドロップ",
            "DROP_4D2": "4-8個ドロップ",
            "DROP_GOOD": "良質ドロップ",
            "DROP_GREAT": "高品質ドロップ",
            "DROP_USEFUL": "有用ドロップ",
            "DROP_CHOSEN": "選択ドロップ"
        },
        "知能・特性": {
            "STUPID": "愚鈍",
            "SMART": "賢い",
            "CAN_SPEAK": "発言",
            "REFLECTING": "反射",
            "COLD_BLOOD": "冷血",
            "EMPTY_MIND": "空虚な心",
            "WEIRD_MIND": "異質な心",
            "MULTIPLY": "増殖",
            "REGENERATE": "再生",
            "POWERFUL": "強力",
            "ELDRITCH_HORROR": "狂気誘発"
        },
        "オーラ": {
            "AURA_FIRE": "火炎オーラ",
            "AURA_ELEC": "電撃オーラ",
            "AURA_COLD": "冷気オーラ",
            "AURA_ACID": "酸オーラ",
            "AURA_POISON": "毒オーラ",
            "AURA_NUKE": "放射能オーラ",
            "AURA_PLASMA": "プラズマオーラ",
            "AURA_WATER": "水オーラ",
            "AURA_ICEE": "極寒オーラ",
            "AURA_LITE": "閃光オーラ",
            "AURA_DARK": "暗黒オーラ",
            "AURA_SHARDS": "破片オーラ",
            "AURA_FORCE": "フォースオーラ",
            "AURA_MANA": "魔力オーラ",
            "AURA_METEOR": "隕石オーラ",
            "AURA_CHAOS": "カオスオーラ",
            "AURA_HOLINESS": "聖性オーラ",
            "AURA_NETHER": "地獄オーラ",
            "AURA_DISENCHANT": "劣化オーラ",
            "AURA_NEXUS": "因果混乱オーラ",
            "AURA_TIME": "時間逆転オーラ",
            "AURA_GRAVITY": "重力オーラ",
            "AURA_VOIDS": "虚無オーラ",
            "AURA_ABYSS": "深淵オーラ"
        },
        "移動能力": {
            "OPEN_DOOR": "扉開放",
            "BASH_DOOR": "扉破壊",
            "PASS_WALL": "壁通過",
            "KILL_WALL": "壁破壊",
            "MOVE_BODY": "死体押し退け",
            "KILL_BODY": "死体破壊",
            "TAKE_ITEM": "アイテム拾得",
            "KILL_ITEM": "アイテム破壊"
        },
        "状態異常耐性": {
            "NO_CONF": "混乱無効",
            "NO_SLEEP": "睡眠無効",
            "NO_FEAR": "恐怖無効",
            "NO_STUN": "朦朧無効",
            "NO_INSTANTLY_DEATH": "即死無効",
            "NO_DEFECATE": "脱糞無効",
            "NO_VOMIT": "嘔吐無効"
        },
        "耐性": {
            "RES_ALL": "完全なる耐性",
            "IM_ACID": "酸免疫",
            "IM_ELEC": "電撃免疫",
            "IM_FIRE": "火炎免疫",
            "IM_COLD": "冷気免疫",
            "IM_POIS": "毒免疫",
            "RES_ACID": "酸耐性",
            "RES_ELEC": "電撃耐性",
            "RES_FIRE": "火炎耐性",
            "RES_COLD": "冷気耐性",
            "RES_POIS": "毒耐性",
            "RES_LITE": "閃光耐性",
            "RES_DARK": "暗黒耐性",
            "RES_NETH": "地獄耐性",
            "RES_WATE": "水耐性",
            "RES_PLAS": "プラズマ耐性",
            "RES_SHAR": "破片耐性",
            "RES_SOUN": "轟音耐性",
            "RES_CHAO": "カオス耐性",
            "RES_NEXU": "因果混乱耐性",
            "RES_DISE": "劣化耐性",
            "RES_WALL": "フォース耐性",
            "RES_INER": "遅鈍耐性",
            "RES_TIME": "時間逆転耐性",
            "RES_GRAV": "重力耐性",
            "RES_TELE": "テレポート耐性",
            "RES_ROCK": "岩石耐性",
            "RES_ABYSS": "深淵耐性",
            "RES_VOID": "虚無魔法耐性",
            "RES_METEOR": "隕石耐性"
        },
        "弱点": {
            "HURT_ACID": "酸弱点",
            "HURT_ELEC": "電撃弱点",
            "HURT_FIRE": "火炎弱点",
            "HURT_COLD": "冷気弱点",
            "HURT_POIS": "毒弱点",
            "HURT_LITE": "光弱点",
            "HURT_DARK": "暗黒弱点",
            "HURT_NETH": "地獄弱点",
            "HURT_WATE": "水弱点",
            "HURT_PLAS": "プラズマ弱点",
            "HURT_SHAR": "破片弱点",
            "HURT_SOUN": "轟音弱点",
            "HURT_CHAO": "カオス弱点",
            "HURT_NEXU": "因果混乱弱点",
            "HURT_DISE": "劣化弱点",
            "HURT_WALL": "フォース弱点",
            "HURT_INER": "遅鈍弱点",
            "HURT_TIME": "時間逆転弱点",
            "HURT_GRAV": "重力弱点",
            "HURT_ROCK": "岩石弱点",
            "HURT_ABYSS": "深淵弱点",
            "HURT_VOID": "虚無魔法弱点",
            "HURT_METEOR": "隕石弱点"
        }
    };

    // 色の選択肢を定義
    const colorOptions = [
        { code: 'D', name: 'Black', color: '#000000' },
        { code: 'w', name: 'White', color: '#ffffff' },
        { code: 's', name: 'Gray', color: '#808080' },
        { code: 'o', name: 'Orange', color: '#ff8000' },
        { code: 'r', name: 'Red', color: '#ff0000' },
        { code: 'g', name: 'Green', color: '#00ff00' },
        { code: 'b', name: 'Blue', color: '#0000ff' },
        { code: 'u', name: 'Brown', color: '#8b4513' },
        { code: 'd', name: 'Dark Gray', color: '#404040' },
        { code: 'W', name: 'Light Gray', color: '#c0c0c0' },
        { code: 'v', name: 'Violet', color: '#8000ff' },
        { code: 'y', name: 'Yellow', color: '#ffff00' },
        { code: 'R', name: 'Light Red', color: '#ff8080' },
        { code: 'G', name: 'Light Green', color: '#80ff80' },
        { code: 'B', name: 'Light Blue', color: '#8080ff' },
        { code: 'U', name: 'Light Brown', color: '#daa520' }
    ];

    // HPダイスを解析する関数
    const parseHitPoints = (hitPoints) => {
        const match = hitPoints.match(/^(\d+)d(\d+)$/);
        if (match) {
            return {
                dice: parseInt(match[1]),
                sides: parseInt(match[2])
            };
        }
        return { dice: 1, sides: 1 };
    };

    // HPダイスから平均値を計算する関数
    const calculateAverageHP = (dice, sides) => {
        return Math.round(dice * (sides + 1) / 2 * 10) / 10;
    };

    const initialHp = parseHitPoints(creature.hitPoints || "1d1");

    // 初期フラグ状態を設定
    const initialFlags = {};
    Object.values(flagCategories).forEach(category => {
        Object.keys(category).forEach(flag => {
            initialFlags[flag] = creature.flags ? creature.flags.includes(flag) : false;
        });
    });

    const [formData, setFormData] = React.useState({
        serialNumber: creature.serialNumber,
        name: creature.name || "",
        ename: creature.ename || "",
        symbol: creature.symbol || "",
        color: creature.color || "",
        speed: creature.speed,
        hpDice: initialHp.dice,
        hpSides: initialHp.sides,
        vision: creature.vision,
        armor_class: creature.armor_class,
        alertness: creature.alertness,
        depth: creature.depth,
        rarity: creature.rarity,
        exp: creature.exp,
        nextExp: creature.nextExp,
        nextMon: creature.nextMon,
        flags: initialFlags,
        description_ja: creature.description_ja || "",
        description_en: creature.description_en || ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFlagChange = (flag, checked) => {
        setFormData(prev => ({
            ...prev,
            flags: {
                ...prev.flags,
                [flag]: checked
            }
        }));
    };

    const handleCategoryToggle = (categoryFlags, allChecked) => {
        setFormData(prev => {
            const newFlags = { ...prev.flags };
            Object.keys(categoryFlags).forEach(flag => {
                newFlags[flag] = !allChecked;
            });
            return {
                ...prev,
                flags: newFlags
            };
        });
    };

    const handleSave = () => {
        try {
            // HPダイスを文字列形式に変換
            const hitPoints = `${formData.hpDice}d${formData.hpSides}`;
            
            // フラグを文字列形式に変換
            const activeFlags = Object.entries(formData.flags)
                .filter(([flag, isActive]) => isActive)
                .map(([flag]) => flag);
            const flagString = activeFlags.join(' | ');
            
            // フォームデータからCreatureテキスト形式を再構築
            const textData = `N:${formData.serialNumber}:${formData.name}
E:${formData.ename}
G:${formData.symbol}:${formData.color}
I:${formData.speed + 110}:${hitPoints}:${formData.vision}:${formData.armor_class}:${formData.alertness}
W:${formData.depth}:${formData.rarity}:${formData.exp}:${formData.nextExp}:${formData.nextMon}${activeFlags.length > 0 ? `
F:${flagString}` : ''}${formData.description_ja ? `
D:${formData.description_ja}` : ''}${formData.description_en ? `
D:$${formData.description_en}` : ''}`;

            const updatedCreature = new Creature(textData);
            onSave(updatedCreature);
        } catch (error) {
            alert('モンスターデータの更新に失敗しました: ' + error.message);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div style={{
                background: '#2b3035',
                borderRadius: '8px',
                padding: '20px',
                maxWidth: '1000px',
                width: '95%',
                maxHeight: '95vh',
                overflow: 'auto',
                border: '1px solid #555'
            }}>
                <h3 style={{ marginTop: 0, color: '#e0e0e0' }}>
                    モンスター編集 - ID: {formData.serialNumber}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    {/* 基本情報 */}
                    <div>
                        <h4 style={{ color: '#ccc' }}>基本情報</h4>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                日本語名:
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '5px',
                                    background: '#1a1a1a',
                                    border: '1px solid #555',
                                    color: '#e0e0e0',
                                    borderRadius: '3px'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                英語名:
                            </label>
                            <input
                                type="text"
                                value={formData.ename}
                                onChange={(e) => handleChange('ename', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '5px',
                                    background: '#1a1a1a',
                                    border: '1px solid #555',
                                    color: '#e0e0e0',
                                    borderRadius: '3px'
                                }}
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    シンボル:
                                </label>
                                <input
                                    type="text"
                                    maxLength="1"
                                    value={formData.symbol}
                                    onChange={(e) => handleChange('symbol', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    色:
                                </label>
                                <select
                                    value={formData.color}
                                    onChange={(e) => handleChange('color', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                >
                                    <option value="">色を選択</option>
                                    {colorOptions.map(option => (
                                        <option key={option.code} value={option.code}>
                                            {option.code} - {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 能力値 */}
                    <div>
                        <h4 style={{ color: '#ccc' }}>能力値</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    速度:
                                </label>
                                <input
                                    type="number"
                                    min="-99"
                                    max="99"
                                    value={formData.speed}
                                    onChange={(e) => {
                                        const value = parseInt(e.target.value) || 0;
                                        const clampedValue = Math.max(-99, Math.min(99, value));
                                        handleChange('speed', clampedValue);
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    HP:
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto', gap: '5px', alignItems: 'center' }}>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.hpDice}
                                        onChange={(e) => handleChange('hpDice', Math.max(1, parseInt(e.target.value) || 1))}
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            background: '#1a1a1a',
                                            border: '1px solid #555',
                                            color: '#e0e0e0',
                                            borderRadius: '3px'
                                        }}
                                        placeholder="ダイス数"
                                    />
                                    <span style={{ color: '#ccc', padding: '0 5px' }}>d</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.hpSides}
                                        onChange={(e) => handleChange('hpSides', Math.max(1, parseInt(e.target.value) || 1))}
                                        style={{
                                            width: '100%',
                                            padding: '5px',
                                            background: '#1a1a1a',
                                            border: '1px solid #555',
                                            color: '#e0e0e0',
                                            borderRadius: '3px'
                                        }}
                                        placeholder="面数"
                                    />
                                    <div style={{ 
                                        padding: '5px 10px',
                                        background: '#333',
                                        borderRadius: '3px',
                                        color: '#ccc',
                                        fontSize: '12px',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        平均: {calculateAverageHP(formData.hpDice, formData.hpSides)}
                                    </div>
                                </div>
                                <div style={{ fontSize: '11px', color: '#888', marginTop: '3px' }}>
                                    形式: {formData.hpDice}d{formData.hpSides}
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    視界:
                                </label>
                                <input
                                    type="number"
                                    value={formData.vision}
                                    onChange={(e) => handleChange('vision', parseInt(e.target.value) || 0)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    AC:
                                </label>
                                <input
                                    type="number"
                                    value={formData.armor_class}
                                    onChange={(e) => handleChange('armor_class', parseInt(e.target.value) || 0)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    警戒度:
                                </label>
                                <input
                                    type="number"
                                    value={formData.alertness}
                                    onChange={(e) => handleChange('alertness', parseInt(e.target.value) || 0)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* レベル・経験値 */}
                    <div>
                        <h4 style={{ color: '#ccc' }}>レベル・経験値</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    レベル:
                                </label>
                                <input
                                    type="number"
                                    value={formData.depth}
                                    onChange={(e) => handleChange('depth', parseInt(e.target.value) || 0)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    希少度:
                                </label>
                                <input
                                    type="number"
                                    value={formData.rarity}
                                    onChange={(e) => handleChange('rarity', parseInt(e.target.value) || 1)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                    経験値:
                                </label>
                                <input
                                    type="number"
                                    value={formData.exp}
                                    onChange={(e) => handleChange('exp', parseInt(e.target.value) || 0)}
                                    style={{
                                        width: '100%',
                                        padding: '5px',
                                        background: '#1a1a1a',
                                        border: '1px solid #555',
                                        color: '#e0e0e0',
                                        borderRadius: '3px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* フラグ */}
                    <div style={{ gridColumn: '1 / -1' }}>
                        <h4 style={{ color: '#ccc' }}>フラグ</h4>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                            gap: '15px',
                            maxHeight: '400px',
                            overflow: 'auto',
                            border: '1px solid #555',
                            borderRadius: '5px',
                            padding: '10px',
                            background: '#1a1a1a'
                        }}>
                            {Object.entries(flagCategories).map(([categoryName, flags]) => {
                                const categoryFlagKeys = Object.keys(flags);
                                const checkedCount = categoryFlagKeys.filter(flag => formData.flags[flag]).length;
                                const allChecked = checkedCount === categoryFlagKeys.length;
                                const someChecked = checkedCount > 0;
                                
                                return (
                                    <div key={categoryName} style={{ marginBottom: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <h5 style={{ 
                                                color: '#ffd700', 
                                                fontSize: '14px', 
                                                margin: '0 0 8px 0',
                                                flex: 1
                                            }}>
                                                {categoryName} ({checkedCount}/{categoryFlagKeys.length})
                                            </h5>
                                            <button
                                                onClick={() => handleCategoryToggle(flags, allChecked)}
                                                style={{
                                                    background: someChecked ? '#dc3545' : '#28a745',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '3px',
                                                    padding: '2px 6px',
                                                    fontSize: '10px',
                                                    cursor: 'pointer',
                                                    marginBottom: '8px'
                                                }}
                                                title={allChecked ? '全て解除' : '全て選択'}
                                            >
                                                {allChecked ? '全解除' : '全選択'}
                                            </button>
                                        </div>
                                        <div style={{ 
                                            borderBottom: '1px solid #555',
                                            paddingBottom: '8px',
                                            marginBottom: '8px'
                                        }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px' }}>
                                                {Object.entries(flags).map(([flag, description]) => (
                                                    <label 
                                                        key={flag} 
                                                        style={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center',
                                                            color: '#e0e0e0',
                                                            fontSize: '12px',
                                                            cursor: 'pointer',
                                                            padding: '2px 0'
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.flags[flag] || false}
                                                            onChange={(e) => handleFlagChange(flag, e.target.checked)}
                                                            style={{ 
                                                                marginRight: '6px',
                                                                transform: 'scale(0.9)'
                                                            }}
                                                        />
                                                        <span style={{ 
                                                            fontFamily: 'monospace',
                                                            color: formData.flags[flag] ? '#4caf50' : '#ccc',
                                                            fontWeight: formData.flags[flag] ? 'bold' : 'normal'
                                                        }}>
                                                            {flag}
                                                        </span>
                                                        <span style={{ 
                                                            marginLeft: '8px',
                                                            color: '#aaa',
                                                            fontSize: '11px'
                                                        }}>
                                                            {description}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        {/* 選択済みフラグの概要表示 */}
                        <div style={{ marginTop: '10px', padding: '8px', background: '#2a2a2a', borderRadius: '4px' }}>
                            <h6 style={{ color: '#ccc', fontSize: '12px', margin: '0 0 5px 0' }}>
                                選択済みフラグ ({Object.values(formData.flags).filter(Boolean).length}個):
                            </h6>
                            <div style={{ 
                                fontSize: '11px', 
                                color: '#4caf50',
                                fontFamily: 'monospace',
                                lineHeight: '1.3'
                            }}>
                                {Object.entries(formData.flags)
                                    .filter(([flag, isActive]) => isActive)
                                    .map(([flag]) => flag)
                                    .join(' | ') || '(フラグなし)'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 説明文 */}
                <div style={{ marginTop: '15px' }}>
                    <h4 style={{ color: '#ccc' }}>説明文</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                日本語説明:
                            </label>
                            <textarea
                                value={formData.description_ja}
                                onChange={(e) => handleChange('description_ja', e.target.value)}
                                rows="3"
                                style={{
                                    width: '100%',
                                    padding: '5px',
                                    background: '#1a1a1a',
                                    border: '1px solid #555',
                                    color: '#e0e0e0',
                                    borderRadius: '3px'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#ccc' }}>
                                英語説明:
                            </label>
                            <textarea
                                value={formData.description_en}
                                onChange={(e) => handleChange('description_en', e.target.value)}
                                rows="3"
                                style={{
                                    width: '100%',
                                    padding: '5px',
                                    background: '#1a1a1a',
                                    border: '1px solid #555',
                                    color: '#e0e0e0',
                                    borderRadius: '3px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ボタン */}
                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                    <button
                        onClick={onCancel}
                        style={{
                            background: '#666',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        style={{
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '10px 20px',
                            cursor: 'pointer'
                        }}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}