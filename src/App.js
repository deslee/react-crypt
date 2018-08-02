import React, { Component } from 'react';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer, { persistState } from './reducers';
import { connectRouter, routerMiddleware, ConnectedRouter as Router } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './Layout/Layout';
import { getAllItems } from './reducers/itemReducer';
import { triggerAddItem } from './actions/itemActions';
import { guid } from './utils/guid';

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

class AppComponent extends Component {
  static mapStateToProps(state) {
    return {
      items: getAllItems(state.items)
    };
  }

  componentWillMount() {
    const { items, dispatch } = this.props
    if (items.length === 0) {
      dispatch(triggerAddItem({
        id: guid(),
        title: 'Hello world!',
        content: 'Hello world! This is an example entry',
        tags: [],
        date: ''
      }))
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/items" />
          )} />
          <Route path="/items" render={(props) => {
            return (<div>
              <Layout />
            </div>)
          }} />
        </div>
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