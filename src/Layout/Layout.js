import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '../List/List';
import Item from '../Item/Item';
import { getAllItems } from '../reducers/itemReducer';
import { push } from 'connected-react-router';
import AppMenu from './AppMenu';

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const drawerWidth = 300;

class Start extends Component {
  static style = theme => ({
    root: {
      textAlign: 'center',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  })

  render() {
    const {
      classes
    } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="display2" gutterBottom>No Item Selected</Typography>
        <Typography>Select an item from the menu or create a new item.</Typography>
      </div>
    )
  }
}

Start = withStyles(Start.style)(Start);

class Layout extends Component {
  static styles = theme => ({
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
    },
    appBar: {
      position: 'absolute',
      [theme.breakpoints.up('md')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      [theme.breakpoints.up('md')]: {
        position: 'relative'
      }
    },
    content: {
      height: '100vh',
      flexGrow: 1,
      overflowY: 'auto',
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      display: 'flex',
      flexDirection: 'column'
    },
    flex: {
      flexGrow: 1
    },
    searchField: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    drawer: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column'
    },
    innerContent: {
      flex: 1
    }
  })
  state = {
    mobileOpen: false,
    searchField: ''
  }

  static mapStateToProps(state) {
    return {
      items: getAllItems(state.items)
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      dispatch: dispatch
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  searchChanged = (searchText) => {
    this.setState({searchField: searchText})
  }

  onItemAdded = (id) => {
    const {
      dispatch
    } = this.props;

    this.handleDrawerToggle();
    dispatch(push(`/items/${id}`));
  }

  getFilteredItems = () => {
    const {
      items
    } = this.props;

    const {
      searchField
    } = this.state;

    return items.filter(i => {
      return (i.title.toLowerCase() + i.content.toLowerCase()).indexOf(searchField.toLowerCase()) !== -1
    })
  }

  render() {
    const {
      classes,
      match: { params: { id: itemId }}
    } = this.props;

    const drawer = (
      <div className={classes.drawer}>
        <div 
          className={classes.searchField}
        >
          <TextField
            style={{ width: '100%' }}
            label="Search"
            margin="normal"
            value={this.state.searchField}
            onChange={e => this.searchChanged(e.target.value)}
          />
        </div>
        <List
          style={{flexGrow: 1}}
          onItemAdded={this.onItemAdded}
          onItemSelected={() => this.handleDrawerToggle()}
          items={this.getFilteredItems()}
          selectedItemId={itemId}
        />
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              MicroJournal
            </Typography>
            <AppMenu />
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onOpen={this.handleDrawerToggle}
            onClose={this.handleDrawerToggle}
            disableBackdropTransition={!iOS} 
            disableDiscovery={iOS} 
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.innerContent} >
            { itemId ? <Item itemId={itemId} /> : <Start /> }
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(connect(
  Layout.mapStateToProps,
  Layout.mapDispatchToProps
)(withStyles(Layout.styles)(Layout)));