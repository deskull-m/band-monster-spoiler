class Creature {

    inRange(v, min, max) {
        if(v < min)
            return min;
        if(v > max)
            return max;
        return v;
    }

    static colorSymbol = {
        'D': 'Black',
        'w': 'White',
        's': 'Gray',
        'o': 'Orange',
        'r': 'Red',
        'g': 'Green',
        'b': 'Blue',
        'u': 'Brown',
        'd': 'Dark Gray',
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
            armor_class: this.armor_class,
            alertness: this.alertness,
            level: this.depth,
            rarity: this.rarity,
            exp: this.exp,
            next_exp: this.nextExp,
            next_mon: this.nextMon,
        };

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
            j.mob = mobFlags[0].split("_")[1];
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
                !f.startsWith("PERHP_") &&
                !f.startsWith("MOB_") &&
                !f.startsWith("SUICIDE_") &&
                !f.startsWith("MOTHER_") &&
                !f.startsWith("FATHER_") &&
                !f.startsWith("SPAWN_CREATURE_") &&
                !f.startsWith("SPAWN_FEATURE_") &&
                !f.startsWith("DROP_KIND_")
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
        console.log(lines);

        this.textDetails = text;
        this.flags = [];
        this.skills = [];

        this.depth = 0;
        this.rarity = 1;
        this.exp = 0;
        this.nextExp = 0;
        this.nextMon = 0;
        this.speed = 0;

        lines.forEach(line => {
            //console.log(line);
            const key = line.charAt(0); // 行の最初の文字で判断
            const values = line.substring(2).split(':'); // データを抽出

            switch (key) {
                case 'N':
                    const [serialNumber, name] = values;
                    //console.log("////////////////////////////");
                    //console.log(serialNumber, name);
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
                    const [depth, rarity, exp, nextExp, nextMon] = values.map(Number);
                    this.depth = depth;
                    this.rarity = rarity;
                    this.exp = exp;
                    this.nextExp = nextExp;
                    this.nextMon = nextMon;
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
                    this.description = values.join(' ');
                    break;
                case '#':
                    this.comment = values.join(' ');
                    break;
            }
        });

    };

}

