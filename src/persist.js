import { persistState } from "./reducers";

export const STATE_STORAGE_KEY = 'STATE_STORAGE_KEY';

export function persistToStorage({ getState }) {
  return next => action => {
    const returnValue = next(action);
    var persistedState = JSON.stringify(
      persistState(getState())
    )
    sessionStorage.setItem(STATE_STORAGE_KEY, persistedState)
    return returnValue;
  }
}


export function getPreloadedState() {
    var preloadedState = undefined;
    const preloadedStateJson = sessionStorage.getItem(STATE_STORAGE_KEY);
    if (preloadedStateJson && preloadedStateJson.length) {
        try {
            preloadedState = JSON.parse(preloadedStateJson);
        } catch (e) {
            console.error(e);
        }
    }
    return preloadedState;
}

export function clearStorage() {
  sessionStorage.removeItem(STATE_STORAGE_KEY);
}
