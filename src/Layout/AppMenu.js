import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVert from '@material-ui/icons/MoreVert';
import { updateUi } from '../actions/uiActions';
import SaveDialog from '../dialogs/SaveDialog';
import LoadDialog from '../dialogs/LoadDialog';

class AppMenu extends Component {

    state = {
        anchorEl: null
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
    }

    updateUI = (ui) => {
        this.props.dispatch(updateUi(ui));
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                  <MenuItem onClick={() => {this.handleClose(); this.updateUI({saveDialog: true})}}>Save</MenuItem>
                  <MenuItem onClick={() => {this.handleClose(); this.updateUI({loadDialog: true})}}>Load</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default connect()(AppMenu);