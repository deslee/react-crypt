import { combineReducers } from 'redux'
import itemReducer from './itemReducer';
import optionsReducer from './optionsReducer';
import startupReducer from './startupReducer';

export default combineReducers({
    items: itemReducer,
    options: optionsReducer,
    startup: startupReducer
});

export const persistState = state =>
    (
        ({
            items, options, startup
        }) =>
            ({
                items, options, startup
            })
    )(state)