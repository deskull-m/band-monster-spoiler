class Creature {

    inRange(v, min, max) {
        if(v < min)
            return min;
        if(v > max)
            return max;
        return v;
    }

    static colorSymbol = {
        'D': 'Dark Gray',
        'w': 'White',
        's': 'Gray',
        'o': 'Orange',
        'r': 'Red',
        'g': 'Green',
        'b': 'Blue',
        'u': 'Brown',
        'd': 'Black',
        'W': 'Light Gray',
        'v': 'Violet',
        'y': 'Yellow',
        'R': 'Light Red',
        'G': 'Light Green',
        'B': 'Light Blue',
        'U': 'Light Brown'
    };

    displayInfo() {
        return `${this.serialNumber} ${this.name} (${this.symbol})`;
    }

    putJson() {
        let j = {
            id: this.serialNumber,
            name: {
                ja: this.name,
                en: this.ename,
            },
            symbol: {
                character: this.symbol,
                color: Creature.colorSymbol[this.color],
            },
            speed: this.speed,
            hit_point: this.hitPoints,
            vision: this.inRange(this.vision, 0, 999),
            armor_class: this.inRange(this.armor_class, 0, 10000),
            alertness: this.alertness,
            level: this.depth,
            rarity: this.rarity,
            exp: this.exp,
            next_exp: this.nextExp,
            next_mon: this.nextMon,
            escorts: this.escorts
        };

        // blows
        if (this.attacks && this.attacks.length > 0) {
            j.blows = [];
            this.attacks.forEach(atk => {
                if (atk.method === "SHOOT") {
                    if (!j.skill) j.skill = {};
                    j.skill.shoot = atk.damage;
                } else {
                    j.blows.push({
                        method: atk.method,
                        effect: atk.effect,
                        damage_dice: atk.damage
                    });
                }
            });
            // 空配列ならblowsを削除
            if (j.blows.length === 0) delete j.blows;
        }

        // flavor
        if (this.description_ja || this.description_en) {
            j.flavor = {};
            if (this.description_ja) j.flavor.ja = this.description_ja;
            if (this.description_en) j.flavor.en = this.description_en;
        }

        // sex
        let sexes = "";
        if (this.flags.includes("MALE")) {
            sexes = "MALE";
        } else if (this.flags.includes("FEMALE")) {
            sexes = "FEMALE";
        }
        if (sexes.length > 0) {
            j.sex = sexes;
        }

        // alliance
        const allianceFlags = this.flags.filter(f => f.startsWith("ALLIANCE_"));
        if (allianceFlags.length > 0) {
            j.alliance = allianceFlags[0].split("_")[1];
        }

        const collapseFlags = this.flags.filter(f => f.startsWith("COLLAPSE_"));
        if (collapseFlags.length > 0) {
            j.collapse = collapseFlags[0].split("_")[1];
        }

        const perhpFlags = this.flags.filter(f => f.startsWith("PERHP_"));
        if (perhpFlags.length > 0) {
            j.perhp = perhpFlags[0].split("_")[1];
        }

        const mobFlags = this.flags.filter(f => f.startsWith("MOB_"));
        if (mobFlags.length > 0) {
            j.mob = parseInt(mobFlags[0].split("_")[1], 10);
        }

        const collapseOverFlags = this.flags.filter(f => f.startsWith("COLLAPSE-OVER_"));
        if (collapseOverFlags.length > 0) {
            j.collapse_over = collapseOverFlags[0].split("_")[1];
        }

        const suicideFlags = this.flags.filter(f => f.startsWith("SUICIDE_"));
        if (suicideFlags.length > 0) {
            j.suicide = suicideFlags[0].split("_")[1];
        }

        const motherFlags = this.flags.filter(f => f.startsWith("MOTHER_"));
        if (motherFlags.length > 0) {
            j.mother = motherFlags[0].split("_")[1];
        }

        const fatherFlags = this.flags.filter(f => f.startsWith("FATHER_"));
        if (fatherFlags.length > 0) {
            j.father = fatherFlags[0].split("_")[1];
        }

        // flags (PREVENT_SUDDEN_MAGIC除外, ALLIANCE_*除外)
        const filteredFlags = this.flags.filter(
            f => f !== "PREVENT_SUDDEN_MAGIC" &&
                f !== "MALE" &&
                f !== "FEMALE" &&
                !f.startsWith("ALLIANCE_") &&
                !f.startsWith("COLLAPSE_") &&
                !f.startsWith("COLLAPSE-OVER_") &&
                !f.startsWith("PERHP_") &&
                !f.startsWith("MOB_") &&
                !f.startsWith("SUICIDE_") &&
                !f.startsWith("MOTHER_") &&
                !f.startsWith("FATHER_") &&
                !f.startsWith("SPAWN_CREATURE_") &&
                !f.startsWith("SPAWN_ITEM_") &&
                !f.startsWith("SPAWN_FEATURE_") &&
                !f.startsWith("DROP_KIND_") &&
                !f.startsWith("DEAD_SPAWN_")
        );
        if (!/^\s*$/.test(filteredFlags.join(''))) {
            j.flags = filteredFlags;
        }

        // spellsをskill項目に変換
        const probabilityList = this.skills
            .filter(f => /_IN_/.test(f))
            .flatMap(f => f.split('|').map(x => x.trim()).filter(x => x.length > 0));
        const skillList = this.skills
            .filter(f => !/_IN_/.test(f))
            .flatMap(f => f.split('|').map(x => x.trim()).filter(x => x.length > 0));
        if (skillList.length > 0 || probabilityList.length > 0) {
            if (!j.skill) j.skill = {};
            if (skillList.length > 0) j.skill.list = skillList;
            if (probabilityList.length > 0) j.skill.probability = probabilityList[0];
        }

        // DROP_KIND_* の処理（複数対応）
        const dropKindFlags = this.flags.filter(f => f.startsWith("DROP_KIND_"));
        if (dropKindFlags.length > 0) {
            j.drop_kind = dropKindFlags.map(flag => {
                // 例: DROP_KIND_1_IN_5_102_0_1d1
                const dropParts = flag.replace("DROP_KIND_", "").split("_");
                // 1_IN_5_102_0_1d1 → ["1", "IN", "5", "102", "0", "1d1"]
                if (dropParts.length >= 5) {
                    const probability = dropParts.slice(0, 3).join("_");
                    const item_id = dropParts[3];
                    const grade = dropParts[4];
                    const dice = dropParts[5] || "";
                    return {
                        probability,
                        item_id,
                        grade,
                        dice
                    };
                }
                return null;
            }).filter(x => x !== null);
        }

        const spawnCreatureFlags = this.flags.filter(f => /^SPAWN_CREATURE_\d+_IN_\d+_\d+$/.test(f));
        if (spawnCreatureFlags.length > 0) {
            j.spawn_creature = spawnCreatureFlags.map(flag => {
                // 例: SPAWN_CREATURE_123_1_IN_5
                // id: 123, probability: 1_IN_5
                const match = flag.match(/^SPAWN_CREATURE_(\d+_IN_\d+)_(\d+)$/);
                if (match) {
                    return {
                        id: parseInt(match[2], 10),
                        probability: match[1]
                    };
                }
                return null;
            }).filter(x => x !== null);
        }

        const spawnItemFlags = this.flags.filter(f => /^SPAWN_ITEM_\d+_IN_\d+_\d+$/.test(f));
        if (spawnItemFlags.length > 0) {
            j.spawn_item = spawnItemFlags.map(flag => {
                const match = flag.match(/^SPAWN_ITEM_(\d+_IN_\d+)_(\d+)$/);
                if (match) {
                    return {
                        id: parseInt(match[2], 10),
                        probability: match[1]
                    };
                }
                return null;
            }).filter(x => x !== null);
        }

        const deadSpawnCreatureFlags = this.flags.filter(f => /^DEAD_SPAWN_\d+_IN_\d+_\d+_\d+d\d+$/.test(f));
        if (deadSpawnCreatureFlags.length > 0) {
            j.dead_spawn = deadSpawnCreatureFlags.map(flag => {
                const match = flag.match(/^DEAD_SPAWN_(\d+_IN_\d+)_(\d+)_(\d+d\d+)$/);
                if (match) {
                    return {
                        id: parseInt(match[2], 10),
                        probability: match[1],
                        dice: match[3]
                    };
                }
                return null;
            }).filter(x => x !== null);
        }

        const spawnFeatureFlags = this.flags.filter(f => /^SPAWN_FEATURE_\d+_IN_\d+_\d+$/.test(f));
        if (spawnFeatureFlags.length > 0) {
            j.terrain_feature = spawnFeatureFlags.map(flag => {
                // 例: SPAWN_FEATURE_123_1_IN_5
                // id: 123, probability: 1_IN_5
                const match = flag.match(/^SPAWN_FEATURE_(\d+_IN_\d+)_(\d+)$/);
                if (match) {
                    return {
                        id: parseInt(match[2], 10),
                        probability: match[1]
                    };
                }
                return null;
            }).filter(x => x !== null);
        }

        return JSON.stringify(j, null, 4);
    }

    constructor(text) {

        // 各行を分割
        const lines = text.split("\r\n");

        this.textDetails = text;
        this.flags = [];
        this.escorts = [];
        this.skills = [];
        this.description_ja = "";
        this.description_en = "";

        this.depth = 0;
        this.rarity = 1;
        this.exp = 0;
        this.nextExp = 0;
        this.nextMon = 0;
        this.speed = 0;

        lines.forEach(line => {
            const key = line.charAt(0); // 行の最初の文字で判断
            const values = line.substring(2).split(':'); // データを抽出

            switch (key) {
                case 'N':
                    const [serialNumber, name] = values;
                    this.serialNumber = parseInt(serialNumber);
                    this.name = name;
                    break;
                case 'E':
                    const [ename] = values;
                    this.ename = ename;
                    break;
                case 'G':
                    const [symbol, color] = values;
                    this.symbol = symbol;
                    this.color = color;
                    break;
                case 'I':
                    const [speed, hitPoints, vision, armorClass, alertness] = values;
                    this.speed = Number(speed) - 110; // jsonでは基準が0になったので110を引く
                    if (this.speed < -50) {
                        this.speed = -50;
                    }
                    if (this.speed >= 100) {
                        this.speed = 99;
                    }
                    this.hitPoints = hitPoints;
                    this.vision = Number(vision);
                    this.armor_class = Number(armorClass);
                    this.alertness = Number(alertness);
                    break;
                case 'W':
                    if(values.length == 5) {
                        const [depth, rarity, exp, nextExp, nextMon] = values.map(Number);
                        this.depth = depth;
                        this.rarity = rarity;
                        this.exp = exp;
                        this.nextExp = nextExp;
                        this.nextMon = nextMon;
                    } else if (values.length == 6) {
                        const [depth, rarity, _, exp, nextExp, nextMon] = values.map(Number);
                        this.depth = depth;
                        this.rarity = rarity;
                        this.exp = exp;
                        this.nextExp = nextExp;
                        this.nextMon = nextMon;
                    }
                    break;
                case 'B':
                    if (!this.attacks) this.attacks = [];
                    const [method, effect, damage] = values;
                    this.attacks.push({ method, effect, damage });
                    break;
                case 'S':
                    this.skills.push(
                        ...values[0]
                            .split(/\s*\|\s*/)
                            .map(f => f.trim())
                            .filter(f => f.length > 0)
                    );
                    break;
                case 'F':
                    this.flags.push(
                        ...values[0]
                            .split(/\s*\|\s*/)
                            .map(f => f.trim())
                            .filter(f => f.length > 0)
                    );
                    break;
                case 'D':
                    if (values[0][0] === '$') {
                        this.description_en += values.join(' ').substring(1);
                    }
                    else {
                        this.description_ja += values.join(' ');
                    }
                    break;
                case 'R':
                    const [escorts_id, escort_num] = values;
                    this.escorts.push(
                        { escorts_id: Number(escorts_id), escort_num: escort_num }
                    );
            }
        });

        // HP期待値計算
        this.hp_expected = null;
        const m = this.hitPoints.match(/^(\d+)d(\d+)$/);
        if (m) {
            const x = parseInt(m[1], 10);
            const y = parseInt(m[2], 10);
            if (this.flags && this.flags.includes("FORCE_MAXHP")) {
                this.hp_expected = x * y;
            } else {
                this.hp_expected = ((y + 1) / 2) * x;
            }
        } else if (!isNaN(Number(hitPoints))) {
            this.hp_expected = Number(hitPoints);
        }

    };

    /**
     * JSONCからCreatureインスタンスを生成する静的メソッド
     * @param {object} json モンスター1体分のJSONデータ
     * @returns {Creature}
     */
    static getJson(json) {
        const c = new Creature(""); // 空テキストで初期化

        // 基本情報
        c.serialNumber = json.id ?? 0;
        c.name = json.name?.ja ?? "";
        c.ename = json.name?.en ?? "";

        c.symbol = json.symbol?.character ?? "";
        // 色は逆引き不可なのでcolorSymbolの逆引き辞書を作る
        if (json.symbol?.color) {
            const colorEntry = Object.entries(Creature.colorSymbol)
                .find(([k, v]) => v === json.symbol.color);
            c.color = colorEntry ? colorEntry[0] : "";
        } else {
            c.color = "";
        }

        c.speed = typeof json.speed === "number" ? json.speed : 0;
        c.hitPoints = json.hit_point ?? "";
        c.vision = json.vision ?? 0;
        c.armor_class = json.armor_class ?? 0;
        c.alertness = json.alertness ?? 0;
        c.depth = json.level ?? 0;
        c.rarity = json.rarity ?? 1;
        c.exp = json.exp ?? 0;
        c.nextExp = json.next_exp ?? 0;
        c.nextMon = json.next_mon ?? 0;

        if(c.escorts.length > 0){
            c.escorts = json.escorts.map(e => {
                return [e.id, e.num];
            });
        }

        // attacks
        c.attacks = [];
        if (Array.isArray(json.blows)) {
            json.blows.forEach(b => {
                c.attacks.push({
                    method: b.method ?? "",
                    effect: b.effect ?? "",
                    damage: b.damage_dice ?? ""
                });
            });
        }
        if (json.skill?.shoot) {
            c.attacks.push({
                method: "SHOOT",
                effect: "",
                damage: json.skill.shoot
            });
        }

        // flavor
        c.description_ja = json.flavor?.ja ?? "";
        c.description_en = json.flavor?.en ?? "";

        // flags
        c.flags = Array.isArray(json.flags) ? [...json.flags] : [];

        // sex
        if (json.sex === "MALE") c.flags.push("MALE");
        if (json.sex === "FEMALE") c.flags.push("FEMALE");

        // alliance, collapse, perhp, mob, collapse_over, suicide, mother, father
        if (json.alliance) c.flags.push(`ALLIANCE_${json.alliance}`);
        if (json.collapse) c.flags.push(`COLLAPSE_${json.collapse}`);
        if (json.perhp) c.flags.push(`PERHP_${json.perhp}`);
        if (json.mob) c.flags.push(`MOB_${json.mob}`);
        if (json.collapse_over) c.flags.push(`COLLAPSE-OVER_${json.collapse_over}`);
        if (json.suicide) c.flags.push(`SUICIDE_${json.suicide}`);
        if (json.mother) c.flags.push(`MOTHER_${json.mother}`);
        if (json.father) c.flags.push(`FATHER_${json.father}`);

        // skills
        c.skills = [];
        if (json.skill?.list) {
            c.skills.push(...json.skill.list);
        }
        if (json.skill?.probability) {
            c.skills.push(json.skill.probability);
        }

        // DROP_KIND_*
        if (Array.isArray(json.drop_kind)) {
            json.drop_kind.forEach(dk => {
                let flag = `DROP_KIND_${dk.probability}_${dk.item_id}_${dk.grade}`;
                if (dk.dice) flag += `_${dk.dice}`;
                c.flags.push(flag);
            });
        }

        // SPAWN_CREATURE_*
        if (Array.isArray(json.spawn_creature)) {
            json.spawn_creature.forEach(sc => {
                c.flags.push(`SPAWN_CREATURE_${sc.probability}_${sc.id}`);
            });
        }

        // SPAWN_ITEM_*
        if (Array.isArray(json.spawn_item)) {
            json.spawn_item.forEach(si => {
                c.flags.push(`SPAWN_ITEM_${si.probability}_${si.id}`);
            });
        }

        // DEAD_SPAWN_*
        if (Array.isArray(json.dead_spawn)) {
            json.dead_spawn.forEach(ds => {
                c.flags.push(`DEAD_SPAWN_${ds.probability}_${ds.id}_${ds.dice}`);
            });
        }

        // SPAWN_FEATURE_*
        if (Array.isArray(json.terrain_feature)) {
            json.terrain_feature.forEach(sf => {
                c.flags.push(`SPAWN_FEATURE_${sf.probability}_${sf.id}`);
            });
        }

        // その他のtextDetails
        c.textDetails = ""; // 必要なら再構成

        // HP期待値再計算
        c.hp_expected = null;
        const m = typeof c.hitPoints === "string" ? c.hitPoints.match(/^(\d+)d(\d+)$/) : null;
        if (m) {
            const x = parseInt(m[1], 10);
            const y = parseInt(m[2], 10);
            if (c.flags && c.flags.includes("FORCE_MAXHP")) {
                c.hp_expected = x * y;
            } else {
                c.hp_expected = ((y + 1) / 2) * x;
            }
        } else if (!isNaN(Number(c.hitPoints))) {
            c.hp_expected = Number(c.hitPoints);
        }

        return c;
    }

}
