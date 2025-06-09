enum Visibility {
    None = 0,
    Half = 1,
    Full = 2,
}

class Condition {
    value: number
    color: string
    public name: string

    constructor(name: string, value: number = 1) {
        this.name = name
        this.value = value
        this.color = this._stringToColor(this.name)
    }

    _stringToColor(str: string) {
        str = str.split(' ')[0]
        let hash = 0
        str.split('').forEach(char => {
            hash = char.charCodeAt(0) + ((hash << 5) - hash)
        })
        let color = '#'
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff
            color += value.toString(16).padStart(2, '0')
        }
        return color
    }
}

class Combatant {
    name: string
    currentHP: number
    totalHP: number
    initiative: number
    conditions: Array<Condition>
    visibility: number

    constructor(name: string, totalHP: number, initiative: number, currentHP: number = totalHP, conditions: Array<Condition> = [], visibility: number = Visibility.Half) {
        this.name = name
        this.currentHP = currentHP
        this.totalHP = totalHP
        this.initiative = initiative
        this.conditions = conditions
        this.visibility = visibility
    }

    public changeHP(amount: number = 1) {
        this.currentHP += amount
        if (this.currentHP > this.totalHP) { this.currentHP = this.totalHP }
        if (this.currentHP < 0) { this.currentHP = 0 }
    }

    public changeVisibility(setVisible: boolean = false) {
        if (setVisible) {
            this.visibility = Visibility.Full
            return
        }
        this.visibility = (this.visibility + 1) % 2
    }

    public changeConditionValue(condition?: Condition, isIncrement: boolean = false) {
        this.conditions.forEach(c => {
            if (condition) {
                if (c.name === condition.name) {
                    isIncrement ? c.value++ : c.value--
                }
            } else {
                c.value--
            }
        })
        this.conditions = this.conditions.filter(condition => condition.value > 0)
    }

    public newCondition(name: string, value: number = 1) {
        this.conditions.push(new Condition(name, value))
    }
}

const defaultCombatants: Array<Combatant> = [
    new Combatant("Timon", 20, 14, 20, [new Condition("Amedrontado"), new Condition("Cagando"), new Condition("Alucinado")], Visibility.Full),
    new Combatant("Ancient Black Dragon", 130, 14, 130, [], Visibility.Half),
    new Combatant("Thiago", 20, 12, 20, [new Condition("Feared", 2), new Condition("Stunned")], Visibility.Full),
    new Combatant("Kaike", 18, 19, 18, [], Visibility.Full),
    new Combatant("Bruno", 22, 3, 22, [], Visibility.Full),
]

function colorIsDark(bgColor: string): boolean {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return ((r * 0.299) + (g * 0.587) + (b * 0.114)) <= 150;
}

export {colorIsDark, Visibility, Condition, Combatant, defaultCombatants}
