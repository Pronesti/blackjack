const appReducer = (state = { credits: 10, show_msg: false, msg: '', hand: [], table: [], showCard: false, stay: false, finishGame: false }, action) => {
  switch (action.type) {
    case 'ADD_CARD_TO_HAND':
      return {
        ...state,
        hand: state.hand.concat(action.payload)
      };
    case 'ADD_CARD_TO_TABLE':
      return {
        ...state,
        table: state.table.concat(action.payload)
      };
    case 'ADD_CREDITS':
      return {
        ...state,
        credits: state.credits + action.payload
      };
    case 'REMOVE_CREDITS':
      return {
        ...state,
        credits: state.credits - action.payload
      };
    case 'SET_MSG':
      return {
        ...state,
        msg: action.payload,
        show_msg: true
      };
    case 'SHOW_MSG':
      return {
        ...state,
        show_msg: action.payload
      };
    case 'RESET_GAME':
      return {
        ...state,
        finishGame: false,
        stay: false,
        showCard: false,
        hand: [],
        table: []
      };
    case 'STAY':
      return {
        ...state,
        stay: action.payload,
        showCard: action.payload
      };
    case 'FINISH_GAME':
      return {
        ...state,
        finishGame: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;
