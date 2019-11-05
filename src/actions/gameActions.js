export const addCardToHand = (card) => {
    return {
        type: 'ADD_CARD_TO_HAND',
        payload: card
    }
}

export const addCardToTable = (card) => {
    return {
        type: 'ADD_CARD_TO_TABLE',
        payload: card
    }
}

export const addCredits = (number) => {
    return {
        type: 'ADD_CREDITS',
        payload: number
    }
}

export const removeCredits = (number) => {
    return {
        type: 'REMOVE_CREDITS',
        payload: number
    }
}

export const setMsg = (msg) => {
    return {
        type: 'SET_MSG',
        payload: msg
    }
}

export const showMsg = (boolean) => {
    return {
        type: 'SHOW_MSG',
        payload: boolean
    }
}


export const resetGame = () => {
    return {
        type: 'RESET_GAME',
    }
}

export const setStay = (boolean) => {
    return {
        type: 'STAY',
        payload: boolean
    }
}

export const setFinishGame = (boolean) => {
    return {
        type: 'FINISH_GAME',
        payload: boolean
    }
}