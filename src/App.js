import React, { Component } from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom'
import { parse as qs } from 'query-string';
import Layout from './Layout';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import { connectRouter, routerMiddleware, ConnectedRouter as Router } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const history = createBrowserHistory();
const preloadedState = {};
const store = createStore(
  connectRouter(history)(rootReducer),
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            {/* Redirect to items */}
            <Route exact path="/" render={() => (
              <Redirect to="/items" />
            )} />

            <Route path="/items/:id?/" render={(props) => {
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
            }}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
