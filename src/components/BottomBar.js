import React from 'react';
import { useSelector } from 'react-redux';
import ReplayIcon from '@material-ui/icons/Replay';
import TouchIcon from '@material-ui/icons/TouchApp';
import BeenHereIcon from '@material-ui/icons/Beenhere';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const bottomStyle = {
  width: '100%',
  position: 'fixed',
  bottom: 0
};

export default function BottomBar({ hitMe, stay, restartGame }) {
  const isStay = useSelector(state => state.app.gameStatus.stay);
  const finishGame = useSelector(state => state.app.gameStatus.finishGame);
  const credits = useSelector(state => state.app.app.credits);
  return (
    <BottomNavigation showLabels style={bottomStyle}>
      <BottomNavigationAction label='Hit' disabled={isStay || finishGame} onClick={hitMe} icon={<TouchIcon />} />
      <BottomNavigationAction label='Stand' disabled={isStay || finishGame} onClick={stay} icon={<BeenHereIcon />} />
      <BottomNavigationAction label='Restart' onClick={restartGame} disabled={credits < 1} icon={<ReplayIcon />} />
    </BottomNavigation>
  );
}
