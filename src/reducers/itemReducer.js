import { TRIGGER_SAVE_ITEM, TRIGGER_DELETE_ITEM, TRIGGER_ADD_ITEM } from '../actions/itemActions';
import { REHYDRATE_STATE } from '../actions/optionsActions'

const initialState = {
    allItems: [
    ]
}

export default function itemReducer(state = initialState, action) {
    switch(action.type) {
        case TRIGGER_ADD_ITEM:
            return {
                ...state,
                allItems: [
                    action.payload,
                    ...state.allItems
                ]
            }
        case TRIGGER_SAVE_ITEM:
            return {
                ...state,
                allItems: state.allItems.map(item => item.id === action.payload.id ? Object.assign({}, item, action.payload) : item)
            }
        case TRIGGER_DELETE_ITEM:
            return {
                ...state,
                allItems: state.allItems.filter(item => item.id !== action.payload.id)
            }
        case REHYDRATE_STATE:
            return {
                ...action.payload.items
            }
        default:
            return state;
    }
}

export const getAllItems = (itemState) => itemState.allItems;