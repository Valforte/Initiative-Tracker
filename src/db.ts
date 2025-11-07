// Import JSON data files
// Pathfinder 2e - Core Bestiaries
import monsterCoreData from './data/pathfinder/monster-core.json'
import bestiaryData from './data/pathfinder/bestiary.json'
import bestiary2Data from './data/pathfinder/bestiary-2.json'
import bestiary3Data from './data/pathfinder/bestiary-3.json'
import bookOfTheDeadData from './data/pathfinder/book-of-the-dead.json'
import rageOfElementsData from './data/pathfinder/rage-of-elements.json'
import howlOfTheWildData from './data/pathfinder/howl-of-the-wild.json'
import battlecryData from './data/pathfinder/battlecry.json'
import monstersOfMythData from './data/pathfinder/monsters-of-myth.json'
import tianXiaWorldGuideData from './data/pathfinder/tian-xia-world-guide.json'
import warOfImmortalsData from './data/pathfinder/war-of-immortals.json'
import shiningKingdomsData from './data/pathfinder/shining-kingdoms.json'
import clawsOfTheTyrantData from './data/pathfinder/claws-of-the-tyrant.json'
import crownOfTheKoboldKingData from './data/pathfinder/crown-of-the-kobold-king.json'
import preyForDeathData from './data/pathfinder/prey-for-death.json'

// Pathfinder 2e - Adventure Paths & Adventures
import kingmakerData from './data/pathfinder/kingmaker-adventure-path.json'
import pf145Data from './data/pathfinder/pathfinder-145-hellknight-hill.json'
import pf146Data from './data/pathfinder/pathfinder-146-cult-of-cinders.json'
import pf147Data from './data/pathfinder/pathfinder-147-tomorrow-must-burn.json'
import pf148Data from './data/pathfinder/pathfinder-148-fires-of-the-haunted-city.json'
import pf149Data from './data/pathfinder/pathfinder-149-against-the-scarlet-triad.json'
import pf150Data from './data/pathfinder/pathfinder-150-broken-promises.json'
import pf151Data from './data/pathfinder/pathfinder-151-the-show-must-go-on.json'
import pf152Data from './data/pathfinder/pathfinder-152-legacy-of-the-lost-god.json'
import pf153Data from './data/pathfinder/pathfinder-153-life-s-long-shadows.json'
import pf154Data from './data/pathfinder/pathfinder-154-siege-of-the-dinosaurs.json'
import pf155Data from './data/pathfinder/pathfinder-155-lord-of-the-black-sands.json'
import pf157Data from './data/pathfinder/pathfinder-157-devil-at-the-dreaming-palace.json'
import pf158Data from './data/pathfinder/pathfinder-158-sixty-feet-under.json'
import pf159Data from './data/pathfinder/pathfinder-159-all-or-nothing.json'
import pf160Data from './data/pathfinder/pathfinder-160-assault-on-hunting-lodge-seven.json'
import pf161Data from './data/pathfinder/pathfinder-161-belly-of-the-black-whale.json'
import pf162Data from './data/pathfinder/pathfinder-162-ruins-of-the-radiant-siege.json'
import pf163Data from './data/pathfinder/pathfinder-163-ruins-of-gauntlight.json'
import pf164Data from './data/pathfinder/pathfinder-164-hands-of-the-devil.json'
import pf167Data from './data/pathfinder/pathfinder-167-ready-fight.json'
import pf168Data from './data/pathfinder/pathfinder-168-king-of-the-mountain.json'
import pf169Data from './data/pathfinder/pathfinder-169-kindled-magic.json'
import pf171Data from './data/pathfinder/pathfinder-171-hurricane-s-howl.json'
import pf173Data from './data/pathfinder/pathfinder-173-doorway-to-the-red-star.json'
import pf174Data from './data/pathfinder/pathfinder-174-shadows-of-the-ancients.json'
import pf175Data from './data/pathfinder/pathfinder-175-broken-tusk-moon.json'
import pf176Data from './data/pathfinder/pathfinder-176-lost-mammoth-valley.json'
import pf177Data from './data/pathfinder/pathfinder-177-burning-tundra.json'
import pf178Data from './data/pathfinder/pathfinder-178-punks-in-a-powderkeg.json'
import pf179Data from './data/pathfinder/pathfinder-179-cradle-of-quartz.json'
import pf180Data from './data/pathfinder/pathfinder-180-the-smoking-gun.json'
import pf181Data from './data/pathfinder/pathfinder-181-zombie-feast.json'
import pf182Data from './data/pathfinder/pathfinder-182-graveclaw.json'
import pf183Data from './data/pathfinder/pathfinder-183-field-of-maidens.json'
import pf184Data from './data/pathfinder/pathfinder-184-the-ghouls-hunger.json'
import pf185Data from './data/pathfinder/pathfinder-185-a-taste-of-ashes.json'
import pf186Data from './data/pathfinder/pathfinder-186-ghost-king-s-rage.json'
import pf187Data from './data/pathfinder/pathfinder-187-the-seventh-arch.json'
import pf188Data from './data/pathfinder/pathfinder-188-they-watched-the-stars.json'
import pf190Data from './data/pathfinder/pathfinder-190-the-choosing.json'
import pf191Data from './data/pathfinder/pathfinder-191-the-destiny-war.json'
import pf192Data from './data/pathfinder/pathfinder-192-worst-of-all-possible-worlds.json'
import pf193Data from './data/pathfinder/pathfinder-193-mantle-of-gold.json'
import pf194Data from './data/pathfinder/pathfinder-194-cult-of-the-cave-worm.json'
import pf195Data from './data/pathfinder/pathfinder-195-heavy-is-the-crown.json'
import pf196Data from './data/pathfinder/pathfinder-196-the-summer-that-never-was.json'
import pf197Data from './data/pathfinder/pathfinder-197-let-the-leaves-fall.json'
import pf198Data from './data/pathfinder/pathfinder-198-no-breath-to-cry.json'
import pf199Data from './data/pathfinder/pathfinder-199-to-bloom-below-the-web.json'
import pf201Data from './data/pathfinder/pathfinder-201-pactbreaker.json'
import pf202Data from './data/pathfinder/pathfinder-202-severed-at-the-root.json'
import pf204Data from './data/pathfinder/pathfinder-204-stage-fright.json'
import pf205Data from './data/pathfinder/pathfinder-205-singer-stalker-skinsaw-man.json'
import pf206Data from './data/pathfinder/pathfinder-206-bring-the-house-down.json'
import pf207Data from './data/pathfinder/pathfinder-207-resurrection-flood.json'
import pf208Data from './data/pathfinder/pathfinder-208-hoof-cinder-and-storm.json'
import pf209Data from './data/pathfinder/pathfinder-209-destroyer-s-doom.json'
import pf211Data from './data/pathfinder/pathfinder-211-the-secret-of-deathstalk-tower.json'
import pf212Data from './data/pathfinder/pathfinder-212-a-voice-in-the-blight.json'
import pf213Data from './data/pathfinder/pathfinder-213-thirst-for-blood.json'
import pf214Data from './data/pathfinder/pathfinder-214-the-broken-palace.json'
import pf215Data from './data/pathfinder/pathfinder-215-to-blot-out-the-sun.json'
import pfGameNightData from './data/pathfinder/pathfinder-game-night-dawn-of-the-frogs-deluxe-adventure.json'

// Pathfinder 2e - Standalone Adventures
import theFallOfPlaquestoneData from './data/pathfinder/the-fall-of-plaguestone.json'
import troublesInOtariData from './data/pathfinder/troubles-in-otari.json'
import theSlitherData from './data/pathfinder/the-slithering.json'
import malevolenceData from './data/pathfinder/malevolence.json'
import shadowsAtSundownData from './data/pathfinder/shadows-at-sundown.json'
import nightOfTheGrayDeathData from './data/pathfinder/night-of-the-gray-death.json'
import theEnmityCycleData from './data/pathfinder/the-enmity-cycle.json'
import rusthengeData from './data/pathfinder/rusthenge.json'

// Pathfinder 2e - Sourcebooks
import travelGuideData from './data/pathfinder/travel-guide.json'
import npcCoreData from './data/pathfinder/npc-core.json'
import highhelmData from './data/pathfinder/highhelm.json'
import inDarknessData from './data/pathfinder/in-darkness.json'
import darkArchiveData from './data/pathfinder/dark-archive.json'
import grandBazaarData from './data/pathfinder/grand-bazaar.json'
import playerCoreData from './data/pathfinder/player-core.json'

// Pathfinder 2e - Unknown/Mixed Sources
import unknownData from './data/pathfinder/unknown.json'

// D&D 5e - Core Books
import monsterManualSRDData from './data/dnd5e/monster-manual-srd.json'
import monsterManualData from './data/dnd5e/monster-manual.json'
import monsterManualBRData from './data/dnd5e/monster-manual-br.json'
import volosGuideData from './data/dnd5e/volo-s-guide-to-monsters.json'
import mordenkainensData from './data/dnd5e/mordenkainen-s-tome-of-foes.json'
import essentialsKitData from './data/dnd5e/essentials-kit.json'

// D&D 5e - Adventures
import curseOfStrahdData from './data/dnd5e/adventures-curse-of-strahd.json'
import descentIntoAvernusData from './data/dnd5e/adventures-descent-into-avernus.json'
import dragonHeistData from './data/dnd5e/adventures-dragon-heist.json'
import dungeonMadMageData from './data/dnd5e/adventures-dungeon-of-the-mad-mage.json'
import princesApocalypseData from './data/dnd5e/adventures-princes-of-the-apocalypse.json'
import stormKingsThunderData from './data/dnd5e/adventures-storm-king-s-thunder.json'
import tombAnnihilationData from './data/dnd5e/adventures-tomb-of-annihilation.json'
import tyrannyDragonsData from './data/dnd5e/adventures-tyranny-of-dragons.json'

// D&D 5e - Extra Content
import adventurersLeagueData from './data/dnd5e/extra-adventurers-league.json'
import aideddData from './data/dnd5e/extra-aidedd.json'
import dragonMagData from './data/dnd5e/extra-dragon-mag.json'

// Game system types
type GameSystem = 'pathfinder' | 'dnd5e'

// Monster can be either a string (name only, defaults to HP 1) or an object with name, HP, and optional URL
type MonsterEntry = string | { name: string; hp: number; url?: string }

// Normalized monster type with name, HP, and optional URL
type Monster = {
    name: string
    hp: number
    url?: string
}

// Content source definition
type ContentSource = {
    id: string
    name: string
    system: GameSystem
    enabledByDefault?: boolean
    monsters: MonsterEntry[]
}

// Helper to normalize monster entries to Monster objects
function normalizeMonster(entry: MonsterEntry): Monster {
    if (typeof entry === 'string') {
        return { name: entry, hp: 1 }
    }
    return {
        name: entry.name,
        hp: entry.hp,
        ...(entry.url && { url: entry.url })
    }
}

// All available content sources loaded from JSON
const contentSources: ContentSource[] = [
    // Pathfinder 2e - Core Bestiaries
    monsterCoreData as ContentSource,
    playerCoreData as ContentSource,
    npcCoreData as ContentSource,
    bestiaryData as ContentSource,
    bestiary2Data as ContentSource,
    bestiary3Data as ContentSource,
    bookOfTheDeadData as ContentSource,
    rageOfElementsData as ContentSource,
    howlOfTheWildData as ContentSource,
    battlecryData as ContentSource,
    monstersOfMythData as ContentSource,
    tianXiaWorldGuideData as ContentSource,
    warOfImmortalsData as ContentSource,
    shiningKingdomsData as ContentSource,
    clawsOfTheTyrantData as ContentSource,
    crownOfTheKoboldKingData as ContentSource,
    preyForDeathData as ContentSource,

    // Pathfinder 2e - Sourcebooks
    travelGuideData as ContentSource,
    highhelmData as ContentSource,
    inDarknessData as ContentSource,
    darkArchiveData as ContentSource,
    grandBazaarData as ContentSource,

    // Pathfinder 2e - Adventure Paths & Adventures
    kingmakerData as ContentSource,
    pf145Data as ContentSource,
    pf146Data as ContentSource,
    pf147Data as ContentSource,
    pf148Data as ContentSource,
    pf149Data as ContentSource,
    pf150Data as ContentSource,
    pf151Data as ContentSource,
    pf152Data as ContentSource,
    pf153Data as ContentSource,
    pf154Data as ContentSource,
    pf155Data as ContentSource,
    pf157Data as ContentSource,
    pf158Data as ContentSource,
    pf159Data as ContentSource,
    pf160Data as ContentSource,
    pf161Data as ContentSource,
    pf162Data as ContentSource,
    pf163Data as ContentSource,
    pf164Data as ContentSource,
    pf167Data as ContentSource,
    pf168Data as ContentSource,
    pf169Data as ContentSource,
    pf171Data as ContentSource,
    pf173Data as ContentSource,
    pf174Data as ContentSource,
    pf175Data as ContentSource,
    pf176Data as ContentSource,
    pf177Data as ContentSource,
    pf178Data as ContentSource,
    pf179Data as ContentSource,
    pf180Data as ContentSource,
    pf181Data as ContentSource,
    pf182Data as ContentSource,
    pf183Data as ContentSource,
    pf184Data as ContentSource,
    pf185Data as ContentSource,
    pf186Data as ContentSource,
    pf187Data as ContentSource,
    pf188Data as ContentSource,
    pf190Data as ContentSource,
    pf191Data as ContentSource,
    pf192Data as ContentSource,
    pf193Data as ContentSource,
    pf194Data as ContentSource,
    pf195Data as ContentSource,
    pf196Data as ContentSource,
    pf197Data as ContentSource,
    pf198Data as ContentSource,
    pf199Data as ContentSource,
    pf201Data as ContentSource,
    pf202Data as ContentSource,
    pf204Data as ContentSource,
    pf205Data as ContentSource,
    pf206Data as ContentSource,
    pf207Data as ContentSource,
    pf208Data as ContentSource,
    pf209Data as ContentSource,
    pf211Data as ContentSource,
    pf212Data as ContentSource,
    pf213Data as ContentSource,
    pf214Data as ContentSource,
    pf215Data as ContentSource,
    pfGameNightData as ContentSource,

    // Pathfinder 2e - Standalone Adventures
    theFallOfPlaquestoneData as ContentSource,
    troublesInOtariData as ContentSource,
    theSlitherData as ContentSource,
    malevolenceData as ContentSource,
    shadowsAtSundownData as ContentSource,
    nightOfTheGrayDeathData as ContentSource,
    theEnmityCycleData as ContentSource,
    rusthengeData as ContentSource,

    // Pathfinder 2e - Unknown/Mixed Sources
    unknownData as ContentSource,

    // D&D 5e - Core Books
    monsterManualSRDData as ContentSource,
    monsterManualData as ContentSource,
    monsterManualBRData as ContentSource,
    volosGuideData as ContentSource,
    mordenkainensData as ContentSource,
    essentialsKitData as ContentSource,

    // D&D 5e - Adventures
    curseOfStrahdData as ContentSource,
    descentIntoAvernusData as ContentSource,
    dragonHeistData as ContentSource,
    dungeonMadMageData as ContentSource,
    princesApocalypseData as ContentSource,
    stormKingsThunderData as ContentSource,
    tombAnnihilationData as ContentSource,
    tyrannyDragonsData as ContentSource,

    // D&D 5e - Extra Content
    adventurersLeagueData as ContentSource,
    aideddData as ContentSource,
    dragonMagData as ContentSource
]

// Helper function to get content sources by system
function getContentSourcesBySystem(system: GameSystem): ContentSource[] {
    return contentSources.filter(source => source.system === system)
}

// Helper function to get default enabled source IDs for a system
function getDefaultEnabledSources(system: GameSystem): string[] {
    return contentSources
        .filter(source => source.system === system && source.enabledByDefault === true)
        .map(source => source.id)
}

// Helper function to get enabled monsters based on active content sources
// Returns normalized Monster objects with name and HP
function getEnabledMonsters(enabledSourceIds: string[]): Monster[] {
    const monsters: Monster[] = []
    enabledSourceIds.forEach(id => {
        const source = contentSources.find(s => s.id === id)
        if (source) {
            const normalizedMonsters = source.monsters.map(normalizeMonster)
            monsters.push(...normalizedMonsters)
        }
    })
    return monsters.sort((a, b) => a.name.localeCompare(b.name))
}

// Legacy classes for backward compatibility (deprecated)
class MonsterCore {
    monsters: string[] = contentSources.find(s => s.id === 'monsterCore')?.monsters.map(m => typeof m === 'string' ? m : m.name) || []
    npc: string[] = contentSources.find(s => s.id === 'monsterCoreNPC')?.monsters.map(m => typeof m === 'string' ? m : m.name) || []
}

class AgeOfAshes {
    monsters: string[] = contentSources.find(s => s.id === 'ageOfAshes')?.monsters.map(m => typeof m === 'string' ? m : m.name) || []
}

type Locale = 'en' | 'pt_BR'

type ConditionData = {
    name: string
    description: string
}

type ConditionsStructure = {
    [key: string]: ConditionData
}

const conditionsData: Record<Locale, ConditionsStructure> = {
    en: {
        blinded: {
            name: 'Blinded',
            description: "You can't see. All normal terrain is difficult terrain. You can't detect anything using vision. Automatically critically fail Perception checks that require you to see; if vision is your only precise sense, you take a –4 status penalty to Perception checks. You are immune to visual effects. Blinded overrides dazzled."
        },
        broken: {
            name: 'Broken',
            description: "A broken object can't be used, nor does it grant bonuses. Broken armor grants its item bonus to AC, but gives a status penalty to AC (–1 light, –2 medium,–3 heavy). An effect that makes an item broken reduces the item's HP to its Broken Threshold."
        },
        clumsy: {
            name: 'Clumsy',
            description: "Take a status penalty equal to your clumsy value on Dexterity-based checks and DCs, including AC, Reflex saves, ranged attacks, and skill checks using Acrobatics, Stealth, and Thievery."
        },
        confused: {
            name: 'Confused',
            description: "You are off-guard, don't treat anyone as your ally, and can't Delay, Ready, or use reactions. Use all your actions to Strike or cast offensive cantrips. The GM determines targets randomly. If you have no other option, target yourself, automatically hitting. If it's impossible for you to attack or cast spells, you babble incoherently, wasting your actions. Each time you take damage from an attack or spell, attempt a DC 11 flat check to end the condition."
        },
        controlled: {
            name: 'Controlled',
            description: "Your controller dictates how you act."
        },
        dazzled: {
            name: 'Dazzled',
            description: "All creatures and objects are concealed from you."
        },
        deafened: {
            name: 'Deafened',
            description: "Automatically critically fail Perception checks that require hearing. Take a –2 status penalty to Perception checks for initiative and checks that involve sound but also rely on other senses. If you perform an action that has the auditory trait, you must succeed at a DC 5 flat check or the action is lost. You are immune to auditory effects."
        },
        drained: {
            name: 'Drained',
            description: "Take a status penalty equal to your drained value on Constitution-based checks, such as Fortitude saves. Lose Hit Points equal to your level times the drained value, and your maximum Hit Points are reduced by the same amount. When you regain Hit Points by resting for 8 hours, your drained value is reduced by 1, but you don't immediately recover the lost Hit Points."
        },
        encumbered: {
            name: 'Encumbered',
            description: "You're clumsy 1 and take a –10-foot penalty to all your Speeds."
        },
        enfeebled: {
            name: 'Enfeebled',
            description: "Take a status penalty equal to your enfeebled value to Strength-based rolls and DCs, including Strength-based melee attack rolls, Strength-based damage rolls, and Athletics checks."
        },
        fascinated: {
            name: 'Fascinated',
            description: "Take a –2 status penalty to Perception and skill checks, and you can't use actions with the concentrate trait unless they are related to the subject of your fascination. This condition ends if a creature takes hostile actions toward you or any of your allies."
        },
        fatigued: {
            name: 'Fatigued',
            description: "Take a –1 status penalty to AC and saving throws. During exploration, you can't choose an exploration activity. Recover from fatigue after a full night's rest."
        },
        fleeing: {
            name: 'Fleeing',
            description: "On your turn, spend each action trying to escape the source of the condition as expediently as possible. You can't Delay or Ready."
        },
        frightened: {
            name: 'Frightened',
            description: "Take a status penalty equal to the value to all checks and DCs. At the end of each of your turns, the value decreases by 1."
        },
        grabbed: {
            name: 'Grabbed',
            description: "You're immobilized and off-guard. If you attempt a manipulate action, you must succeed at a DC 5 flat check or it is lost."
        },
        immobilized: {
            name: 'Immobilized',
            description: "You can't take any action with the move trait. If you're immobilized by something holding you in place and an external force would move you, the force must succeed at a check against the DC of the effect holding you in place you or the relevant defense (usually Fortitude DC) of the creature holding you in place."
        },
        offGuard: {
            name: 'Off-Guard',
            description: "Take a –2 circumstance penalty to AC."
        },
        paralyzed: {
            name: 'Paralyzed',
            description: "You're off-guard and can't take actions except Recall Knowledge and others that require only your mind. You can't Seek."
        },
        persistentDamage: {
            name: 'Persistent Damage',
            description: "Instead of taking persistent damage immediately, take it at the end of each of your turns, rolling any damage dice each time. After you take persistent damage, roll a DC 15 flat check to see if you recover. If you succeed, the condition ends. You or an ally can help you recover, allowing an additional flat check. This usually takes 2 actions, and must be something that would reasonably help against the source of the damage. The GM can reduce the DC to 10, have the damage end automatically, or change the number of actions."
        },
        petrified: {
            name: 'Petrified',
            description: "You can't act, nor can you sense anything. You're an object with double your normal Bulk (typically 12 if Medium or 6 if Small), AC 9, Hardness 8, and the same current HP you had when alive."
        },
        prone: {
            name: 'Prone',
            description: "You're off-guard with a –2 circumstance penalty to attack rolls. The only move actions you can take are Crawl and Stand. Standing ends the prone condition. You can Take Cover while prone, gaining greater cover against ranged attacks (but remain off-guard)."
        },
        quickened: {
            name: 'Quickened',
            description: "You gain 1 additional action at the start of your turn each round. Many effects that make you quickened specify the types of additional actions you can use. Because quickened has its effect at the start of your turn, you don't gain actions immediately if you become quickened during your turn."
        },
        restrained: {
            name: 'Restrained',
            description: "You're tied up and can barely move, or a creature has you pinned. You are immobilized and off-guard, and you can't use any actions with the attack or manipulate traits except to attempt to Escape or Force Open your bonds. Restrained overrides grabbed."
        },
        sickened: {
            name: 'Sickened',
            description: "Take a status penalty equal to the value on all checks and DCs. You can't willingly ingest anything. You can spend an action retching to attempt a Fortitude save against the DC of the sickening effect. On a success, reduce the value by 1 (2 on a critical success)."
        },
        slowed: {
            name: 'Slowed',
            description: "When you regain your actions at the start of your turn, reduce the number of actions by your slowed value. You don't lose actions immediately if slowed during your turn."
        },
        stunned: {
            name: 'Stunned',
            description: "You can't act. A stunned value indicates how many total actions you lose. Each time you regain actions, reduce the number by your stunned value, then reduce your stunned value by the number of actions lost. If stunned has a duration, lose all your actions for the listed duration. Stunned overrides slowed. Actions lost to stunned count toward those lost to slowed."
        },
        stupefied: {
            name: 'Stupefied',
            description: "Take a status penalty equal to the value to checks and DCs based on Intelligence, Wisdom, or Charisma, including Will saves, spell attack rolls and DCs, and appropriate skill checks. If you Cast a Spell, it's disrupted unless you succeed at a flat check (DC = 5 + value)."
        }
    },
    pt_BR: {
        blinded: {
            name: 'Cego',
            description: "Você não pode enxergar. Todo terreno normal é terreno difícil. Você é incapaz de detectar qualquer coisa utilizando a visão. Você falha criticamente em testes de Percepção que requeiram que você seja capaz de enxergar; se visão for seu único sentido preciso, você sofre –4 de penalidade de estado em testes de Percepção. Você fica imune a efeitos visuais. Cego sobrepõe ofuscado."
        },
        broken: {
            name: 'Quebrado',
            description: "Um objeto quebrado não pode e nem concede bônus. Uma armadura quebrada ainda concede um item de bônus na CA, mas impõe uma penalidade de estado na CA (-1 para leve, -2 média, -3 pesada). Um efeito que deixe o item quebrado automaticamente reduz seus PV para o limiar de quebra."
        },
        clumsy: {
            name: 'Desajeitado',
            description: "Sofre uma penalidade de estado igual ao valor desta condição em testes e CDs baseadas em Destreza, incluindo CA, salvamentos de Reflexos, rolagens de ataque à distância e testes de perícia utilizando Acrobatismo, Furtividade e Ladroagem."
        },
        confused: {
            name: 'Confuso',
            description: "Você está desprevenido, não trata ninguém como aliado e não pode Adiar, Preparar ou usar reações. Use todas suas ações para Golpear ou conjurar truques mágicos ofensivos. O MJ determina os alvos aleatoriamente. Se não tiver outra opção, mire em si mesmo, acertando automaticamente. Se for impossível atacar ou conjurar magias, você balbucia incoerentemente, desperdiçando suas ações. Cada vez que sofrer dano de um ataque ou magia, faça um teste simples CD 11 para encerrar a condição."
        },
        controlled: {
            name: 'Controlado',
            description: "O controlador dita como você age."
        },
        dazzled: {
            name: 'Ofuscado',
            description: "Todas as criaturas e objetos ficam ocultados para você."
        },
        deafened: {
            name: 'Surdo',
            description: "Você falha criticamen- te em testes de Percepção que requeiram audição. Você sofre –2 de penali- dade de estado em testes de Percepção para iniciativa e testes que envolvam som e também utilizem outros sentidos. Se realizar uma ação com o traço auditivo, você deve obter sucesso em um teste simples CD 5 ou a ação é perdida. Você é imune a efeitos auditivos."
        },
        drained: {
            name: 'Drenado',
            description: "Sofre uma penalidade de estado igual ao valor desta condição em testes baseados em Constituição (como salvamentos de Fortitude). Perde Pontos de Vida igual ao seu nível multiplicado pelo valor de drenado, e seus Pontos de Vida máximos são reduzidos nesta mesma quantidade. Quando recuperar Pontos de Vida após descansar por 8 horas, seu valor de drenado é reduzido em 1, mas você não recupera imediatamente Pontos de Vida perdidos."
        },
        encumbered: {
            name: 'Sobrecarregado',
            description: "Você fica desajeitado 1 e sofre –3 metros de penalidade em todas as suas Velocidades."
        },
        enfeebled: {
            name: 'Enfraquecido',
            description: "Sofre uma penalidade de estado igual ao valor desta condição em testes e CDs baseadas em Força, incluindo rolagens de ataques corpo a corpo, rolagens de dano baseadas em Força e testes de perícia utilizando Atletismo."
        },
        fascinated: {
            name: 'Fascinado',
            description: "Sofre –2 de penalidade de estado em testes de Percepção e perícias e não pode usar ações com o traço concentração a menos que sejam relacionadas ao alvo de seu fascínio. Esta condição é encerrada se uma criatura usar ações hostis contra você ou qualquer de seus aliados."
        },
        fatigued: {
            name: 'Fatigado',
            description: "Sofre –1 de penalidade de estado na CA e em salvamentos. Enquanto explorar, você não pode escolher uma atividade de exploração. Recupera da fadiga após uma noite completa de descanso."
        },
        fleeing: {
            name: 'Fugindo',
            description: "Em seu turno, gaste cada uma de suas ações tentando escapar da fonte desta condição da melhor maneira possível. Você não pode Adiar ou Preparar."
        },
        frightened: {
            name: 'Assustado',
            description: "Sofre uma penalidade de estado igual ao valor desta condição em todos os seus testes e CDs. Ao final de cada um de seus turnos, o valor é reduzido em 1."
        },
        grabbed: {
            name: 'Agarrado',
            description: "Você está desprevenido e imobilizado. Se tentar uma ação de manuseio, deve obter sucesso em um teste simples CD 5 ou ela é perdida."
        },
        immobilized: {
            name: 'Imobilizado',
            description: "Você não pode usar qualquer ação com o traço movimento. Se estiver imobilizado por algo lhe segurando no lugar e uma força externa fosse lhe mover, essa força deve obter sucesso em um teste contra a CD do efeito lhe segurando no lugar ou contra a defesa relevante (normalmente CD de Fortitude) da criatura lhe segurando no lugar."
        },
        offGuard: {
            name: 'Desprevenido',
            description: "Sofre –2 de penalidade de circunstância na CA."
        },
        paralyzed: {
            name: 'Paralisado',
            description: "Você está desprevenido e não pode agir exceto para Recordar Conhecimento e usar ações que requeiram somente o uso de sua mente. Você não pode Buscar."
        },
        persistentDamage: {
            name: 'Dano Persistente',
            description: "Você sofre o dano persistente ao final de cada um de seus turnos (em vez de sofrê-lo imediatamente), rolando quaisquer dados de dano a cada vez. Após sofrer dano persistente, role um teste simples CD 15. Em um sucesso, a condição é encerrada. Você ou um aliado pode ajudá-lo a se recuperar com um teste simples adicional. Isto normalmente usa 2 ações e deve ser algo que ajude razoavelmente contra a origem do dano. O MJ pode reduzir a CD para 10, fazer o dano encerrar automaticamente ou mudar a quantidade de ações."
        },
        petrified: {
            name: 'Petrificado',
            description: "Você não pode agir nem sentir qualquer coisa. Você se torna um objeto com um Volume igual ao dobro de seu Volume normal (normalmente 12 para uma criatura Média ou 6 para Pequena), CA 9, Dureza 8 e a mesma quantidade de Pontos de Vida atuais que tinha quando estava vivo."
        },
        prone: {
            name: 'Prostrado',
            description: "Você está desprevenido e sofre –2 de penalidade de circunstância em rolagens de ataque. As únicas ações de movimento que você pode usar são Rastejar e Levantar. Levantar encerra a condição prostrado. Você pode Obter Cobertura enquanto estiver prostrado recebendo cobertura maior contra ataques à distância (mas permanece desprevenido)."
        },
        quickened: {
            name: 'Acelerado',
            description: "Você recebe 1 ação adicional no início de seu turno a cada rodada. Muitos efeitos que lhe deixam acelerado especificam os tipos de ações adicionais que você pode usar. Como acelerado tem efeito no início de seu turno, você não recebe ações imediatamente se ficar acelerado durante seu turno."
        },
        restrained: {
            name: 'Restringido',
            description: "Você está amarrado e mal pode se mover, ou uma criatura lhe prendeu. Você está desprevenido e imobilizado e não pode usar quaisquer ações com os traços ataque ou manuseio exceto para tentar Escapar ou Forçar suas amarras. Restringido sobrepõe agarrado."
        },
        sickened: {
            name: 'Enjoado',
            description: "Sofre uma penalidade de estado igual ao valor desta condição em todos os seus testes e CDs. Você não pode ingerir nada voluntariamente. Você pode gastar uma ação regurgitando para tentar imediatamente um salvamento de Fortitude contra a CD do efeito que lhe deixou enjoado. Em um sucesso, reduza o valor de enjoado em 1 (ou em 2 em um sucesso crítico)."
        },
        slowed: {
            name: 'Lento',
            description: "Quando recuperar suas ações no início de seu turno, reduza a quantidade de ações que você recupera pelo seu valor de lento. Você não perde ações imediatamente se ficar lento durante seu turno."
        },
        stunned: {
            name: 'Atordoado',
            description: "Você não pode agir. Atordoado sempre inclui um valor, que indica o total de ações que você perde. Cada vez que recuperar ações, reduza a quantidade pelo seu valor de atordoado, e então reduza seu valor de atordoado pela quantidade de ações que perdeu. Se atordoado tiver uma duração, perca todas suas ações pela duração listada. Atordoado sobrepõe lento. Você deduz as ações perdidas pela condição atordoado das ações perdidas por estar lento."
        },
        stupefied: {
            name: 'Estupefato',
            description: "Sofre uma penalidade de estado igual ao valor desta condição em testes e CDs baseadas em Inteligência, Sabedoria e Carisma, incluindo salvamentos de Vontade, rolagens de ataque de magia, CDs de magia, e testes de perícias que utilizem estes atributos. Se Conjurar uma Magia, ela é interrompida a menos que você obtenha sucesso em um teste simples (CD = 5 + valor de estupefato)."
        }
    }
}

function useConditions(locale: Locale) {
    return conditionsData[locale]
}

export {
    MonsterCore,
    AgeOfAshes,
    useConditions,
    conditionsData,
    contentSources,
    getContentSourcesBySystem,
    getDefaultEnabledSources,
    getEnabledMonsters,
    type GameSystem,
    type ContentSource,
    type Monster,
    type MonsterEntry
}
