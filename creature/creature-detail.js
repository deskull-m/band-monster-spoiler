function MonsterDetail({ creature, index, infoList }) {
    const [showModal, setShowModal] = React.useState(false);
    const [tab, setTab] = React.useState("detail");

    // フラグの日本語化マップ
    const flagTranslation = {
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
        "RES_TELE": "テレポート耐性",
        "RES_NETH": "地獄耐性",
        "RES_WATE": "水耐性",
        "RES_PLAS": "プラズマ耐性",
        "RES_NEXU": "因果混乱耐性",
        "RES_DISE": "劣化耐性",
        "RES_ALL": "全耐性",
        "HURT_ROCK": "岩石弱点",
        "HURT_LITE": "光弱点",
        "HURT_FIRE": "火炎弱点",
        "HURT_COLD": "冷気弱点",
        "IM_MELEE": "打撃免疫"
    };

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
function MonsterTableRow({ creature, index, infoList }) {
    const [showModal, setShowModal] = React.useState(false);
    const [tab, setTab] = React.useState("detail");

    // フラグの日本語化マップ（MonsterDetailから複製）
    const flagTranslation = {
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
        "RES_TELE": "テレポート耐性",
        "RES_NETH": "地獄耐性",
        "RES_WATE": "水耐性",
        "RES_PLAS": "プラズマ耐性",
        "RES_NEXU": "因果混乱耐性",
        "RES_DISE": "劣化耐性",
        "RES_ALL": "全耐性",
        "HURT_ROCK": "岩石弱点",
        "HURT_LITE": "光弱点",
        "HURT_FIRE": "火炎弱点",
        "HURT_COLD": "冷気弱点",
        "IM_MELEE": "打撃免疫"
    };

    // 魔法・特殊能力の日本語化マップ（MonsterDetailから複製）
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
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                            setTab("detail");
                            setShowModal(true);
                        }}
                    >
                        編集
                    </button>
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