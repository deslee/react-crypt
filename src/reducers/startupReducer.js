import { CREATE_NEW_JOURNAL, REHYDRATE_STATE, RESET } from "../actions/startupActions";

const initialState = {
}

export default function startupReducer(state = initialState, action) {
    switch(action.type) {
        case REHYDRATE_STATE: 
        case CREATE_NEW_JOURNAL:
            return {
                ...state,
            }
        case RESET:
            return initialState
        default:
            return state;
    }
}