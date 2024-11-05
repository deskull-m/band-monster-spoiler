class Creature {

    displayInfo() {
        console.log(this);
    }

    constructor(text) {

        // 各行を分割
        const lines = text.split('\n');
        let creatureData = {};

        lines.forEach(line => {
            const key = line.charAt(0); // 行の最初の文字で判断
            const values = line.substring(2).split(':'); // データを抽出

            switch (key) {
                case 'N':
                    const [serialNumber, name] = values;
                    creatureData.serialNumber = serialNumber;
                    creatureData.name = name;
                    break;
                case 'G':
                    const [symbol, color] = values;
                    creatureData.symbol = symbol;
                    creatureData.color = color;
                    break;
                case 'I':
                    const [speed, hitPoints, vision, armorClass, alertness] = values.map(Number);
                    creatureData.speed = speed;
                    creatureData.hitPoints = hitPoints;
                    creatureData.vision = vision;
                    creatureData.armorClass = armorClass;
                    creatureData.alertness = alertness;
                    break;
                case 'W':
                    const [depth, rarity, exp, nextExp, nextMon] = values.map(Number);
                    creatureData.depth = depth;
                    creatureData.rarity = rarity;
                    creatureData.exp = exp;
                    creatureData.nextExp = nextExp;
                    creatureData.nextMon = nextMon;
                    break;
                case 'B':
                    if (!creatureData.attacks) creatureData.attacks = [];
                    const [method, effect, damage] = values;
                    creatureData.attacks.push({ method, effect, damage });
                    break;
                case 'S':
                    if (!creatureData.spells) creatureData.spells = [];
                    if (!creatureData.spellFrequency) creatureData.spellFrequency = values[0];
                    else creatureData.spells = values;
                    break;
                case 'F':
                    creatureData.flags = values;
                    break;
                case 'D':
                    creatureData.description = values.join(' ');
                    break;
                case '#':
                    creatureData.comment = values.join(' ');
                    break;
            }
        });

    };

}

