import React, { Component } from 'react';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import { parse as qs } from 'query-string';
import Layout from './Layout';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer, { persistState } from './reducers';
import { connectRouter, routerMiddleware, ConnectedRouter as Router } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { isInitialized, isDecrypted } from './reducers/startupReducer';
import Load from './SaveAndLoad/Load';

export const STATE_STORAGE_KEY = 'STATE_STORAGE_KEY';
const history = createBrowserHistory();

var preloadedState = {}
const preloadedStateJson = sessionStorage.getItem(STATE_STORAGE_KEY);
if (preloadedStateJson && preloadedStateJson.length) {
  try {
    preloadedState = JSON.parse(preloadedStateJson);
  } catch (e) {
    console.error(e);
  }
}

const store = createStore(
  connectRouter(history)(rootReducer),
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      persistToStorage
    )
  )
);

function persistToStorage({ getState }) {
  return next => action => {
    const returnValue = next(action);
    var persistedState = JSON.stringify(
      persistState(getState())
    )
    sessionStorage.setItem(STATE_STORAGE_KEY, persistedState)
    return returnValue;
  }
}

export function clearStorage() {
  sessionStorage.removeItem(STATE_STORAGE_KEY);
}

const Initialize = () => (
  <div>
    <Redirect to="/" />
    <Load />
  </div>
);

class AppComponent extends Component {
  static mapStateToProps(state) {
    return {
      initialized: isInitialized(state.startup),
      decrypted: isDecrypted(state.startup)
    };
  }

  render() {
    const { initialized, decrypted } = this.props;

    return (
      <div>
        { !initialized && <Initialize /> }
        { initialized && decrypted && <div>
          <Route exact path="/" render={() => (
            <Redirect to="/items" />
          )} />
          <Route path="/items/:id?" render={(props) => {
            let {
              match: {
                params: { id: itemId }
              },
              location: { search },
            } = props;

            search = qs(search);

            return (<div>
              <Layout
                selectedItemId={itemId}
                isEditingSelectedItem={search.editing}
              />
            </div>)
          }} />
        </div>}
      </div>  
    )
  }
}

const AppContainer = withRouter(connect(
  AppComponent.mapStateToProps
)(AppComponent));

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <AppContainer />
    </Router>
  </Provider>
);