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
                                            <strong>{creature.flags && creature.flags.includes('FORCE_MAXHP') ? 'HP最大値' : 'HP期待値'}</strong><br />
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
function MonsterEditForm({ creature, allMonsters, onSave, onCancel }) {
    // アライアンス選択肢を定義
    const allianceOptions = [
        { value: 0, name: "無所属" },
        { value: 1, name: "アンバー" },
        { value: 2, name: "混沌の宮廷" },
        { value: 3, name: "ヴァリノール" },
        { value: 4, name: "ウトゥムノ" },
        { value: 5, name: "ジュラル星人" },
        { value: 6, name: "ちんちん亭" },
        { value: 7, name: "オディオ" },
        { value: 8, name: "拳王軍" },
        { value: 9, name: "牙一族" },
        { value: 10, name: "虎眼流" },
        { value: 11, name: "エルドラージ" },
        { value: 12, name: "ウンゴリアント一族" },
        { value: 13, name: "しっと団" },
        { value: 14, name: "オーリック朝銀河帝国（超人ロック）" },
        { value: 15, name: "ターバンのガキ共" },
        { value: 16, name: "全裸騎士団" },
        { value: 17, name: "ヌメノール王国" },
        { value: 18, name: "GO教" },
        { value: 19, name: "ホビット庄" },
        { value: 20, name: "迫真空手部" },
        { value: 21, name: "岡山中高年男児糞尿愛好会" },
        { value: 22, name: "ケツホルデス" },
        { value: 23, name: "メルドール" },
        { value: 24, name: "アンガルタ" },
        { value: 25, name: "ゲッター" },
        { value: 26, name: "清純なるミラディン" },
        { value: 27, name: "KING" },
        { value: 28, name: "ファイレクシア" },
        { value: 29, name: "アヴァリ諸侯" },
        { value: 30, name: "GOLAN" },
        { value: 31, name: "便乗仏教" },
        { value: 32, name: "葦名一門" },
        { value: 33, name: "スレン王国" },
        { value: 34, name: "フェアノール統ノルドール" },
        { value: 35, name: "ガイチ帝国" },
        { value: 36, name: "世紀末救世主伝説" },
        { value: 37, name: "トップハムハット一族" },
        { value: 38, name: "トリオ・ザ・パンチ" },
        { value: 39, name: "秘密結社メガデス" },
        { value: 40, name: "血の神コーン" },
        { value: 41, name: "快楽神スラーネッシュ" },
        { value: 42, name: "覇府" }
    ];

    // アライアンスフラグとアライアンス値のマッピング
    const allianceFlagMapping = {
        "ALLIANCE_AMBER": 1,
        "ALLIANCE_COCHAOS": 2,
        "ALLIANCE_VALINOR": 3,
        "ALLIANCE_UTUMNO": 4,
        "ALLIANCE_JURAL": 5,
        "ALLIANCE_CHINCHINTEI": 6,
        "ALLIANCE_ODIO": 7,
        "ALLIANCE_KENOHGUN": 8,
        "ALLIANCE_FANG_FAMILY": 9,
        "ALLIANCE_KOGAN_RYU": 10,
        "ALLIANCE_ELDRAZI": 11,
        "ALLIANCE_UNGOLIANT": 12,
        "ALLIANCE_SHITTO_DAN": 13,
        "ALLIANCE_GE_ORLIC": 14,
        "ALLIANCE_TURBAN_KIDS": 15,
        "ALLIANCE_NAKED_KNIGHTS": 16,
        "ALLIANCE_NUMENOR": 17,
        "ALLIANCE_GO": 18,
        "ALLIANCE_THE_SHIRE": 19,
        "ALLIANCE_HAKUSIN_KARATE": 20,
        "ALLIANCE_DOKACHANS": 21,
        "ALLIANCE_KETHOLDETH": 22,
        "ALLIANCE_MELDOR": 23,
        "ALLIANCE_ANGARTHA": 24,
        "ALLIANCE_GETTER": 25,
        "ALLIANCE_PURE_MIRRODIN": 26,
        "ALLIANCE_KING": 27,
        "ALLIANCE_PHYREXIA": 28,
        "ALLIANCE_AVARIN_LORDS": 29,
        "ALLIANCE_GOLAN": 30,
        "ALLIANCE_BINJO_BUDDHISM": 31,
        "ALLIANCE_ASHINA_CLAN": 32,
        "ALLIANCE_SUREN": 33,
        "ALLIANCE_FEANOR_NOLDOR": 34,
        "ALLIANCE_GAICHI": 35,
        "ALLIANCE_LEGEND_OF_SAVIOR": 36,
        "ALLIANCE_TOPHAMHATT": 37,
        "ALLIANCE_TRIOTHEPANCH": 38,
        "ALLIANCE_MEGADETH": 39,
        "ALLIANCE_KHORNE": 40,
        "ALLIANCE_SLAANESH": 41,
        "ALLIANCE_HAFU": 42
    };

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
        },
        "アライアンス": {
            "ALLIANCE_AMBER": "アンバー所属",
            "ALLIANCE_COCHAOS": "混沌の宮廷所属",
            "ALLIANCE_VALINOR": "ヴァリノール所属",
            "ALLIANCE_UTUMNO": "ウトゥムノ所属",
            "ALLIANCE_JURAL": "ジュラル星人所属",
            "ALLIANCE_CHINCHINTEI": "ちんちん亭所属",
            "ALLIANCE_ODIO": "オディオ所属",
            "ALLIANCE_KENOHGUN": "拳王軍所属",
            "ALLIANCE_FANG_FAMILY": "牙一族所属",
            "ALLIANCE_KOGAN_RYU": "虎眼流所属",
            "ALLIANCE_ELDRAZI": "エルドラージ所属",
            "ALLIANCE_UNGOLIANT": "ウンゴリアント一族所属",
            "ALLIANCE_SHITTO_DAN": "しっと団所属",
            "ALLIANCE_GE_ORLIC": "オーリック朝銀河帝国所属",
            "ALLIANCE_TURBAN_KIDS": "ターバンのガキ共所属",
            "ALLIANCE_NAKED_KNIGHTS": "全裸騎士団所属",
            "ALLIANCE_NUMENOR": "ヌメノール王国所属",
            "ALLIANCE_GO": "GO教所属",
            "ALLIANCE_THE_SHIRE": "ホビット庄所属",
            "ALLIANCE_HAKUSIN_KARATE": "迫真空手部所属",
            "ALLIANCE_DOKACHANS": "岡山中高年男児糞尿愛好会所属",
            "ALLIANCE_KETHOLDETH": "ケツホルデス所属",
            "ALLIANCE_MELDOR": "メルドール所属",
            "ALLIANCE_ANGARTHA": "アンガルタ所属",
            "ALLIANCE_GETTER": "ゲッター所属",
            "ALLIANCE_PURE_MIRRODIN": "清純なるミラディン所属",
            "ALLIANCE_KING": "KING所属",
            "ALLIANCE_PHYREXIA": "ファイレクシア所属",
            "ALLIANCE_AVARIN_LORDS": "アヴァリ諸侯所属",
            "ALLIANCE_GOLAN": "GOLAN所属",
            "ALLIANCE_BINJO_BUDDHISM": "便乗仏教所属",
            "ALLIANCE_ASHINA_CLAN": "葦名一門所属",
            "ALLIANCE_SUREN": "スレン王国所属",
            "ALLIANCE_FEANOR_NOLDOR": "フェアノール統ノルドール所属",
            "ALLIANCE_GAICHI": "ガイチ帝国所属",
            "ALLIANCE_LEGEND_OF_SAVIOR": "世紀末救世主伝説所属",
            "ALLIANCE_TOPHAMHATT": "トップハムハット一族所属",
            "ALLIANCE_TRIOTHEPANCH": "トリオ・ザ・パンチ所属",
            "ALLIANCE_MEGADETH": "秘密結社メガデス所属",
            "ALLIANCE_KHORNE": "血の神コーン所属",
            "ALLIANCE_SLAANESH": "快楽神スラーネッシュ所属",
            "ALLIANCE_HAFU": "覇府所属"
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

    // HPダイスから期待値を計算する関数（FORCE_MAXHPフラグを考慮）
    const calculateExpectedHP = (dice, sides, hasForceMaxHP) => {
        if (hasForceMaxHP) {
            return dice * sides; // 最大値
        } else {
            return Math.round(dice * (sides + 1) / 2 * 10) / 10; // 平均値
        }
    };

    const initialHp = parseHitPoints(creature.hitPoints || "1d1");

    // 初期フラグ状態を設定
    const initialFlags = {};
    Object.values(flagCategories).forEach(category => {
        Object.keys(category).forEach(flag => {
            initialFlags[flag] = creature.flags ? creature.flags.includes(flag) : false;
        });
    });

    // 初期アライアンス値を取得（アライアンスフラグから推定）
    const getInitialAlliance = () => {
        if (!creature.flags) return 0;
        
        for (const flag of creature.flags) {
            if (allianceFlagMapping[flag]) {
                return allianceFlagMapping[flag];
            }
        }
        return 0;
    };

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
        alliance: getInitialAlliance(),
        flags: initialFlags,
        description_ja: creature.description_ja || "",
        description_en: creature.description_en || ""
    });

    // タブ状態を追加
    const [activeTab, setActiveTab] = React.useState("basic");

    // 進化設定用の状態
    const [searchText, setSearchText] = React.useState("");
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [selectedMonster, setSelectedMonster] = React.useState(null);

    // 進化先モンスターが設定されている場合、初期選択状態を設定
    React.useEffect(() => {
        if (formData.nextMon && allMonsters) {
            const monster = allMonsters.find(m => m.serialNumber === formData.nextMon);
            if (monster) {
                setSelectedMonster(monster);
                setSearchText(`${monster.name} / ${monster.ename}`);
            }
        }
    }, [formData.nextMon, allMonsters]);

    // 検索フィルター
    const filteredMonsters = React.useMemo(() => {
        if (!allMonsters || !searchText.trim()) return [];
        
        const search = searchText.toLowerCase();
        return allMonsters
            .filter(monster => 
                monster.serialNumber !== creature.serialNumber && // 自分自身を除外
                (monster.name.toLowerCase().includes(search) || 
                 monster.ename.toLowerCase().includes(search) ||
                 monster.serialNumber.toString().includes(search))
            )
            .slice(0, 10); // 最大10件まで表示
    }, [allMonsters, searchText, creature.serialNumber]);

    const handleMonsterSelect = (monster) => {
        setSelectedMonster(monster);
        setSearchText(`${monster.name} / ${monster.ename}`);
        handleChange('nextMon', monster.serialNumber);
        setShowDropdown(false);
    };

    const handleClearMonster = () => {
        setSelectedMonster(null);
        setSearchText("");
        handleChange('nextMon', 0);
    };

    const handleRemoveEvolution = () => {
        if (confirm("進化設定を削除しますか？")) {
            handleChange('nextExp', 0);
            handleChange('nextMon', 0);
            handleClearMonster();
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleFlagChange = (flag, checked) => {
        setFormData(prev => {
            const newFlags = {
                ...prev.flags,
                [flag]: checked
            };
            
            let newAlliance = prev.alliance;
            
            // アライアンスフラグの場合、対応するアライアンス値を設定
            if (flag.startsWith('ALLIANCE_')) {
                if (checked) {
                    // アライアンスフラグが選択された場合、対応するアライアンス値を設定
                    newAlliance = allianceFlagMapping[flag] || 0;
                    
                    // 他のアライアンスフラグを無効化（1つのモンスターは1つのアライアンスのみ）
                    Object.keys(allianceFlagMapping).forEach(allianceFlag => {
                        if (allianceFlag !== flag) {
                            newFlags[allianceFlag] = false;
                        }
                    });
                } else {
                    // アライアンスフラグが解除された場合、無所属に設定
                    newAlliance = 0;
                }
            }
            
            return {
                ...prev,
                flags: newFlags,
                alliance: newAlliance
            };
        });
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
        <div className="monster-edit-overlay">
            <div className="monster-edit-form">
                <div className="monster-edit-header">
                    <h3>
                        モンスター編集 - ID: {formData.serialNumber}
                    </h3>
                    
                    {/* タブナビゲーション */}
                    <ul className="nav nav-tabs monster-edit-tabs">
                        <li className="nav-item">
                            <button
                                className={`nav-link${activeTab === "basic" ? " active" : ""}`}
                                onClick={() => setActiveTab("basic")}
                                type="button"
                            >
                                基本設定
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link${activeTab === "flags" ? " active" : ""}`}
                                onClick={() => setActiveTab("flags")}
                                type="button"
                            >
                                フラグ
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link${activeTab === "evolution" ? " active" : ""}`}
                                onClick={() => setActiveTab("evolution")}
                                type="button"
                            >
                                🧬 進化設定
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="monster-edit-content">
                    {activeTab === "basic" && (
                        <div className="monster-edit-grid">
                            {/* 基本情報 */}
                            <div>
                                <h4>基本情報</h4>
                                <div style={{ marginBottom: '10px' }}>
                                    <label className="monster-edit-label">
                                        日本語名:
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className="monster-edit-input"
                                    />
                                </div>
                                <div style={{ marginBottom: '10px' }}>
                                    <label className="monster-edit-label">
                                        英語名:
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ename}
                                        onChange={(e) => handleChange('ename', e.target.value)}
                                        className="monster-edit-input"
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div>
                                        <label className="monster-edit-label">
                                            シンボル:
                                        </label>
                                        <input
                                            type="text"
                                            maxLength="1"
                                            value={formData.symbol}
                                            onChange={(e) => handleChange('symbol', e.target.value)}
                                            className="monster-edit-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="monster-edit-label">
                                            色:
                                        </label>
                                        <select
                                            value={formData.color}
                                            onChange={(e) => handleChange('color', e.target.value)}
                                            className="monster-edit-select"
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
                                <h4>能力値</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div>
                                        <label className="monster-edit-label">
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
                                            className="monster-edit-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="monster-edit-label">
                                            AC:
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.armor_class}
                                            onChange={(e) => handleChange('armor_class', parseInt(e.target.value) || 0)}
                                            className="monster-edit-input"
                                        />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label className="monster-edit-label">
                                            HP:
                                        </label>
                                        <div className="monster-hp-grid">
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.hpDice}
                                                onChange={(e) => handleChange('hpDice', Math.max(1, parseInt(e.target.value) || 1))}
                                                className="monster-edit-input"
                                                placeholder="ダイス数"
                                            />
                                            <span className="monster-hp-separator">d</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={formData.hpSides}
                                                onChange={(e) => handleChange('hpSides', Math.max(1, parseInt(e.target.value) || 1))}
                                                className="monster-edit-input"
                                                placeholder="面数"
                                            />
                                            <div className="monster-hp-expected">
                                                {formData.flags.FORCE_MAXHP ? '最大' : '平均'}: {calculateExpectedHP(formData.hpDice, formData.hpSides, formData.flags.FORCE_MAXHP)}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#888', marginTop: '3px' }}>
                                            形式: {formData.hpDice}d{formData.hpSides}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="monster-edit-label">
                                            視界:
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.vision}
                                            onChange={(e) => handleChange('vision', parseInt(e.target.value) || 0)}
                                            className="monster-edit-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="monster-edit-label">
                                            警戒度:
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.alertness}
                                            onChange={(e) => handleChange('alertness', parseInt(e.target.value) || 0)}
                                            className="monster-edit-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* レベル・経験値・アライアンス */}
                            <div>
                                <h4>レベル・経験値・アライアンス</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                                    <div>
                                        <label className="monster-edit-label">
                                            レベル:
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.depth}
                                            onChange={(e) => handleChange('depth', parseInt(e.target.value) || 0)}
                                            className="monster-edit-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="monster-edit-label">
                                            希少度:
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.rarity}
                                            onChange={(e) => handleChange('rarity', parseInt(e.target.value) || 1)}
                                            className="monster-edit-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="monster-edit-label">
                                            経験値:
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.exp}
                                            onChange={(e) => handleChange('exp', parseInt(e.target.value) || 0)}
                                            className="monster-edit-input"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="monster-edit-label">
                                        所属アライアンス:
                                    </label>
                                    <select
                                        value={formData.alliance || 0}
                                        onChange={(e) => handleChange('alliance', parseInt(e.target.value))}
                                        className="monster-edit-select"
                                    >
                                        {allianceOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.value} - {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "flags" && (
                        <div className="monster-flags-container">
                            <h4>フラグ</h4>
                            <div className="monster-flags-grid">
                                {Object.entries(flagCategories).map(([categoryName, flags]) => {
                                    const categoryFlagKeys = Object.keys(flags);
                                    const checkedCount = categoryFlagKeys.filter(flag => formData.flags[flag]).length;
                                    const allChecked = checkedCount === categoryFlagKeys.length;
                                    
                                    return (
                                        <div key={categoryName} className="monster-flag-category" style={{ marginBottom: '10px' }}>
                                            <div className="monster-flag-category-header">
                                                <h5>
                                                    {categoryName} ({checkedCount}/{categoryFlagKeys.length})
                                                </h5>
                                                <button
                                                    onClick={() => handleCategoryToggle(flags, allChecked)}
                                                    className={`monster-flag-toggle-btn ${allChecked ? 'clear' : ''}`}
                                                    title={allChecked ? '全て解除' : '全て選択'}
                                                >
                                                    {allChecked ? '全解除' : '全選択'}
                                                </button>
                                            </div>
                                            <div className="monster-flag-category-content">
                                                <div className="monster-flag-grid">
                                                    {Object.entries(flags).map(([flag, description]) => (
                                                        <label 
                                                            key={flag} 
                                                            className="monster-flag-label"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.flags[flag] || false}
                                                                onChange={(e) => handleFlagChange(flag, e.target.checked)}
                                                                className="monster-flag-checkbox"
                                                            />
                                                            <span className={`monster-flag-name ${formData.flags[flag] ? 'active' : ''}`}>
                                                                {flag}
                                                            </span>
                                                            <span className="monster-flag-description">
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
                            <div className="monster-flags-summary">
                                <h6>
                                    選択済みフラグ ({Object.values(formData.flags).filter(Boolean).length}個):
                                </h6>
                                <div className="monster-flags-list">
                                    {Object.entries(formData.flags)
                                        .filter(([flag, isActive]) => isActive)
                                        .map(([flag]) => flag)
                                        .join(' | ') || '(フラグなし)'}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "evolution" && (
                        <div className="evolution-tab-content">
                            <h4>🧬 進化設定</h4>
                            
                            {/* 現在の進化設定表示 */}
                            <div className="evolution-current-info">
                                <h5>現在の設定</h5>
                                {formData.nextMon > 0 ? (
                                    <div className="current-evolution">
                                        <div>進化先: {selectedMonster ? `${selectedMonster.name} (ID: ${selectedMonster.serialNumber})` : `ID: ${formData.nextMon}`}</div>
                                        <div>必要経験値: {formData.nextExp}</div>
                                    </div>
                                ) : (
                                    <div className="no-evolution">進化設定なし</div>
                                )}
                            </div>

                            {/* 必要経験値入力 */}
                            <div className="evolution-form-group">
                                <label className="evolution-form-label">
                                    進化に必要な経験値:
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.nextExp}
                                    onChange={(e) => handleChange('nextExp', parseInt(e.target.value) || 0)}
                                    className="evolution-form-input"
                                    placeholder="経験値を入力 (0で進化なし)"
                                />
                                <div className="evolution-help-text">
                                    0を設定すると進化しません。通常は倒した時に得られる経験値の2-5倍程度が目安です。
                                </div>
                            </div>

                            {/* 進化先モンスター選択 */}
                            <div className="evolution-form-group">
                                <label className="evolution-form-label">
                                    進化先モンスター:
                                </label>
                                
                                <div className="evolution-monster-search">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={(e) => {
                                            setSearchText(e.target.value);
                                            setShowDropdown(true);
                                        }}
                                        onFocus={() => setShowDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                                        placeholder="モンスター名またはIDで検索..."
                                        className="evolution-search-input"
                                    />
                                    
                                    {showDropdown && filteredMonsters.length > 0 && (
                                        <div className="evolution-dropdown">
                                            {filteredMonsters.map(monster => (
                                                <div
                                                    key={monster.serialNumber}
                                                    className="evolution-dropdown-item"
                                                    onMouseDown={() => handleMonsterSelect(monster)}
                                                >
                                                    <div className="evolution-monster-name">
                                                        {monster.name} / {monster.ename}
                                                    </div>
                                                    <div className="evolution-monster-id">
                                                        ID: {monster.serialNumber}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* 選択されたモンスター表示 */}
                                {selectedMonster && (
                                    <div className="evolution-selected-monster">
                                        <div className="monster-info">
                                            <div>
                                                <strong>{selectedMonster.name} / {selectedMonster.ename}</strong>
                                                <div className="monster-details">
                                                    ID: {selectedMonster.serialNumber} | 
                                                    レベル: {selectedMonster.depth} | 
                                                    HP: {selectedMonster.hp_expected} | 
                                                    速度: {selectedMonster.speed}
                                                </div>
                                            </div>
                                            <button
                                                onClick={handleClearMonster}
                                                className="evolution-clear-btn"
                                                type="button"
                                            >
                                                クリア
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="evolution-help-text">
                                    進化先として適切なモンスターを選択してください。通常は現在のモンスターより強力なモンスターを選びます。
                                </div>
                            </div>

                            {/* 進化設定削除ボタン */}
                            {(formData.nextMon > 0 || formData.nextExp > 0) && (
                                <div className="evolution-actions">
                                    <button
                                        onClick={handleRemoveEvolution}
                                        className="evolution-btn-remove"
                                        type="button"
                                    >
                                        進化設定を削除
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* ボタン */}
                <div className="monster-edit-buttons">
                    <button
                        onClick={onCancel}
                        className="monster-btn-cancel"
                        type="button"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="monster-btn-save"
                        type="button"
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}

// 進化設定ダイアログコンポーネント
function EvolutionDialog({ creature, allMonsters, currentEvolution, onSave, onCancel }) {
    const [evolutionData, setEvolutionData] = React.useState({
        nextExp: currentEvolution.nextExp || 0,
        nextMon: currentEvolution.nextMon || 0
    });

    const [searchText, setSearchText] = React.useState("");
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [selectedMonster, setSelectedMonster] = React.useState(null);

    // 進化先モンスターが設定されている場合、初期選択状態を設定
    React.useEffect(() => {
        if (currentEvolution.nextMon && allMonsters) {
            const monster = allMonsters.find(m => m.serialNumber === currentEvolution.nextMon);
            if (monster) {
                setSelectedMonster(monster);
                setSearchText(`${monster.name} / ${monster.ename}`);
            }
        }
    }, [currentEvolution.nextMon, allMonsters]);

    // 検索フィルター
    const filteredMonsters = React.useMemo(() => {
        if (!allMonsters || !searchText.trim()) return [];
        
        const search = searchText.toLowerCase();
        return allMonsters
            .filter(monster => 
                monster.serialNumber !== creature.serialNumber && // 自分自身を除外
                (monster.name.toLowerCase().includes(search) || 
                 monster.ename.toLowerCase().includes(search) ||
                 monster.serialNumber.toString().includes(search))
            )
            .slice(0, 10); // 最大10件まで表示
    }, [allMonsters, searchText, creature.serialNumber]);

    const handleMonsterSelect = (monster) => {
        setSelectedMonster(monster);
        setSearchText(`${monster.name} / ${monster.ename}`);
        setEvolutionData(prev => ({
            ...prev,
            nextMon: monster.serialNumber
        }));
        setShowDropdown(false);
    };

    const handleClearMonster = () => {
        setSelectedMonster(null);
        setSearchText("");
        setEvolutionData(prev => ({
            ...prev,
            nextMon: 0
        }));
    };

    const handleSave = () => {
        onSave(evolutionData);
    };

    const handleRemoveEvolution = () => {
        if (confirm("進化設定を削除しますか？")) {
            onSave({ nextExp: 0, nextMon: 0 });
        }
    };

    return (
        <div className="evolution-dialog-overlay">
            <div className="evolution-dialog">
                <h4>🧬 進化設定 - {creature.name}</h4>
                
                {/* 現在の進化設定表示 */}
                <div className="evolution-current-info">
                    <h5>現在の設定</h5>
                    {currentEvolution.nextMon > 0 ? (
                        <div className="current-evolution">
                            <div>進化先: {selectedMonster ? `${selectedMonster.name} (ID: ${selectedMonster.serialNumber})` : `ID: ${currentEvolution.nextMon}`}</div>
                            <div>必要経験値: {currentEvolution.nextExp}</div>
                        </div>
                    ) : (
                        <div className="no-evolution">進化設定なし</div>
                    )}
                </div>

                {/* 必要経験値入力 */}
                <div className="evolution-form-group">
                    <label className="evolution-form-label">
                        進化に必要な経験値:
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={evolutionData.nextExp}
                        onChange={(e) => setEvolutionData(prev => ({
                            ...prev,
                            nextExp: parseInt(e.target.value) || 0
                        }))}
                        className="evolution-form-input"
                        placeholder="経験値を入力 (0で進化なし)"
                    />
                    <div className="evolution-help-text">
                        0を設定すると進化しません。通常は倒した時に得られる経験値の2-5倍程度が目安です。
                    </div>
                </div>

                {/* 進化先モンスター選択 */}
                <div className="evolution-form-group">
                    <label className="evolution-form-label">
                        進化先モンスター:
                    </label>
                    
                    <div className="evolution-monster-search">
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => {
                                setSearchText(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                            placeholder="モンスター名またはIDで検索..."
                            className="evolution-search-input"
                        />
                        
                        {showDropdown && filteredMonsters.length > 0 && (
                            <div className="evolution-dropdown">
                                {filteredMonsters.map(monster => (
                                    <div
                                        key={monster.serialNumber}
                                        className="evolution-dropdown-item"
                                        onMouseDown={() => handleMonsterSelect(monster)}
                                    >
                                        <div className="evolution-monster-name">
                                            {monster.name} / {monster.ename}
                                        </div>
                                        <div className="evolution-monster-id">
                                            ID: {monster.serialNumber}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 選択されたモンスター表示 */}
                    {selectedMonster && (
                        <div className="evolution-selected-monster">
                            <div className="monster-info">
                                <div>
                                    <strong>{selectedMonster.name} / {selectedMonster.ename}</strong>
                                    <div className="monster-details">
                                        ID: {selectedMonster.serialNumber} | 
                                        レベル: {selectedMonster.depth} | 
                                        HP: {selectedMonster.hp_expected} | 
                                        速度: {selectedMonster.speed}
                                    </div>
                                </div>
                                <button
                                    onClick={handleClearMonster}
                                    className="evolution-clear-btn"
                                    type="button"
                                >
                                    クリア
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="evolution-help-text">
                        進化先として適切なモンスターを選択してください。通常は現在のモンスターより強力なモンスターを選びます。
                    </div>
                </div>

                {/* ボタン */}
                <div className="evolution-dialog-buttons">
                    {(currentEvolution.nextMon > 0 || currentEvolution.nextExp > 0) && (
                        <button
                            onClick={handleRemoveEvolution}
                            className="evolution-btn-remove"
                        >
                            進化設定を削除
                        </button>
                    )}
                    <button
                        onClick={onCancel}
                        className="evolution-btn-cancel"
                    >
                        キャンセル
                    </button>
                    <button
                        onClick={handleSave}
                        className="evolution-btn-save"
                        disabled={evolutionData.nextExp <= 0 || evolutionData.nextMon <= 0}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}