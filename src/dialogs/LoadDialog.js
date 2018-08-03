import React from 'react';
import { connect } from 'react-redux';
import { decrypt } from '../utils/crypto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import { updateUi } from '../actions/uiActions';
import { rehydrateState } from '../actions/optionsActions';

const styles = {
    errorMessage: {
        color: red[500]
    },
    actualFileInput: {
        display: 'none'
    },
    fileName: {
        margin: '1rem 0'
    }
}

class LoadDialog extends React.Component {
    state = {
        fileContents: '',
        fileName: '',
        errorMessage: '',
        password: ''
    }

    static mapStateToProps(state) {
        return {
            open: state.ui.loadDialog
        }
    }

    handleClose = () => {
        this.props.dispatch(updateUi({ loadDialog: false }))
    }

    onSubmit = () => {
        this.loadState();
    }

    passwordChange = (password) => {
        this.setState({
            password: password
        })
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
                    fileName: file.name,
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
        const { fileContents, password } = this.state
        
        try {
            const decrypted = decrypt(password, fileContents);
            this.props.dispatch(rehydrateState(decrypted));
            this.handleClose();
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
        const { open = false, classes } = this.props;
        const { fileName, errorMessage, password } = this.state;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={() => this.handleClose()}
                    aria-labelledby="load-dialog-title"
                >
                    <DialogTitle id="load-dialog-title">Load</DialogTitle>
                    <form onSubmit={(e) => {e.preventDefault(); this.onSubmit()}}>
                        <DialogContent>
                            <DialogContentText>
                                Load a previously saved journal<br />
                                <span className={classes.errorMessage}>{errorMessage}</span>
                            </DialogContentText>
                            <input className={classes.actualFileInput} id="load-dialog-file-input" name="load-dialog-file-input" type="file" onChange={e => this.loadFile(e.target.files)} />
                            <label htmlFor="load-dialog-file-input">
                                <Button variant="raised" component="span">
                                    Select a file
                                </Button>
                            </label>
                            <Typography className={classes.fileName}>{fileName}</Typography>
                            <br />
                            <TextField
                                autoFocus
                                margin="dense"
                                required={true}
                                id="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={e => this.passwordChange(e.target.value)}
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => this.handleClose()} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

export default connect(LoadDialog.mapStateToProps)(withStyles(styles)(LoadDialog));