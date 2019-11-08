import React from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import CreditsIcon from '@material-ui/icons/MonetizationOn';

export default function TopBar() {
  const credits = useSelector(state => state.app.app.credits);
  return (
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
          <IconButton aria-label={`You have got ${credits} credits`} color='inherit'>
            <Badge badgeContent={credits} color='secondary'>
              <CreditsIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
