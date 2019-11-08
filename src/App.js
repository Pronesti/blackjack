import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCardToHand, addCardToTable, resetGame, removeCredits, addCredits, setMsg, setStay, setFinishGame, createNewDeck } from './actions/gameActions';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import PopUp from './components/PopUp';
import BlackJack from './views/BlackJack';

const appStyle = { overflow: 'hidden' };

function App() {
  const [deck] = useState([]);
  const dispatch = useDispatch();
  const table = useSelector(state => state.app.game.table);
  const hand = useSelector(state => state.app.game.hand);
  const playerScore = useSelector(state => state.app.score.hand);
  const tableScore = useSelector(state => state.app.score.table);
  const readyToCheck = useSelector(state => state.app.score.readyToCheck);

  function createDeck() {
    dispatch(createNewDeck());
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

  /* function under17(tableScore){
    if(tableScore >= 17){
      return tableScore;
    }
    else {
      dispatch(addCardToTable());
      console.log(lastCard); // does not update and repeats the first value in all cycle
      if (lastCard.number === '1' && tableScore + 10 < 22) {
        console.log('1');
        //checks for As better value
        return under17((tableScore + 11));
      } else if (lastCard.number > 10) {
        console.log('2');
        return under17((tableScore + 10));
      } else {
        console.log('3');
        return under17((tableScore + Number(lastCard.number)));
      }
    }
  } */

  function checkGame() {
    if(readyToCheck){
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
}

  function stay() {
    dispatch(setStay(true));
  }

  function restartGame() {
    dispatch(resetGame());
    dispatch(removeCredits(1));
    createDeck();
    dealHands();
  }

  useEffect(() => {
    if (check(hand) !== -1) {
    } else {
      dispatch(setMsg('Table wins.'));
      dispatch(setFinishGame(true));
    }
  }, [hand, dispatch]);

  useEffect(()=>{
    checkGame();
  },[readyToCheck, checkGame])

  useEffect(() => {
    createDeck();
    dealHands();
  }, []);

  useEffect(() => {
    //Debugger
    console.log({
       deck,
       hand,
       table,
      playerScore,
      tableScore
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
