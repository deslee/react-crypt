import { combineReducers } from 'redux'
import itemReducer from './itemReducer';
import optionsReducer from './optionsReducer';

export default combineReducers({
    items: itemReducer,
    options: optionsReducer
});