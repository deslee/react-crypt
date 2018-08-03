import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Switch from '@material-ui/core/Switch'
import MoreVert from '@material-ui/icons/MoreVert';
import { updateUi } from '../actions/uiActions';
import { getSettings } from '../reducers/optionsReducer';
import { updateOptions } from '../actions/optionsActions';

class AppMenu extends Component {

    static mapStateToProps(state) {
        return {
            settings: getSettings(state.options)
        }
    }

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

    toggleSetting = setting => {
        const { dispatch, settings } = this.props;
        const newValue = !settings[setting];
        dispatch(updateOptions({
            [setting]: newValue
        }))
    }

    render() {
        const { settings } = this.props;
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
                <MenuItem onClick={() => this.toggleSetting('displayPreview')}><Switch checked={settings.displayPreview} /> Display Preview</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default connect(AppMenu.mapStateToProps)(AppMenu);