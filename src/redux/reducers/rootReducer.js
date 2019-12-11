import volunteersReducer from './volunteersReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  volunteers: volunteersReducer
});

export default rootReducer;
