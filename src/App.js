import React, { Component } from 'react';
import {
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import thunk from 'redux-thunk';
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';
import { connectRouter, routerMiddleware, ConnectedRouter as Router, push } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension';
import primary from '@material-ui/core/colors/green';
import secondary from '@material-ui/core/colors/orange';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './Layout/Layout';
import { getAllItems } from './reducers/itemReducer';
import { triggerAddItem } from './actions/itemActions';
import { guid } from './utils/guid';
import LoadDialog from './dialogs/LoadDialog';
import SaveDialog from './dialogs/SaveDialog';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { persistToStorage, getPreloadedState } from './persist';

const history = createBrowserHistory();

const store = createStore(
  connectRouter(history)(rootReducer),
  getPreloadedState() || {},
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      persistToStorage
    )
  )
);

const theme = createMuiTheme({
  palette: {
    primary: {
      ...primary,
      contrastText: 'white'
    },
    secondary: {
      ...secondary,
      contrastText: 'white'
    },
    contrastThreshold: 3
  }
});

console.log(theme)

class AppComponent extends Component {
  static mapStateToProps(state) {
    return {
      items: getAllItems(state.items)
    };
  }

  componentWillMount() {
    const { items, dispatch } = this.props
    if (items.length === 0) {
      const id = guid();
      dispatch(triggerAddItem({
        id: id,
        title: 'Hello world!',
        content: 'Hello world! This is an example entry',
        tags: [],
        date: ''
      }));
      dispatch(push(`/items/${id}`));
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Route exact path="/" render={() => (
            <Redirect to="/items" />
          )} />
          <Route path="/items/:id?" render={(props) => {
            return (<div>
              <Layout />
            </div>)
          }} />
        </div>
        <SaveDialog />
        <LoadDialog />
      </MuiThemeProvider>
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