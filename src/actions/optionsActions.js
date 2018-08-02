import { createAction } from './';

export const UPDATE_OPTIONS = 'UPDATE_OPTIONS';
export const updateOptions = createAction(UPDATE_OPTIONS);
export const REHYDRATE_STATE = 'REHYDRATE_STATE';
export const rehydrateState = createAction(REHYDRATE_STATE);