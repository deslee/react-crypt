import { CREATE_NEW_JOURNAL, REHYDRATE_STATE, RESET, UPDATE_PASSWORD } from "../actions/startupActions";

const initialState = {
    journalInitialized: false,
    journalDecrypted: false,
    password: ''
}

export default function startupReducer(state = initialState, action) {
    switch(action.type) {
        case REHYDRATE_STATE: 
        case CREATE_NEW_JOURNAL:
            return {
                ...state,
                journalInitialized: true,
                journalDecrypted: true
            }
        case RESET:
            return initialState
        case UPDATE_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        default:
            return state;
    }
}

export const isInitialized = state => state.journalInitialized;
export const isDecrypted = state => state.journalDecrypted;
export const getPassword = state => state.password;