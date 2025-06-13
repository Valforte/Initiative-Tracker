type translation = {
    table: {
        round: {[key:string]:string},
        name: {[key:string]:string},
        hp: {[key:string]:string},
        initiative: {[key:string]:string},
        conditions: {[key:string]:string},
        actions: {[key:string]:string},
    },
    dm_actions: {
        next: {[key:string]:string},
        reset: {[key:string]:string},
        playerView: {[key:string]:string},
        add: {[key:string]:string},
        clear: {[key:string]:string},
    },
    dm_table: {
        addConditionName: {[key:string]:string},
        addConditionValue: {[key:string]:string},
    },
    options: {
        theme: {[key:string]:string},
        language: {[key:string]:string},
    }
}

const text: translation = {
    table: {
        round: {
            en: "Round",
            pt_BR: "Rodada",
        },
        name: {
            en: "Name",
            pt_BR: "Nome",
        },
        hp: {
            en: "HP",
            pt_BR: "PV",
        },
        initiative: {
            en: "Initiative",
            pt_BR: "Iniciativa",
        },
        conditions: {
            en: "Conditions",
            pt_BR: "Condições",
        },
        actions: {
            en: "Actions",
            pt_BR: "Ações",
        },
    },
    dm_actions: {
        next: {
            en: "Next",
            pt_BR: "Avançar",
        },
        reset: {
            en: "Reset",
            pt_BR: "Resetar",
        },
        playerView: {
            en: "Player View",
            pt_BR: "Player View",
        },
        add: {
            en: "Add",
            pt_BR: "Adicionar",
        },
        clear: {
            en: "Clear",
            pt_BR: "Limpar",
        },
    },
    dm_table: {
        addConditionName: {
            en: "Name",
            pt_BR: "Nome",
        },
        addConditionValue: {
            en: "Value",
            pt_BR: "Valor",
        },
    },
    options: {
        theme: {
            en: "Theme",
            pt_BR: "Tema",
        },
        language: {
            en: "Language",
            pt_BR: "Idioma",
        }
    }
}

export { text }
