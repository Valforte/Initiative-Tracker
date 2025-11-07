import { describe, it, expect } from 'vitest'
import { Combatant, Condition, Visibility, colorIsDark } from './functions'

describe('Condition', () => {
  it('should create a condition with default value of 1', () => {
    const condition = new Condition('Frightened')
    expect(condition.name).toBe('Frightened')
    expect(condition.value).toBe(1)
  })

  it('should create a condition with custom value', () => {
    const condition = new Condition('Dying', 2)
    expect(condition.name).toBe('Dying')
    expect(condition.value).toBe(2)
  })

  it('should generate consistent colors for the same condition name', () => {
    const condition1 = new Condition('Frightened')
    const condition2 = new Condition('Frightened')
    expect(condition1.color).toBe(condition2.color)
  })

  it('should use only first word for color generation', () => {
    const condition1 = new Condition('Frightened 2')
    const condition2 = new Condition('Frightened 3')
    expect(condition1.color).toBe(condition2.color)
  })
})

describe('Combatant - HP Management', () => {
  it('should initialize with correct HP values', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    expect(combatant.currentHP).toBe(25)
    expect(combatant.totalHP).toBe(25)
    expect(combatant.tempHP).toBe(0)
    expect(combatant.maxTempHP).toBe(0)
  })

  it('should heal correctly without exceeding max HP', () => {
    const combatant = new Combatant('Fighter', 25, 10, 15)
    combatant.changeHP(5)
    expect(combatant.currentHP).toBe(20)

    combatant.changeHP(10)
    expect(combatant.currentHP).toBe(25) // capped at max
  })

  it('should damage regular HP correctly', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.changeHP(-5)
    expect(combatant.currentHP).toBe(20)

    combatant.changeHP(-25)
    expect(combatant.currentHP).toBe(0) // doesn't go below 0
  })

  it('should consume temp HP before regular HP', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.addTempHP(10)
    expect(combatant.tempHP).toBe(10)
    expect(combatant.maxTempHP).toBe(10)

    combatant.changeHP(-5)
    expect(combatant.tempHP).toBe(5)
    expect(combatant.currentHP).toBe(25) // regular HP untouched
  })

  it('should overflow damage from temp HP to regular HP', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.addTempHP(5)

    combatant.changeHP(-10)
    expect(combatant.tempHP).toBe(0)
    expect(combatant.maxTempHP).toBe(0) // reset when temp HP reaches 0
    expect(combatant.currentHP).toBe(20) // 5 absorbed by temp, 5 from regular
  })

  it('should track maximum temp HP correctly', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.addTempHP(5)
    expect(combatant.maxTempHP).toBe(5)

    combatant.addTempHP(3)
    expect(combatant.tempHP).toBe(8)
    expect(combatant.maxTempHP).toBe(8)
  })
})

describe('Combatant - Visibility', () => {
  it('should initialize with Half visibility by default', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    expect(combatant.visibility).toBe(Visibility.Half)
  })

  it('should toggle between None and Half on left click', () => {
    const combatant = new Combatant('Fighter', 25, 10, 25, [], Visibility.None)
    combatant.changeVisibility(false)
    expect(combatant.visibility).toBe(Visibility.Half)

    combatant.changeVisibility(false)
    expect(combatant.visibility).toBe(Visibility.None)
  })

  it('should set to Full on right click', () => {
    const combatant = new Combatant('Fighter', 25, 10, 25, [], Visibility.None)
    combatant.changeVisibility(true)
    expect(combatant.visibility).toBe(Visibility.Full)
  })
})

describe('Combatant - Conditions', () => {
  it('should add conditions correctly', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.newCondition('Frightened', 2)

    expect(combatant.conditions.length).toBe(1)
    expect(combatant.conditions[0].name).toBe('Frightened')
    expect(combatant.conditions[0].value).toBe(2)
  })

  it('should decrement specific condition', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.newCondition('Frightened', 2)
    const condition = combatant.conditions[0]

    combatant.changeConditionValue(condition, false)
    expect(combatant.conditions[0].value).toBe(1)
  })

  it('should increment specific condition', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.newCondition('Frightened', 1)
    const condition = combatant.conditions[0]

    combatant.changeConditionValue(condition, true)
    expect(combatant.conditions[0].value).toBe(2)
  })

  it('should remove condition when value reaches 0', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.newCondition('Frightened', 1)
    const condition = combatant.conditions[0]

    combatant.changeConditionValue(condition, false)
    expect(combatant.conditions.length).toBe(0)
  })

  it('should decrement all conditions when no specific condition provided', () => {
    const combatant = new Combatant('Fighter', 25, 10)
    combatant.newCondition('Frightened', 2)
    combatant.newCondition('Sickened', 3)

    combatant.changeConditionValue()
    expect(combatant.conditions[0].value).toBe(1)
    expect(combatant.conditions[1].value).toBe(2)
  })
})

describe('colorIsDark', () => {
  it('should detect dark colors', () => {
    expect(colorIsDark('#000000')).toBe(true)
    expect(colorIsDark('#1a1a1a')).toBe(true)
    expect(colorIsDark('000000')).toBe(true) // without # prefix
  })

  it('should detect light colors', () => {
    expect(colorIsDark('#ffffff')).toBe(false)
    expect(colorIsDark('#f0f0f0')).toBe(false)
    expect(colorIsDark('ffffff')).toBe(false) // without # prefix
  })

  it('should handle medium colors correctly', () => {
    expect(colorIsDark('#808080')).toBe(false) // gray
    expect(colorIsDark('#404040')).toBe(true) // dark gray
  })
})
