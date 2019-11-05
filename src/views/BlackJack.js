import React from 'react';
import { useSelector } from 'react-redux';
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
  const hand = useSelector(state => state.app.hand);
  const table = useSelector(state => state.app.table);
  const showCard = useSelector(state => state.app.showCard);
  return (
    <React.Fragment>
      <Paper style={tableStyle}>
        <Container type='TABLE' visible={showCard} cards={table} />
      </Paper>
      <Paper style={handStyle}>
        <Container type='HAND' cards={hand} />
      </Paper>
    </React.Fragment>
  );
}
