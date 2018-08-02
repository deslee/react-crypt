import { UPDATE_UI } from "../actions/uiActions";

const initialState = {
};

export default function uiReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_UI:
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state;
    }
}