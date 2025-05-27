class Creature {

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
            vision: this.vision,
            armor_class: this.armor_class,
            alertness: this.alertness,
            level: this.depth,
            rarity: this.rarity,
            exp: this.exp,
            next_exp: this.nextExp,
            next_mon: this.nextMon,
        };

        let sexes = "";
        if (this.flags.includes("MALE")) {
            sexes = "MALE";
        } else if (this.flags.includes("FEMALE")) {
            sexes = "FEMALE";
        } else {
            j["flags"] = this.flags;
        }

        if (sexes.length > 0) {
            j["sex"] = sexes;
        }

        return JSON.stringify(j, null, 4);
    }

    constructor(text) {

        // 各行を分割
        const lines = text.split("\r\n");
        console.log(lines);

        this.textDetails = text;
        this.flags = [];

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
                    if (!this.spells) this.spells = [];
                    if (!this.spellFrequency) this.spellFrequency = values[0];
                    else this.spells = values;
                    break;
                case 'F':
                    this.flags.push(...values[0].split(/\s*\|\s*/));
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

