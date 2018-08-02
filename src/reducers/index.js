import { combineReducers } from 'redux'
import itemReducer from './itemReducer';
import optionsReducer from './optionsReducer';
import uiReducer from './uiReducer';
import startupReducer from './startupReducer';

export default combineReducers({
    items: itemReducer,
    options: optionsReducer,
    ui: uiReducer,
    startup: startupReducer
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