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
            hit_points: this.hitPoints,
            vision: this.vision,
            armor_class: this.armor
        };
        return JSON.stringify(j, null, 4);
    }

    constructor(text) {

        // 各行を分割
        const lines = text.split("\r\n");
        console.log(lines);

        this.textDetails = text;

        lines.forEach(line => {
            //console.log(line);
            const key = line.charAt(0); // 行の最初の文字で判断
            const values = line.substring(2).split(':'); // データを抽出

            switch (key) {
                case 'N':
                    const [serialNumber, name] = values;
                    //console.log("////////////////////////////");
                    //console.log(serialNumber, name);
                    this.serialNumber = serialNumber;
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
                    const [speed, hitPoints, vision, armorClass, alertness] = values.map(Number);
                    this.speed = speed;
                    this.hitPoints = hitPoints;
                    this.vision = vision;
                    this.armorClass = armorClass;
                    this.alertness = alertness;
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
                    this.flags = values;
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

