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
    tempHP: number
    maxTempHP: number
    initiative: number
    conditions: Array<Condition>
    visibility: number

    constructor(name: string, totalHP: number, initiative: number, currentHP: number = totalHP, conditions: Array<Condition> = [], visibility: number = Visibility.Half, tempHP: number = 0, maxTempHP: number = 0) {
        this.name = name
        this.currentHP = currentHP
        this.totalHP = totalHP
        this.tempHP = tempHP
        this.maxTempHP = maxTempHP
        this.initiative = initiative
        this.conditions = conditions
        this.visibility = visibility
    }

    public changeHP(amount: number = 1) {
        if (amount > 0) {
            // Healing adds to current HP (stops at max)
            this.currentHP += amount
            if (this.currentHP > this.totalHP) {
                this.currentHP = this.totalHP
            }
        } else {
            // Damage: first consume temp HP, then regular HP
            const damage = Math.abs(amount)
            if (this.tempHP > 0) {
                if (this.tempHP >= damage) {
                    // Temp HP absorbs all damage
                    this.tempHP -= damage
                } else {
                    // Temp HP absorbs some, rest goes to regular HP
                    const remainingDamage = damage - this.tempHP
                    this.tempHP = 0
                    this.currentHP -= remainingDamage
                    if (this.currentHP < 0) { this.currentHP = 0 }
                }
            } else {
                // No temp HP, damage goes directly to regular HP
                this.currentHP -= damage
                if (this.currentHP < 0) { this.currentHP = 0 }
            }

            // If temp HP reaches 0, reset maxTempHP tracking
            if (this.tempHP <= 0) {
                this.maxTempHP = 0
            }
        }
    }

    public addTempHP(amount: number = 1) {
        this.tempHP += amount
        // Track the highest temp HP value
        if (this.tempHP > this.maxTempHP) {
            this.maxTempHP = this.tempHP
        }
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
    new Combatant("Yogo", 25, 4, 25, [], Visibility.Full, 0, 0),
    new Combatant("Lesher", 19, 3, 19, [], Visibility.Full, 0, 0),
    new Combatant("Croak", 18, 2, 18, [], Visibility.Full, 0, 0),
    new Combatant("Drikk", 20, 1, 20, [], Visibility.Full, 0, 0),
]

function colorIsDark(bgColor: string): boolean {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return ((r * 0.299) + (g * 0.587) + (b * 0.114)) <= 100;
}

export {colorIsDark, Visibility, Condition, Combatant, defaultCombatants}
