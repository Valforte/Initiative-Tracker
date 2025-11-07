/**
 * Visibility levels for combatants in the player view
 * - None: Hidden from players, skipped during turn advancement
 * - Half: Name and initiative visible, HP hidden
 * - Full: All information visible including HP
 */
enum Visibility {
    None = 0,
    Half = 1,
    Full = 2,
}

/**
 * Represents a status condition affecting a combatant
 * Automatically generates a unique color based on the condition name
 */
class Condition {
    value: number
    color: string
    public name: string

    constructor(name: string, value: number = 1) {
        this.name = name
        this.value = value
        this.color = this._stringToColor(this.name)
    }

    /**
     * Generates a consistent hex color from a string using hash-based algorithm
     * Uses the first word of the condition name to ensure consistency
     * @param str - The condition name to convert to a color
     * @returns Hex color string (e.g., "#a3c4f2")
     */
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

/**
 * Represents a combatant in the initiative tracker
 * Manages HP (including temporary HP), conditions, and visibility settings
 */
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

    /**
     * Modifies combatant's HP following Pathfinder 2e rules
     * Positive amounts heal (capped at totalHP)
     * Negative amounts deal damage (temp HP absorbs first, then regular HP)
     * Automatically resets maxTempHP tracking when temp HP reaches 0
     * @param amount - HP change (positive for healing, negative for damage)
     */
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

    /**
     * Adds temporary HP to the combatant
     * Tracks the maximum temporary HP value for display purposes
     * @param amount - Amount of temporary HP to add (default: 1)
     */
    public addTempHP(amount: number = 1) {
        this.tempHP += amount
        // Track the highest temp HP value
        if (this.tempHP > this.maxTempHP) {
            this.maxTempHP = this.tempHP
        }
    }

    /**
     * Changes the visibility level of the combatant
     * Left-click cycles between None and Half
     * Right-click sets to Full
     * @param setVisible - If true, sets to Full visibility (from right-click)
     */
    public changeVisibility(setVisible: boolean = false) {
        if (setVisible) {
            this.visibility = Visibility.Full
            return
        }
        this.visibility = (this.visibility + 1) % 2
    }

    /**
     * Modifies condition values for this combatant
     * Can target a specific condition or all conditions
     * Automatically removes conditions that reach 0
     * @param condition - Specific condition to modify (optional, if omitted affects all)
     * @param isIncrement - If true, increases value; if false, decreases value
     */
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

    /**
     * Adds a new condition to this combatant
     * @param name - Name of the condition
     * @param value - Initial value/stage of the condition (default: 1)
     */
    public newCondition(name: string, value: number = 1) {
        this.conditions.push(new Condition(name, value))
    }
}

/**
 * Default combatants shown on first load
 * Uses iconic Pathfinder 2e characters from the Core Rulebook
 */
const defaultCombatants: Array<Combatant> = [
    new Combatant("Amiri", 22, 4, 22, [], Visibility.Full, 0, 0),
    new Combatant("Lini", 18, 3, 18, [], Visibility.Full, 0, 0),
    new Combatant("Ezren", 16, 2, 16, [], Visibility.Full, 0, 0),
    new Combatant("Kyra", 16, 1, 16, [], Visibility.Full, 0, 0),
]

/**
 * Determines if a hex color should be considered "dark"
 * Used to decide whether to use light or dark text on colored condition badges
 * Uses weighted RGB formula (ITU-R BT.601)
 * @param bgColor - Hex color string with or without # prefix
 * @returns true if the color is dark (luminance <= 100)
 */
function colorIsDark(bgColor: string): boolean {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return ((r * 0.299) + (g * 0.587) + (b * 0.114)) <= 100;
}

export {colorIsDark, Visibility, Condition, Combatant, defaultCombatants}
