import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCardToHand, addCardToTable, resetGame, removeCredits, addCredits, setMsg, setStay, setFinishGame } from './actions/gameActions';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import PopUp from './components/PopUp';
import BlackJack from './views/BlackJack';

var typesArray = ['spades', 'hearts', 'diamonds', 'clubs'];
var valuesArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

const appStyle = { overflow: 'hidden' };

function App() {
  const [deck] = useState([]);
  const dispatch = useDispatch();
  const table = useSelector(state => state.app.table);
  const hand = useSelector(state => state.app.hand);

  function createDeck() {
    for (var i = 0; i < valuesArray.length; i++) {
      for (var x = 0; x < typesArray.length; x++) {
        var card = { number: valuesArray[i], type: typesArray[x] };
        deck.push(card);
      }
    }
  }

  function shuffle() {
    for (var i = 0; i < 1000; i++) {
      var location1 = Math.floor(Math.random() * deck.length);
      var location2 = Math.floor(Math.random() * deck.length);
      var tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
  }

  function dealHands() {
    let newHand = [];
    let newTable = [];
    for (let i = 0; i < 2; i++) {
      let card = deck.pop();
      newHand.push(card);
      dispatch(addCardToHand(card));
    }
    for (let i = 0; i < 2; i++) {
      let card = deck.pop();
      dispatch(addCardToTable(card));
      newTable.push(card);
    }
  }

  function hitMe() {
    if (check(hand) !== -1) {
      var card = deck.pop();
      dispatch(addCardToHand(card));
    }
  }

  function check(cards) {
    var total = 0;

    total = cards
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (total > 21) {
      return -1;
    } else {
      return total;
    }
  }

  function checkGame() {
    let playerScore = hand
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let tableScore = table
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let tablesA = table.filter(element => element.number === '1').length;
    if (tablesA > 0 && tableScore + 10 < 22) {
      // se fija si el As con 11 no se pasa
      tableScore += 10;
    }
    while (tableScore < 17) {
      let card1 = deck.pop();
      dispatch(addCardToTable(card1));
      if (card1.number === '1' && tableScore + 10 < 22) {
        //checks for As better value
        tableScore += 11;
      } else if (card1.number > 10) {
        tableScore += 10;
      } else {
        tableScore += Number(card1.number);
      }
    }

    let playersA = hand.filter(element => element.number === '1').length;
    console.log('PlayersA: ', playersA, ' TablesA: ', tablesA);

    if (playersA > 0 && playerScore + 10 < 22) {
      // checks for As better value
      playerScore += 10;
    }

    console.log('player: ', playerScore, ' table:', tableScore);

    if (playerScore > 21) {
      //instant defeat
      dispatch(setMsg('Table wins.'));
    }
    if (tableScore > 21) {
      // instant win
      dispatch(setMsg('Player wins.'));
      if (playerScore === 21) {
        dispatch(addCredits(3));
      } else {
        dispatch(addCredits(2));
      }
    } else {
      if (playerScore === tableScore) {
        // both equal
        dispatch(setMsg('It is a tie.'));
        dispatch(addCredits(1));
      } else {
        if (playerScore > tableScore) {
          // player is greater than table
          if (playerScore === 21) {
            //checks for blackjack
            dispatch(setMsg('BlackJack, you win.'));
            dispatch(addCredits(3));
          } else {
            //pays for normal
            dispatch(setMsg('Player wins.'));
            dispatch(addCredits(2));
          }
        } else {
          // table is greater than player
          dispatch(setMsg('Table wins.'));
        }
      }
    }
  }

  function playTable() {
    checkGame();
  }

  function stay() {
    console.log('stay');
    dispatch(setStay(true));
    playTable();
  }

  function restartGame() {
    dispatch(resetGame());
    dispatch(removeCredits(1));
    createDeck();
    shuffle();
    dealHands();
  }

  useEffect(() => {
    if (check(hand) !== -1) {
    } else {
      dispatch(setMsg('Table wins.'));
      dispatch(setFinishGame(true))
    }
  }, [hand, dispatch]);

  useEffect(() => {
    if (check(table) !== -1) {
    } else {
      dispatch(setFinishGame(true))
    }
  }, [table]);

  useEffect(() => {
    createDeck();
    shuffle();
    dealHands();
  }, []);

  useEffect(() => {
    //Debugger
    console.log({
      deck: deck,
      hand: hand,
      table: table
    });
  }, [table, hand, deck]);

  return (
    <div style={appStyle}>
      <TopBar />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' />
        </Switch>
      </BrowserRouter>
      <BlackJack />
      <PopUp />
      <BottomBar hitMe={hitMe} stay={stay} restartGame={restartGame} />
    </div>
  );
}

export default App;
