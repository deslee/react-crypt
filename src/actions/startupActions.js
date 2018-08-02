import { createAction } from ".";
import { guid } from "../utils/guid";
import { clearStorage } from "../App";


export const RESET = 'RESET';
export const reset = () => dispatch => {
    dispatch({
        type: RESET
    })
    clearStorage();
};
export const REHYDRATE_STATE = 'REHYDRATE_STATE';
export const rehydrateState = createAction(REHYDRATE_STATE);
export const CREATE_NEW_JOURNAL = 'CREATE_NEW_JOURNAL';
export const createNewJournal = () => dispatch => {
    const firstEntryId = guid();
    dispatch({
        type: CREATE_NEW_JOURNAL,
        payload: [
            {
                id: firstEntryId,
                title: 'Hello World!',
                tags: ['first entry'],
                date: '',
                content: '**Hi there** \n \n Hi there Hi there Hi there'
            }
        ]
    })
}