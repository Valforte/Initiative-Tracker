class MonsterCore {
    monsters: string[] = ['Aapoph Granitescale', 'Aapoph Serpentfolk', 'Adult Adamantine Dragon', 'Adult Conspirator Dragon', 'Adult Diabolic Dragon', 'Adult Empyreal Dragon', 'Adult Fortune Dragon', 'Adult Horned Dragon', 'Adult Mirage Dragon', 'Adult Omen Dragon', 'Aeolaeka', 'Aesra', 'Air Scamp', 'Akhana', 'Ancient Adamantine Dragon', 'Ancient Conspirator Dragon', 'Ancient Diabolic Dragon', 'Ancient Empyreal Dragon', 'Ancient Fortune Dragon', 'Ancient Horned Dragon', 'Ancient Mirage Dragon', 'Ancient Omen Dragon', 'Animated Armor', 'Animated Broom', 'Animated Statue', 'Ankhrav', 'Ankhrav Hive Mother', 'Ankylosaurus', 'Aolaz', 'Arbiter', 'Arboreal Regent', 'Arboreal Warden', 'Army Ant Swarm', 'Astradaemon', 'Athamaru Hunter', 'Augnagar', 'Awakened Tree', 'Axiomite', 'Azarketi Crab Catcher', 'Azarketi Tide Tamer', 'Azuretzi', 'Balisse', 'Bandersnatch', 'Banshee', 'Barghest', 'Basilisk', 'Benthic Worm', 'Boar', 'Boggard Scout', 'Boggard Swampseer', 'Boggard Warrior', 'Bogwid', 'Bone Prophet', 'Bottlenose Dolphin', 'Brimorak', 'Brine Shark', 'Brontosaurus', 'Bugbear Prowler', 'Bugbear Tormentor', 'Cacodaemon', 'Caldera Oni', 'Caligni Dancer', 'Caligni Hunter', 'Caligni Skulker', 'Cassisian', 'Cauthooj', 'Cave Bear', 'Cave Worm', 'Centipede Swarm', 'Changeling Exile', 'Charnel Creation', 'Chimera', 'Choral', 'Chupacabra', 'Cinder Rat', 'Clay Effigy', 'Cloud Giant', 'Coarti', 'Cockatrice', 'Coil Spy', 'Compsognathus', 'Con Rit', 'Crag Linnorm', 'Crawling Hand', 'Crocodile', 'Cuckoo Hag', 'Cyclops', 'Cythnigot', 'Daeodon', 'Deadly Mantis', 'Deinonychus', 'Deinosuchus', 'Dero Magister', 'Dero Stalker', 'Dero Strangler', 'Desert Drake', 'Dezullon', 'Dire Wolf', 'Doldrums Heap', 'Dragon Turtle', 'Draxie', 'Dryad', 'Dryad Queen', 'Dullahan', 'Dybbuk', 'Eagle', 'Earth Scamp', 'Elananx', 'Electric Eel', 'Elemental Avalanche', 'Elemental Hurricane', 'Elemental Inferno', 'Elemental Tsunami', 'Elephant', 'Faydhaan', 'Fey Dragonet', 'Fire Giant', 'Fire Scamp', 'Firewyrm', 'Flame Drake', 'Flash Beetle', 'Forest Troll', 'Frost Drake', 'Frost Giant', 'Gancanagh', 'Gargoyle', 'Ghost Commoner', 'Ghost Mage', 'Ghoul Soldier', 'Ghoul Stalker', 'Giant Anaconda', 'Giant Animated Statue', 'Giant Ant', 'Giant Bat', 'Giant Centipede', 'Giant Crawling Hand', 'Giant Eagle', 'Giant Flytrap', 'Giant Frilled Lizard', 'Giant Gecko', 'Giant Hippocampus', 'Giant Mantis', 'Giant Monitor Lizard', 'Giant Moray Eel', 'Giant Octopus', 'Giant Rat', 'Giant Scorpion', 'Giant Stag Beetle', 'Giant Tarantula', 'Giant Viper', 'Giant Wasp', 'Gimmerling', 'Giylea', 'Globster', 'Goblin Dog', 'Gogiteth', 'Goliath Spider', 'Gongorinan', 'Gorilla', 'Gosreg', 'Graveknight', 'Great Cyclops', 'Great White Shark', 'Greater Hell Hound', 'Greater Nightmare', 'Greater Shadow', 'Griffon', 'Grikkitog', 'Grim Reaper', 'Grindylow', 'Grizzly Bear', 'Grothlut', 'Guard Dog', 'Guthallath', 'Gylou', 'Hadrosaurid', 'Halfling Street Watcher', 'Halfling Troublemaker', 'Harpy', 'Hell Hound', 'Herexen', 'Hippocampus', 'Hippogriff', 'Hobgoblin Archer', 'Hobgoblin General', 'Hobgoblin Soldier', 'Homunculus', 'Hryngar Bombardier', 'Hryngar Sharpshooter', 'Hryngar Taskmaster', 'Hunting Spider', 'Hyaenodon', 'Hydra', 'Hyena', 'Ice Linnorm', 'Ifrit', 'Imp', 'Irnakurse', 'Iron Hag', 'Iron Warden', 'Island Oni', 'Jaathoom', 'Jabali', 'Jah-Tohl', 'Jann', 'Jinkin', 'Jungle Drake', 'Kanya', 'Keketar', 'Kholo Bonekeeper', 'Kholo Hunter', 'Kholo Sergeant', 'Kraken', 'Krooth', 'Lamia', 'Lamia Matriarch', 'Larval Ofalth', 'Leopard', 'Lesser Death', 'Leukodaemon', 'Lich', 'Lion', 'Living Landslide', 'Living Tar', 'Living Waterfall', 'Living Whirlwind', 'Living Wildfire', 'Lyrakien', 'Magma Worm', 'Mammoth', 'Manticore', 'Marsh Giant', 'Medusa', 'Megalodon', 'Megaprimatus', 'Merfolk Warrior', 'Merfolk Wavecaller', 'Mitflit', 'Morrigna', 'Mountain Oni', 'Mukradi', 'Mummy Guardian', 'Mummy Pharaoh', 'Naiad', 'Naiad Queen', 'Nessari', 'Nightmare', 'Nilith', 'Norn', 'Nosoi', 'Noxious Needler', 'Nuckelavee', 'Ofalth', 'Ogre Boss', 'Ogre Glutton', 'Ogre Warrior', 'Omox', 'Orca', 'Ort', 'Pachycephalosaurus', 'Paleohemoth', 'Pegasus', 'Phade', 'Phantom Beast', 'Phantom Knight', 'Phistophilus', 'Phoenix', 'Pipefox', 'Pixie', 'Plague Zombie', 'Pleroma', 'Poltergeist', 'Poracha', 'Pteranodon', 'Pugwampi', 'Pukwudgie', 'Pusk', 'Python', 'Qarna', 'Quai Dau To', 'Quatoid', 'Quelaunt', 'Quetz Coatl', 'Quetzalcoatlus', 'Raja-Krodha', 'Raktavarna', 'Rat Swarm', 'Redcap', 'Reefclaw', 'Rekhep', 'Revenant', 'Rhinoceros', 'Rhu-Chalik', 'Riding Dog', 'Riding Horse', 'Riding Pony', 'River Drake', 'Roc', 'Rune Giant', 'Sargassum Heap', 'Sarglagon', 'Satyr', 'Scarecrow', 'Scorpion Swarm', 'Sea Hag', 'Sea Serpent', 'Sedacthy', 'Sedacthy Marauder', 'Sedacthy Scout', 'Seraptis', 'Sewer Ooze', 'Shadow', 'Shadow Giant', 'Shemhazian', 'Shining Child', 'Shuln', 'Sinspawn', 'Skeletal Champion', 'Skeletal Giant', 'Skeletal Horse', 'Skeletal Hulk', 'Skeleton Guard', 'Skulltaker', 'Slurk', 'Smaranava', 'Smilodon', 'Snapping Flytrap', 'Snow Oni', 'Sod Hound', 'Soulbound Doll', 'Sphinx', 'Spider Swarm', 'Sprigjack', 'Sprite', 'Stegosaurus', 'Stone Bulwark', 'Stone Giant', 'Stone Mauler', 'String Slime', 'Succubus', 'Sweet Hag', 'Tabellia', 'Tarn Linnorm', 'Terotricus', 'Thulgant', 'Tiger', 'Tomb Jelly', 'Tooth Fairy', 'Tooth Fairy Swarm', 'Tor Linnorm', 'Treerazer', 'Triceratops', 'Troll Warleader', 'Twigjack', 'Tyrannosaurus', 'Ugothol', 'Unicorn', 'Vampire Bat Swarm', 'Vampire Count', 'Vampire Mastermind', 'Vampire Servitor', 'Vanth', 'Velociraptor', 'Venedaemon', 'Vescavor Queen', 'Vescavor Swarm', 'Vicharamuni', 'Vidileth', 'Vilderavn', 'Viper', 'Voidworm', 'Vordine', 'Vrolikai', 'War Horse', 'War Pony', 'Warg', 'Warsworn', 'Wasp Swarm', 'Water Scamp', 'Werebear', 'Wererat', 'Weretiger', 'Werewolf', 'Wight', 'Will-O\'-Wisp', 'Witchwarg', 'Wolf', 'Woolly Rhinoceros', 'Wraith', 'Wyvern', 'Xoarian', 'Xulgath Leader', 'Xulgath Skulker', 'Xulgath Warrior', 'Yamaraj', 'Yeti', 'Young Adamantine Dragon', 'Young Conspirator Dragon', 'Young Diabolic Dragon', 'Young Empyreal Dragon', 'Young Fortune Dragon', 'Young Horned Dragon', 'Young Mirage Dragon', 'Young Omen Dragon', 'Zecui', 'Zephyr Hawk', 'Zoaem', 'Zombie Brute', 'Zombie Hulk', 'Zombie Shambler', 'Zyss Serpentfolk']
    npc: string[] = ['Aiuvarin Elementalist', 'Catfolk Pouncer', 'Centaur Herbalist', 'Dhampir Wizard', 'Dromaar Mountaineer', 'Duskwalker Ghost Hunter', 'Dwarf Stonecaster', 'Dwarf Warrior', 'Elf Ranger', 'Fungus Leshy', 'Gnome Bard', 'Goblin Commando', 'Goblin Pyro', 'Goblin War Chanter', 'Goblin Warrior', 'Gourd Leshy', 'Kobold Cavern Mage', 'Kobold Scout', 'Kobold Warrior', 'Lawbringer Warpriest', 'Leaf Leshy', 'Lizardfolk Defender', 'Lizardfolk Scout', 'Lizardfolk Stargazer', 'Minotaur Hunter', 'Orc Commander', 'Orc Scrapper', 'Orc Veteran', 'Pitborn Adept', 'Ratfolk Grenadier', 'Tengu Sneak', 'Umbral Gnome Rockwarden', 'Umbral Gnome Scout', 'Umbral Gnome Warrior']
}

class AgeOfAshes {
    monsters: string[] = [
        'Anadi Elder', 'Anadi Hunter', 'Anadi Sage', 'Doorwarden', 'Emperor Bird', 'Grauladon', 'Graveshell', 'Hellcrown', 'Tixitog',
        'Asanbosam', 'Bida', 'Biloko Veteran', 'Biloko Warrior', 'Charau-ka Acolyte of Angazhan', 'Charau-ka Butcher', 'Charau-ka Warrior', 'Eloko', 'Grippli Archer', 'Grippli Greenspeaker', 'Grippli Scout', 'Kishi', 'Living Sap', 'Mokele-Mbembe', 'Sabosan',
        'Augur', 'Blood Boar', 'Evangelist', 'Interlocutor', 'Kalavakus', 'Osyluth', 'Precentor', 'Remnant of Barzillai', 'Rusalka', 'Shadow Giant',
        'Adult Magma Dragon', 'Ancient Magma Dragon', 'Carnivorous Crystal', 'Dalos', 'Deculi', 'Devourer', 'Dragonscarred Dead', 'Forge-Spurned', 'Gashadokuro', 'Soulbound Ruin', 'Young Magma Dragon',
        'Aluum Enforcer', 'Calikang', 'Cornugon', 'Crucidaemon', 'Duneshaker Solifugid', 'Giant Solifugid', 'Immortal Ichor', 'Nalfeshnee', 'Spiritbound Aluum', 'Witchwyrd', 'Xotanispawn',
        'Aiudara Wraith', 'Dragonshard Guardian', 'Elder Wyrmwraith', 'Tarrasque', 'Tzitzimitl', 'Vazgorlu', 'Wyrmwraith', 'Xotani',
    ]
}

type conditionsDB = {
    [key:string]: string
}

const conditions: Array<conditionsDB> = [
    {
        name_en: 'Blinded', description_en: "You can't see. All normal terrain is difficult terrain. You can't detect anything using vision. Automatically critically fail Perception checks that require you to see; if vision is your only precise sense, you take a –4 status penalty to Perception checks. You are immune to visual effects. Blinded overrides dazzled.",
        name_pt_BR: 'Cego', description_pt_BR: "Você não pode enxergar. Todo terreno normal é terreno difícil. Você é incapaz de detectar qualquer coisa utilizando a visão. Você falha criticamente em testes de Percepção que requeiram que você seja capaz de enxergar; se visão for seu único sentido preciso, você sofre –4 de penalidade de estado em testes de Percepção. Você fica imune a efeitos visuais. Cego sobrepõe ofuscado.",
    },
    {
        name_en: 'Broken', description_en: "A broken object can't be used, nor does it grant bonuses. Broken armor grants its item bonus to AC, but gives a status penalty to AC (–1 light, –2 medium,–3 heavy). An effect that makes an item broken reduces the item's HP to its Broken Threshold.",
        name_pt_BR: 'Quebrado', description_pt_BR: "Um objeto quebrado não pode e nem concede bônus. Uma armadura quebrada ainda concede um item de bônus na CA, mas impõe uma penalidade de estado na CA (-1 para leve, -2 média, -3 pesada). Um efeito que deixe o item quebrado automaticamente reduz seus PV para o limiar de quebra.",
    },
    {
        name_en: 'Clumsy', description_en: "Take a status penalty equal to your clumsy value on Dexterity-based checks and DCs, including AC, Reflex saves, ranged attacks, and skill checks using Acrobatics, Stealth, and Thievery.",
        name_pt_BR: 'Desajeitado', description_pt_BR: "Sofre uma penalidade de estado igual ao valor desta condição em testes e CDs baseadas em Destreza, incluindo CA, salvamentos de Reflexos, rolagens de ataque à distância e testes de perícia utilizando Acrobatismo, Furtividade e Ladroagem.",
    },
    {
        name_en: 'Confused', description_en: "You are off-guard, don't treat anyone as your ally, and can't Delay, Ready, or use reactions. Use all your actions to Strike or cast offensive cantrips. The GM determines targets randomly. If you have no other option, target yourself, automatically hitting. If it's impossible for you to attack or cast spells, you babble incoherently, wasting your actions. Each time you take damage from an attack or spell, attempt a DC 11 flat check to end the condition.",
        name_pt_BR: 'Confuso', description_pt_BR: "Você está desprevenido, não trata ninguém como aliado e não pode Adiar, Preparar ou usar reações. Use todas suas ações para Golpear ou conjurar truques mágicos ofensivos. O MJ determina os alvos aleatoriamente. Se não tiver outra opção, mire em si mesmo, acertando automaticamente. Se for impossível atacar ou conjurar magias, você balbucia incoerentemente, desperdiçando suas ações. Cada vez que sofrer dano de um ataque ou magia, faça um teste simples CD 11 para encerrar a condição.",
    },
    {
        name_en: 'Controlled', description_en: "Your controller dictates how you act.",
        name_pt_BR: 'Controlado', description_pt_BR: "O controlador dita como você age.",
    },
    {
        name_en: 'Dazzled', description_en: "All creatures and objects are concealed from you.",
        name_pt_BR: 'Ofuscado', description_pt_BR: "Todas as criaturas e objetos ficam ocultados para você.",
    },
    {
        name_en: 'Deafened', description_en: "Automatically critically fail Perception checks that require hearing. Take a –2 status penalty to Perception checks for initiative and checks that involve sound but also rely on other senses. If you perform an action that has the auditory trait, you must succeed at a DC 5 flat check or the action is lost. You are immune to auditory effects.",
        name_pt_BR: 'Surdo', description_pt_BR: "Você falha criticamen- te em testes de Percepção que requeiram audição. Você sofre –2 de penali- dade de estado em testes de Percepção para iniciativa e testes que envolvam som e também utilizem outros sentidos. Se realizar uma ação com o traço auditivo, você deve obter sucesso em um teste simples CD 5 ou a ação é perdida. Você é imune a efeitos auditivos.",
    },
    {
        name_en: 'Drained', description_en: "Take a status penalty equal to your drained value on Constitution-based checks, such as Fortitude saves. Lose Hit Points equal to your level times the drained value, and your maximum Hit Points are reduced by the same amount. When you regain Hit Points by resting for 8 hours, your drained value is reduced by 1, but you don't immediately recover the lost Hit Points.",
        name_pt_BR: 'Drenado', description_pt_BR: "Sofre uma penalidade de estado igual ao valor desta condição em testes baseados em Constituição (como salvamentos de Fortitude). Perde Pontos de Vida igual ao seu nível multiplicado pelo valor de drenado, e seus Pontos de Vida máximos são reduzidos nesta mesma quantidade. Quando recuperar Pontos de Vida após descansar por 8 horas, seu valor de drenado é reduzido em 1, mas você não recupera imediatamente Pontos de Vida perdidos.",
    },
    {
        name_en: 'Encumbered', description_en: "You're clumsy 1 and take a –10-foot penalty to all your Speeds.",
        name_pt_BR: 'Sobrecarregado', description_pt_BR: "Você fica desajeitado 1 e sofre –3 metros de penalidade em todas as suas Velocidades.",
    },
    {
        name_en: 'Enfeebled', description_en: "Take a status penalty equal to your enfeebled value to Strength-based rolls and DCs, including Strength-based melee attack rolls, Strength-based damage rolls, and Athletics checks.",
        name_pt_BR: 'Enfraquecido', description_pt_BR: "Sofre uma penalidade de estado igual ao valor desta condição em testes e CDs baseadas em Força, incluindo rolagens de ataques corpo a corpo, rolagens de dano baseadas em Força e testes de perícia utilizando Atletismo.",
    },
    {
        name_en: 'Fascinated', description_en: "Take a –2 status penalty to Perception and skill checks, and you can't use actions with the concentrate trait unless they are related to the subject of your fascination. This condition ends if a creature takes hostile actions toward you or any of your allies.",
        name_pt_BR: 'Fascinado', description_pt_BR: "Sofre –2 de penalidade de estado em testes de Percepção e perícias e não pode usar ações com o traço concentração a menos que sejam relacionadas ao alvo de seu fascínio. Esta condição é encerrada se uma criatura usar ações hostis contra você ou qualquer de seus aliados.",
    },
    {
        name_en: 'Fatigued', description_en: "Take a –1 status penalty to AC and saving throws. During exploration, you can't choose an exploration activity. Recover from fatigue after a full night's rest.",
        name_pt_BR: 'Fatigado', description_pt_BR: "Sofre –1 de penalidade de estado na CA e em salvamentos. Enquanto explorar, você não pode escolher uma atividade de exploração. Recupera da fadiga após uma noite completa de descanso.",
    },
    {
        name_en: 'Fleeing', description_en: "On your turn, spend each action trying to escape the source of the condition as expediently as possible. You can't Delay or Ready.",
        name_pt_BR: 'Fugindo', description_pt_BR: "Em seu turno, gaste cada uma de suas ações tentando escapar da fonte desta condição da melhor maneira possível. Você não pode Adiar ou Preparar.",
    },
    {
        name_en: 'Frightened', description_en: "Take a status penalty equal to the value to all checks and DCs. At the end of each of your turns, the value decreases by 1.",
        name_pt_BR: 'Assustado', description_pt_BR: "Sofre uma penalidade de estado igual ao valor desta condição em todos os seus testes e CDs. Ao final de cada um de seus turnos, o valor é reduzido em 1.",
    },
    {
        name_en: 'Grabbed', description_en: "You're immobilized and off-guard. If you attempt a manipulate action, you must succeed at a DC 5 flat check or it is lost.",
        name_pt_BR: 'Agarrado', description_pt_BR: "Você está desprevenido e imobilizado. Se tentar uma ação de manuseio, deve obter sucesso em um teste simples CD 5 ou ela é perdida.",
    },
    {
        name_en: 'Immobilized', description_en: "You can't take any action with the move trait. If you're immobilized by something holding you in place and an external force would move you, the force must succeed at a check against the DC of the effect holding you in place you or the relevant defense (usually Fortitude DC) of the creature holding you in place.",
        name_pt_BR: 'Imobilizado', description_pt_BR: "Você não pode usar qualquer ação com o traço movimento. Se estiver imobilizado por algo lhe segurando no lugar e uma força externa fosse lhe mover, essa força deve obter sucesso em um teste contra a CD do efeito lhe segurando no lugar ou contra a defesa relevante (normalmente CD de Fortitude) da criatura lhe segurando no lugar.",
    },
    {
        name_en: 'Off-Guard', description_en: "Take a –2 circumstance penalty to AC.",
        name_pt_BR: 'Desprevenido', description_pt_BR: "Sofre –2 de penalidade de circunstância na CA.",
    },
    {
        name_en: 'Paralyzed', description_en: "You're off-guard and can't take actions except Recall Knowledge and others that require only your mind. You can't Seek.",
        name_pt_BR: 'Paralisado', description_pt_BR: "Você está desprevenido e não pode agir exceto para Recordar Conhecimento e usar ações que requeiram somente o uso de sua mente. Você não pode Buscar.",
    },
    {
        name_en: 'Persistent Damage', description_en: "Instead of taking persistent damage immediately, take it at the end of each of your turns, rolling any damage dice each time. After you take persistent damage, roll a DC 15 flat check to see if you recover. If you succeed, the condition ends. You or an ally can help you recover, allowing an additional flat check. This usually takes 2 actions, and must be something that would reasonably help against the source of the damage. The GM can reduce the DC to 10, have the damage end automatically, or change the number of actions.",
        name_pt_BR: 'Dano Persistente', description_pt_BR: "Você sofre o dano persistente ao final de cada um de seus turnos (em vez de sofrê-lo imediatamente), rolando quaisquer dados de dano a cada vez. Após sofrer dano persistente, role um teste simples CD 15. Em um sucesso, a condição é encerrada. Você ou um aliado pode ajudá-lo a se recuperar com um teste simples adicional. Isto normalmente usa 2 ações e deve ser algo que ajude razoavelmente contra a origem do dano. O MJ pode reduzir a CD para 10, fazer o dano encerrar automaticamente ou mudar a quantidade de ações.",
    },
    {
        name_en: 'Petrified', description_en: "You can't act, nor can you sense anything. You're an object with double your normal Bulk (typically 12 if Medium or 6 if Small), AC 9, Hardness 8, and the same current HP you had when alive.",
        name_pt_BR: 'Petrificado', description_pt_BR: "Você não pode agir nem sentir qualquer coisa. Você se torna um objeto com um Volume igual ao dobro de seu Volume normal (normalmente 12 para uma criatura Média ou 6 para Pequena), CA 9, Dureza 8 e a mesma quantidade de Pontos de Vida atuais que tinha quando estava vivo.",
    },
    {
        name_en: 'Prone', description_en: "You're off-guard with a –2 circumstance penalty to attack rolls. The only move actions you can take are Crawl and Stand. Standing ends the prone condition. You can Take Cover while prone, gaining greater cover against ranged attacks (but remain off-guard).",
        name_pt_BR: 'Prostrado', description_pt_BR: "Você está desprevenido e sofre –2 de penalidade de circunstância em rolagens de ataque. As únicas ações de movimento que você pode usar são Rastejar e Levantar. Levantar encerra a condição prostrado. Você pode Obter Cobertura enquanto estiver prostrado recebendo cobertura maior contra ataques à distância (mas permanece desprevenido).",
    },
    {
        name_en: 'Quickened', description_en: "You gain 1 additional action at the start of your turn each round. Many effects that make you quickened specify the types of additional actions you can use. Because quickened has its effect at the start of your turn, you don't gain actions immediately if you become quickened during your turn.",
        name_pt_BR: 'Acelerado', description_pt_BR: "Você recebe 1 ação adicional no início de seu turno a cada rodada. Muitos efeitos que lhe deixam acelerado especificam os tipos de ações adicionais que você pode usar. Como acelerado tem efeito no início de seu turno, você não recebe ações imediatamente se ficar acelerado durante seu turno.",
    },
    {
        name_en: 'Restrained', description_en: "You're tied up and can barely move, or a creature has you pinned. You are immobilized and off-guard, and you can't use any actions with the attack or manipulate traits except to attempt to Escape or Force Open your bonds. Restrained overrides grabbed.",
        name_pt_BR: 'Restringido', description_pt_BR: "Você está amarrado e mal pode se mover, ou uma criatura lhe prendeu. Você está desprevenido e imobilizado e não pode usar quaisquer ações com os traços ataque ou manuseio exceto para tentar Escapar ou Forçar suas amarras. Restringido sobrepõe agarrado.",
    },
    {
        name_en: 'Sickened', description_en: "Take a status penalty equal to the value on all checks and DCs. You can't willingly ingest anything. You can spend an action retching to attempt a Fortitude save against the DC of the sickening effect. On a success, reduce the value by 1 (2 on a critical success).",
        name_pt_BR: 'Enjoado', description_pt_BR: "Sofre uma penalidade de estado igual ao valor desta condição em todos os seus testes e CDs. Você não pode ingerir nada voluntariamente. Você pode gastar uma ação regurgitando para tentar imediatamente um salvamento de Fortitude contra a CD do efeito que lhe deixou enjoado. Em um sucesso, reduza o valor de enjoado em 1 (ou em 2 em um sucesso crítico).",
    },
    {
        name_en: 'Slowed', description_en: "When you regain your actions at the start of your turn, reduce the number of actions by your slowed value. You don't lose actions immediately if slowed during your turn.",
        name_pt_BR: 'Lento', description_pt_BR: "Quando recuperar suas ações no início de seu turno, reduza a quantidade de ações que você recupera pelo seu valor de lento. Você não perde ações imediatamente se ficar lento durante seu turno.",
    },
    {
        name_en: 'Stunned', description_en: "You can't act. A stunned value indicates how many total actions you lose. Each time you regain actions, reduce the number by your stunned value, then reduce your stunned value by the number of actions lost. If stunned has a duration, lose all your actions for the listed duration. Stunned overrides slowed. Actions lost to stunned count toward those lost to slowed.",
        name_pt_BR: 'Atordoado', description_pt_BR: "Você não pode agir. Atordoado sempre inclui um valor, que indica o total de ações que você perde. Cada vez que recuperar ações, reduza a quantidade pelo seu valor de atordoado, e então reduza seu valor de atordoado pela quantidade de ações que perdeu. Se atordoado tiver uma duração, perca todas suas ações pela duração listada. Atordoado sobrepõe lento. Você deduz as ações perdidas pela condição atordoado das ações perdidas por estar lento.",
    },
    {
        name_en: 'Stupefied', description_en: "Take a status penalty equal to the value to checks and DCs based on Intelligence, Wisdom, or Charisma, including Will saves, spell attack rolls and DCs, and appropriate skill checks. If you Cast a Spell, it's disrupted unless you succeed at a flat check (DC = 5 + value).",
        name_pt_BR: 'Estupefato', description_pt_BR: "Sofre uma penalidade de estado igual ao valor desta condição em testes e CDs baseadas em Inteligência, Sabedoria e Carisma, incluindo salvamentos de Vontade, rolagens de ataque de magia, CDs de magia, e testes de perícias que utilizem estes atributos. Se Conjurar uma Magia, ela é interrompida a menos que você obtenha sucesso em um teste simples (CD = 5 + valor de estupefato).",
    },
]

export { MonsterCore, AgeOfAshes, conditions }
