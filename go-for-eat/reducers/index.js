import { combineReducers } from 'redux';

import authentication from './authentication';
import entities from './entities';
import nav from './navigation';

const reducers = combineReducers({
  authentication,
  nav,
  entities,
});

export default reducers;
