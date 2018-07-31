import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSettings } from '../reducers/optionsReducer';
import { updateOptions } from '../actions/optionsActions';

const BooleanSetting = ({ settings, name, onUpdate = () => {}, ...rest }) => (
    <input {...rest} type="checkbox" checked={settings[name]} onChange={e => onUpdate(Object.assign({}, settings, {[name]: e.target.checked}))} />
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
                    <label htmlFor="displayPreview">Display preview:</label>
                    <BooleanSetting id="displayPreview" settings={settings} name="displayPreview" onUpdate={newSettings => updateSettings(newSettings)} />
                </span>
            </div>
        )        
    }
}

export default connect(
    Settings.mapStateToProps,
    Settings.mapDispatchToProps
)(Settings);