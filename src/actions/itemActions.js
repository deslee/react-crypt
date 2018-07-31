import { createAction } from './';
import { push } from 'connected-react-router'

export const TRIGGER_SAVE_ITEM = 'TRIGGER_SAVE_ITEM';
export const triggerSaveItem = createAction(TRIGGER_SAVE_ITEM);
export const TRIGGER_DELETE_ITEM = 'TRIGGER_DELETE_ITEM';
export const triggerDeleteItem = createAction(TRIGGER_DELETE_ITEM);
export const TRIGGER_ADD_ITEM = 'TRIGGER_ADD_ITEM';
export const triggerAddItem = (payload) => {
    return dispatch => {
        dispatch({
            type: TRIGGER_ADD_ITEM,
            payload
        })
        dispatch(push(`/items/${payload.id}?editing`))
    }
}