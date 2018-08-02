import React, { Component } from 'react';
import { withRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppMenu from './AppMenu';
import List from '../List/List';
import Item from '../Item/Item';
import { Drawer, TextField } from '@material-ui/core';

const drawerWidth = 300;

const styles = theme => ({
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  flex: {
    flexGrow: 1
  },
  searchField: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  drawer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }
})

class Layout extends Component {
  state = {
    mobileOpen: false
  }

  static mapStateToProps(state) {
    return {
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
    }
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }))
  }

  render() {
    const {
      classes,
      match
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
          />
        </div>
        <List
          style={{flexGrow: 1}}
          onItemAdded={() => this.handleDrawerToggle()}
          onItemSelected={() => this.handleDrawerToggle()}
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
              My App
              </Typography>
            <AppMenu />
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
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
          <Route path={`${match.url}/:id`} component={Item} />
        </main>
      </div>
    );
  }
}

export default withRouter(connect(
  Layout.mapStateToProps,
  Layout.mapDispatchToProps
)(withStyles(styles)(Layout)));