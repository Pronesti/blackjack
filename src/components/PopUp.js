import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showMsg } from '../actions/gameActions';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

export default function PopUp() {
  const msg = useSelector(state => state.app.msg);
  const show_Msg = useSelector(state => state.app.show_msg);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(showMsg(false));
  };
  return (
    <Snackbar open={show_Msg} onClose={handleClose}>
      <SnackbarContent
        message={
          <span>
            <Icon />
            {msg}
          </span>
        }
        action={[
          <IconButton key='close' aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}
