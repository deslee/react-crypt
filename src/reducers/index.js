import { combineReducers } from 'redux'
import itemReducer from './itemReducer';
import optionsReducer from './optionsReducer';
import uiReducer from './uiReducer';

export default combineReducers({
    items: itemReducer,
    options: optionsReducer,
    ui: uiReducer
});

export const persistState = state =>
    (
        ({
            items, options
        }) =>
            ({
                items, options
            })
    )(state)