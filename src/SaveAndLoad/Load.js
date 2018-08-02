import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decrypt } from '../utils/crypto';
import { createNewJournal, rehydrateState, updatePassword } from '../actions/startupActions';
import { getPassword } from '../reducers/startupReducer';

class Load extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            fileContents: ''
        };
    }

    static mapStateToProps(state) {
        return {
            password: getPassword(state.startup)
        }
    }

    createNew() {
        this.props.dispatch(createNewJournal());
    }

    loadFile(files) {
        this.hideError();
        if (files.length < 1) {
            this.showError('Invalid file');
            return;
        } 
        const file = files[0];
        const reader = new FileReader();
        reader.onload = e => {
            if (reader.readyState !== 2) {
                return;
            }

            try {
                const fileContents = reader.result;
                JSON.parse(fileContents);
                this.setState({
                    fileContents: fileContents
                });
            } catch(e) {
                this.showError('Invalid file');
            }
        };
        reader.readAsText(file);
    }

    loadState() {
        this.hideError();
        const { fileContents } = this.state
        const { password } = this.props
        
        try {
            const decrypted = decrypt(password, fileContents);
            this.props.dispatch(rehydrateState(decrypted));
        } catch(e) {
            if (e && e.message && e.message === "ccm: tag doesn't match") {
                this.showError('Wrong password')
            } else if (e && e.message && e.message === "json decode: this isn't json!") {
                this.showError('Invalid file')
            }
        }
    }

    showError(message) {
        this.setState({
            errorMessage: message
        });
    }

    hideError() {
        this.setState({
            errorMessage: ''
        })
    }

    render() {
        return (
            <div>
                <button onClick={e => this.createNew()}>Create new</button><br />
                <input type="file" onChange={e => this.loadFile(e.target.files)} /><br />
                <input type="password" onChange={e => this.props.dispatch(updatePassword(e.target.value))} /><br />
                <button onClick={e => this.loadState()}>Load</button><br />
                <span>{this.state.errorMessage}</span>
            </div>
        )
    }
}

export default connect(Load.mapStateToProps)(Load);