class Creature {

    displayInfo() {
        return `${this.serialNumber} ${this.name} (${this.symbol})`;
    }

    constructor(text) {

        // 各行を分割
        const lines = text.split('\n');

        lines.forEach(line => {
            const key = line.charAt(0); // 行の最初の文字で判断
            const values = line.substring(2).split(':'); // データを抽出

            switch (key) {
                case 'N':
                    const [serialNumber, name] = values;
                    console.log(serialNumber, name);
                    this.serialNumber = serialNumber;
                    this.name = name;
                    break;
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

