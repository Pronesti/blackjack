const appReducer = (
  state = { app: {credits: 10, show_msg: false, msg: ''}, game: {deck: [], hand: [], table: []},  gameStatus: {showCard: false, stay: false, finishGame: false}, score: {table: 0, hand: 0, readyToCheck: false} },
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
        game:{  
        ...state.game,
        deck: newDeck,
        hand: [],
        table: [],
        },
        score:{
          ...state.score,
          hand: 0,
          table: 0
        }   
      };
    case 'ADD_CARD_TO_HAND':
      let copyDeck = state.game.deck;
      let card = copyDeck.pop();
      let nextHand = state.game.hand.concat(card);
      let calculateAs = nextHand.filter(element => element.number === '1').length;
      let calculateScore = nextHand
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if(calculateAs > 0 && ((calculateScore + 10) < 22)){
        calculateScore += 10
      }
      return {
        ...state,
        game: {
          ...state.game,
          hand: state.game.hand.concat(card),
          deck: copyDeck
        },
        score:{
          ...state.score,    
        hand: calculateScore
        }
      };
    case 'ADD_CARD_TO_TABLE':
      let copyDeck2 = state.game.deck; //refactor this names
      let card2 = copyDeck2.pop();
      let nextTable = state.game.table.concat(card2);
      let calculateAs2 = nextTable.filter(element => element.number === '1').length;
      let calculateScore2 = nextTable
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if(calculateAs2 > 0 && ((calculateScore2 + 10) < 22)){
        calculateScore2 += 10
      }

      return {
        ...state,
        game:{
          ...state.game,
          table: state.game.table.concat(card2),
          deck: copyDeck2
        },
        score:{
          ...state.score,
          table: calculateScore2
        }
      };
    case 'ADD_CREDITS':
      return {
        ...state,
        app:{
          ...state.app,
          credits: state.credits + action.payload
        }
      };
    case 'REMOVE_CREDITS':
      return {
        ...state,
        app:{
          ...state.app,
          credits: state.credits - action.payload
        }
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
        gameStatus:{
          ...state.gameStatus,
          finishGame: false,
        stay: false,
        showCard: false,
        readyToCheck: false,
        },
        game:{
          ...state.game,
          hand: [],
          table: []
        }
      };
    case 'STAY':
      let copyDeck3 = state.game.deck; //need to refactor this names
      let calculateScore3 = state.score.table;
      let nextTable3 = state.game.table;
      while(calculateScore3 < 17){
      let card3 = copyDeck3.pop();
      nextTable3 = nextTable3.concat(card3);
      let calculateAs3 = nextTable3.filter(element => element.number === '1').length;
      calculateScore3 = nextTable3
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      if(calculateAs3 > 0 && ((calculateScore3 + 10) < 22)){
        calculateScore3 += 10
      }
      
      }
      return {
        ...state,
        game:{
          ...state.game,
          table: nextTable3,
          deck: copyDeck3,
        },
        gameStatus:{
          ...state.gameStatus,
          stay: action.payload,
          showCard: action.payload,
        },
        score:{
          ...state.score,
          scoreTable: calculateScore3,
        readyToCheck: true
        }
      };
    case 'FINISH_GAME':
      return {
        ...state,
        gameStatus:{
          ...state.gameStatus,
          finishGame: action.payload
        }
      };
    default:
      return state;
  }
};

export default appReducer;
