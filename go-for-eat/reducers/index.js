import { combineReducers } from 'redux';

import authentication from './authentication';
import entities from './entities';
import nav from './navigation';
import pages from './pages';
import error from './error';

const reducers = combineReducers({
  authentication,
  nav,
  entities,
  pages,
  error
});

export default reducers;
