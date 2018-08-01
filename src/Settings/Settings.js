import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSettings } from '../reducers/optionsReducer';
import { updateOptions } from '../actions/optionsActions';
import { FormControlLabel, Switch } from '@material-ui/core';

const BooleanSetting = ({ settings, name, onUpdate = () => {} }) => (
                <FormControlLabel control={
                    <Switch 
                        checked={settings[name]}
                        onChange={e => onUpdate(Object.assign({}, settings, {[name]: e.target.checked}))}
                    />
                } label="Display Preview" />
);

class Settings extends Component {
    static mapStateToProps(state) {
        return {
            settings: getSettings(state.options)
        }
    }
    static mapDispatchToProps(dispatch) {
        return {
            updateSettings: (settings) => dispatch(updateOptions(settings))
        }
    }

    render() {
        const { settings, updateSettings } = this.props;
        return (
            <div>
                <span>
                    <BooleanSetting settings={settings} name="displayPreview" onUpdate={newSettings => updateSettings(newSettings)} />
                </span>
            </div>
        )        
    }
}

export default connect(
    Settings.mapStateToProps,
    Settings.mapDispatchToProps
)(Settings);