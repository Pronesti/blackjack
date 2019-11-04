import appReducer from './appReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    app: appReducer
  });

  export default allReducers;