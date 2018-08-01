import React, { Component } from 'react';
import { connect } from 'react-redux';
import { encrypt } from '../utils/crypto';
import { persistState } from '../reducers';
import { updatePassword } from '../actions/startupActions';
import { getPassword } from '../reducers/startupReducer';

class Save extends Component {
    static mapStateToProps(state) {
        return {
            stateToSave: persistState(state),
            password: getPassword(state.startup)
        }
    }
    downloadState() {
        const { stateToSave, password } = this.props;
        console.log(stateToSave, password)
        const parts = [encrypt(password, stateToSave)]
        const file = new Blob(parts, {type: 'text/plain'});
        const url = URL.createObjectURL(file);
        var link = document.createElement( 'a' );
        link.setAttribute( 'href', url );
        link.setAttribute( 'download', 'data.json' );
        document.body.appendChild(link);
        link.click();
        setTimeout(function() {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }

    render() {
        return (
            <div>
                <label>password</label><input type="password" value={this.props.password} onChange={e => this.props.dispatch(updatePassword(e.target.value))} />
                <button onClick={() => this.downloadState()}>Save</button>
            </div>
        )
    }
}

export default connect(Save.mapStateToProps)(Save);