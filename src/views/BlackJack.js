import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCardToHand, addCardToTable, resetGame, removeCredits, addCredits, setMsg, setStay, setFinishGame, createNewDeck } from '../actions/gameActions';
import BottomBar from '../components/BottomBar';
import Paper from '@material-ui/core/Paper';
import Container from '../components/Container';

const handStyle = {
  display: 'inline-block',
  width: '100vw',
  backgroundColor: 'white',
  padding: 0,
  textAlign: 'center',
  marginTop: 2
};
const tableStyle = {
  display: 'inline-block',
  width: '100vw',
  backgroundColor: 'white',
  padding: 0,
  textAlign: 'center',
  marginTop: 2
};
export default function BlackJack() {
  const dispatch = useDispatch();
  const hand = useSelector(state => state.app.game.hand);
  const table = useSelector(state => state.app.game.table);
  const showCard = useSelector(state => state.app.gameStatus.showCard);
  const playerScore = useSelector(state => state.app.score.hand);
  const tableScore = useSelector(state => state.app.score.table);
  const readyToCheck = useSelector(state => state.app.score.readyToCheck);

  function createDeck() {
    dispatch(createNewDeck());
  }

  function dealHands() {
    for (let i = 0; i < 2; i++) {
      dispatch(addCardToHand());
    }
    for (let i = 0; i < 2; i++) {
      dispatch(addCardToTable());
    }
  }

  function hitMe() {
    if (check(hand) !== -1) {
      dispatch(addCardToHand());
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
    if (readyToCheck) {
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

  useEffect(() => {
    checkGame();
  }, [readyToCheck]);

  useEffect(() => {
    createDeck();
    dealHands();
  }, []);

  useEffect(() => {
    //Debugger
    console.log({
      hand,
      table,
      playerScore,
      tableScore
    });
  }, [table, hand]);

  return (
    <React.Fragment>
      <Paper style={tableStyle} elevation={0}>
        <Container type='TABLE' visible={showCard} cards={table} />
      </Paper>
      <Paper style={handStyle} elevation={0}>
        <Container type='HAND' cards={hand} />
      </Paper>
      <BottomBar hitMe={hitMe} stay={stay} restartGame={restartGame} />
    </React.Fragment>
  );
}
