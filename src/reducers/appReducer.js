  const appReducer = (state={hand: [], table: []}, action) => {
    switch(action.type){
        case 'ADD_CARD_TO_HAND':
            return {
                ...state,
                hand: action.payload
            }
        case 'ADD_CARD_TO_TABLE':
            return {
                ...state,
                table: action.payload
            }
        default:
            return state
    }
}

export default appReducer;