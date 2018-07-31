import React, { Component } from 'react';
import { connect } from 'react-redux';
import { encrypt, decrypt } from '../utils/crypto';
import { rehydrateState } from '../actions/optionsActions';

class SaveAndLoad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        }
    }
    static mapStateToProps(state) {
        return {
            stateToSave: ((({
                items,
                options
            }) => ({
                items,
                options
            })))(state)
        }
    }
    static mapDispatchToProps(dispatch) {
        return {
            rehydrate: state => dispatch(rehydrateState(state))
        }
    }

    downloadState() {
        const { stateToSave } = this.props;
        const { password } = this.state;
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

    loadState(files) {
        const { password } = this.state;
        const { rehydrate } = this.props;

        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = e => reader.readyState === 2 && rehydrate(decrypt(password, reader.result));
            reader.readAsText(file);
        }
    }

    render() {
        return (
            <div>
                <label>password</label><input type="password" value={this.state.password} onChange={e => this.setState({password: e.target.value})} />
                <button onClick={() => this.downloadState()}>Save</button>
                <input type="file" onChange={e => this.loadState(e.target.files)} />
            </div>
        )
    }
}

export default connect(SaveAndLoad.mapStateToProps, SaveAndLoad.mapDispatchToProps)(SaveAndLoad);