import { combineReducers } from 'redux';

import authentication from './authentication';
import entities from './entities';
import nav from './navigation';
import pages from './pages';

const reducers = combineReducers({
  authentication,
  nav,
  entities,
  pages
});

export default reducers;
