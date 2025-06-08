function getFromStorage(key: string) {
    const storedItem = localStorage.getItem(key)
    if (storedItem) {
        return JSON.parse(storedItem)
    }
}

function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export {getFromStorage, saveToStorage}
