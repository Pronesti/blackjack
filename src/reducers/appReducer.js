const appReducer = (
  state = { credits: 10, show_msg: false, msg: '', deck: [], hand: [], table: [], lastCard: {}, showCard: false, stay: false, finishGame: false },
  action
) => {
  switch (action.type) {
    case 'CREATE_NEW_DECK':
      let typesArray = ['spades', 'hearts', 'diamonds', 'clubs'];
      let valuesArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
      let newDeck = [];
      for (let i = 0; i < valuesArray.length; i++) {
        for (let x = 0; x < typesArray.length; x++) {
          let card = { number: valuesArray[i], type: typesArray[x] };
          newDeck.push(card);
        }
      }
      for (let i = 0; i < 1000; i++) {
        let location1 = Math.floor(Math.random() * newDeck.length);
        let location2 = Math.floor(Math.random() * newDeck.length);
        let tmp = newDeck[location1];

        newDeck[location1] = newDeck[location2];
        newDeck[location2] = tmp;
      }
      return {
        ...state,
        deck: newDeck
      };
    case 'ADD_CARD_TO_HAND':
      let copyDeck = state.deck;
      let card = copyDeck.pop();
      return {
        ...state,
        hand: state.hand.concat(card),
        deck: copyDeck
      };
    case 'ADD_CARD_TO_TABLE':
      let copyDeck2 = state.deck;
      let card2 = copyDeck2.pop();
      return {
        ...state,
        lastCard: card2,
        table: state.table.concat(card2),
        deck: copyDeck2
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
