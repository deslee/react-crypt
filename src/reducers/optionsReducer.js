import { UPDATE_OPTIONS } from "../actions/optionsActions";
import { REHYDRATE_STATE, RESET } from '../actions/startupActions'

const initialState = {
    settings: {
        displayPreview: false
    }
}

export default function optionsReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_OPTIONS:
            return {
                ...state,
                settings: action.payload
            }
        case REHYDRATE_STATE:
            return {
                ...action.payload.options
            }
        case RESET:
            return initialState
        default:
            return state;
    }
}

export const getSettings = state => state.settings;