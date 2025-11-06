import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

type Locale = 'en' | 'pt_BR'

type TranslationStructure = {
    table: {
        round: string,
        name: string,
        hp: string,
        initiative: string,
        conditions: string,
        actions: string,
    },
    dm_actions: {
        next: string,
        reset: string,
        playerView: string,
        add: string,
        clear: string,
        quantity: string,
    },
    dm_table: {
        addConditionName: string,
        addConditionValue: string,
    },
    options: {
        theme: string,
        language: string,
    },
    colors: {
        red: string,
        green: string,
        blue: string,
        purple: string,
        pink: string,
        brown: string,
    }
}

const translations: Record<Locale, TranslationStructure> = {
    en: {
        table: {
            round: "Round",
            name: "Name",
            hp: "HP",
            initiative: "Initiative",
            conditions: "Conditions",
            actions: "Actions",
        },
        dm_actions: {
            next: "Next",
            reset: "Reset",
            playerView: "Player View",
            add: "Add",
            clear: "Clear",
            quantity: "Qty",
        },
        dm_table: {
            addConditionName: "Name",
            addConditionValue: "Value",
        },
        options: {
            theme: "Theme",
            language: "Language",
        },
        colors: {
            red: "Red",
            green: "Green",
            blue: "Blue",
            purple: "Purple",
            pink: "Pink",
            brown: "Brown",
        }
    },
    pt_BR: {
        table: {
            round: "Rodada",
            name: "Nome",
            hp: "PV",
            initiative: "Iniciativa",
            conditions: "Condições",
            actions: "Ações",
        },
        dm_actions: {
            next: "Avançar",
            reset: "Resetar",
            playerView: "Player View",
            add: "Adicionar",
            clear: "Limpar",
            quantity: "Qtd",
        },
        dm_table: {
            addConditionName: "Nome",
            addConditionValue: "Valor",
        },
        options: {
            theme: "Tema",
            language: "Idioma",
        },
        colors: {
            red: "Vermelho",
            green: "Verde",
            blue: "Azul",
            purple: "Roxo",
            pink: "Rosa",
            brown: "Marrom",
        }
    }
}

export function useTranslations() {
    const lang = useStorage<Locale>('lang', 'en')

    const t = computed(() => translations[lang.value])

    return { t, lang }
}
