import React, { useEffect, useState } from 'react';
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  SnackbarContent,
  Icon,
  IconButton,
  Snackbar,
  AppBar,
  Badge,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import TouchIcon from '@material-ui/icons/TouchApp';
import BeenHereIcon from '@material-ui/icons/Beenhere';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import CreditsIcon from '@material-ui/icons/MonetizationOn';

var types = ['spades', 'hearts', 'diamonds', 'clubs'];
var values = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13'
];

const cards = {
  hearts: [
    '🂠',
    '🂱',
    '🂲',
    '🂳',
    '🂴',
    '🂵',
    '🂶',
    '🂷',
    '🂸',
    '🂹',
    '🂺',
    '🂻',
    '🂽',
    '🂾'
  ],
  diamonds: [
    '🂠',
    '🃁',
    '🃂',
    '🃃',
    '🃄',
    '🃅',
    '🃆',
    '🃇',
    '🃈',
    '🃉',
    '🃊',
    '🃋',
    '🃍',
    '🃎'
  ],
  clubs: ['🂠', '🃑', '🃒', '🃓', '🃔', '🃕', '🃖', '🃗', '🃘', '🃙', '🃚', '🃛', '🃝', '	🃞'],
  spades: ['🂠', '🂡', '🂢', '🂣', '🂤', '🂥', '🂦', '🂧', '🂨', '🂩', '🂪', '🂫', '🂭', '🂮']
};

const appStyle = { overflow: 'hidden' };
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
const bottomStyle = {
  width: '100%',
  position: 'fixed',
  bottom: 0
};

function Card({ number, type }) {
  return <span style={{ fontSize: 100 }}>{cards[type][number]}</span>;
}

function Container({ type, cards, visible }) {
  return cards.map((element, index) => {
    if (type === 'TABLE' && !visible && index === 0) {
      return <Card key={index} number={0} type={element.type} />;
    } else {
      return <Card key={index} number={element.number} type={element.type} />;
    }
  });
}

function App() {
  const [deck] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const [handCards, setHandCards] = useState([]);
  const [disableHit, setDisableHit] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isStay, setIsStay] = useState(false);
  const [finishGame, setFinishGame] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');
  const [credits, setCredits] = useState(99);
  const [restart, setRestart] = useState(false);
  const [refresh, setRefresh] = useState(false);

  function createDeck() {
    console.log('creating deck...');
    for (var i = 0; i < values.length; i++) {
      for (var x = 0; x < types.length; x++) {
        var card = { number: values[i], type: types[x] };
        deck.push(card);
      }
    }
  }

  function shuffle() {
    console.log('shuffeling deck...');
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
      var location1 = Math.floor(Math.random() * deck.length);
      var location2 = Math.floor(Math.random() * deck.length);
      var tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }
  }

  function dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    console.log('deal hands');
    let newHand = [];
    let newTable = [];
    for (let i = 0; i < 2; i++) {
        let card = deck.pop();
        newHand.push(card);
    }
    for (let i = 0; i < 2; i++) {
      let card = deck.pop();
      newTable.push(card);
    }
    setHandCards(handCards.concat(newHand));
    setTableCards(newTable);
  }

  function hitMe() {
    console.log('hitMe');
    if (check(handCards) !== -1) {
      var card = deck.pop();
      setHandCards(handCards.concat(card));
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
    let playerScore = handCards
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    let tableScore = tableCards
      .map(element => {
        if (element.number > 10) {
          return 10;
        } else {
          return Number(element.number);
        }
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    while (tableScore < 17) {
      let extraCards = [];
      let card1 = deck.pop();
      console.log(card1);
      extraCards.push(card1);
      //setTableCards(tableCards.concat(card1)); // does not re-render twice
      if (card1.number === '1' && tableScore + 10 < 22) {
        //si le sirve que lo tome como 11
        tableScore += 11;
      } else if (card1.number > 10) {
        tableScore += 10;
      } else {
        tableScore += Number(card1.number);
      }
      console.log(extraCards);
      setTableCards(extraCards);
      //setRefresh(!refresh);
    }

    let playersA = handCards.filter(element => element.number === '1').length;
    let tablesA = tableCards.filter(element => element.number === '1').length;
    console.log('PlayersA: ', playersA, ' TablesA: ', tablesA);

    if (playersA > 1 && playerScore + 10 < 22) {
      // se fija si el As con 11 no se pasa
      playerScore += 10;
    }
    if (tablesA > 1 && tableScore + 10 < 22) {
      // se fija si el As con 11 no se pasa
      tableScore += 10;
    }
    console.log('player: ', playerScore, ' table:', tableScore);

    if (playerScore > 21) {
      setSnackMsg('Table wins.');
      setShowSnackBar(true);
    }
    if (tableScore > 21) {
      setSnackMsg('Player wins.');
      setShowSnackBar(true);
    } else {
      if (playerScore === 21) {
        if (tableScore === 21) {
          setSnackMsg('It is a tie.');
          setShowSnackBar(true);
        } else {
          setSnackMsg('BlackJack, you win.');
          setShowSnackBar(true);
        }
      }
      if (playerScore === tableScore) {
        setSnackMsg('It is a tie.');
        setShowSnackBar(true);
      } else {
        if (playerScore > tableScore) {
          setSnackMsg('Player wins.');
          setShowSnackBar(true);
        } else {
          setSnackMsg('Table wins.');
          setShowSnackBar(true);
        }
      }
    }
  }

  function playTable() {
    checkGame();
  }

  function stay() {
    console.log('stay');
    setIsStay(true); //Activa el modo stay
    setShowCard(true); // muestra la carta dada vuelta
    setDisableHit(true); // no lo deja pedir mas cartas
    playTable(); //juega la mesa
  }

  function restartGame() {
    setHandCards([]);
    setTableCards([]);
    setShowCard(false);
    setIsStay(false);
    setDisableHit(false);
    setFinishGame(false);
    setCredits(credits - 1);
    setRestart(!restart);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackBar(false);
  };

  useEffect(() => {
    if (check(handCards) !== -1) {
    } else {
      setSnackMsg('Table wins.');
      setShowSnackBar(true);
      setDisableHit(true);
      setFinishGame(true);
    }
  }, [handCards]);

  useEffect(() => {
    if (check(tableCards) !== -1) {
    } else {
      setFinishGame(true);
    }
  }, [tableCards]);

  useEffect(() => {
    createDeck();
    shuffle();
    dealHands();
  }, [restart]);

  useEffect(() => {
    //Debugger
    console.log({
      deck: deck,
      hand: handCards,
      table: tableCards
    });
  }, [tableCards, handCards, deck]);
  return (
    <div style={appStyle}>
      <AppBar position='static' style={{ margin: 0 }}>
        <Toolbar>
          <IconButton edge='start' color='inherit' aria-label='open drawer'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap style={{ flex: 1 }}>
            BlackJack
          </Typography>
          <div />
          <div>
            <IconButton
              aria-label={`You have got ${credits} credits`}
              color='inherit'>
              <Badge badgeContent={credits} color='secondary'>
                <CreditsIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Paper style={tableStyle}>
        <Container type='TABLE' visible={showCard} cards={tableCards} />
      </Paper>
      <Paper style={handStyle}>
        <Container type='HAND' cards={handCards} />
      </Paper>
      <Snackbar open={showSnackBar} onClose={handleClose}>
        <SnackbarContent
          message={
            <span>
              <Icon />
              {snackMsg}
            </span>
          }
          action={[
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Snackbar>
      <BottomNavigation showLabels style={bottomStyle}>
        <BottomNavigationAction
          label='Hit'
          disabled={disableHit || finishGame}
          onClick={hitMe}
          icon={<TouchIcon />}
        />
        <BottomNavigationAction
          label='Stand'
          disabled={isStay || finishGame}
          onClick={stay}
          icon={<BeenHereIcon />}
        />
        <BottomNavigationAction
          label='Restart'
          onClick={restartGame}
          icon={<ReplayIcon />}
        />
      </BottomNavigation>
    </div>
  );
}

export default App;
