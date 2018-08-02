import { UPDATE_OPTIONS, REHYDRATE_STATE } from "../actions/optionsActions";

const initialState = {
    settings: {
        displayPreview: true
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
        default:
            return state;
    }
}

export const getSettings = state => state.settings;