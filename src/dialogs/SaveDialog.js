import React from 'react';
import { connect } from 'react-redux';
import { encrypt } from '../utils/crypto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { updateUi } from '../actions/uiActions';
import { persistState } from '../reducers';

class SaveDialog extends React.Component {
    state = {
        filename: 'journal.json',
        password: ''
    }

    static mapStateToProps(state) {
        return {
            stateToSave: persistState(state),
            open: state.ui.saveDialog
        }
    }

    handleClose = () => {
        this.props.dispatch(updateUi({ saveDialog: false }))
    }

    onSubmit = () => {
        this.downloadState();
        this.handleClose();
    }

    downloadState() {
        const { stateToSave } = this.props;
        const { filename, password } = this.state;
        const parts = [encrypt(password, stateToSave)]
        const file = new Blob(parts, {type: 'text/plain'});
        const url = URL.createObjectURL(file);
        var link = document.createElement( 'a' );
        link.setAttribute( 'href', url );
        link.setAttribute( 'download', filename );
        document.body.appendChild(link);
        link.click();
        setTimeout(function() {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }

    filenameChange = (filename) => {
        this.setState({
            filename: filename
        })
    }

    passwordChange = (password) => {
        this.setState({
            password: password
        })
    }

    render() {
        const { open = false } = this.props;
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={() => this.handleClose()}
                    aria-labelledby="save-dialog-title"
                >
                    <DialogTitle id="save-dialog-title">Save</DialogTitle>
                    <form onSubmit={(e) => {e.preventDefault(); this.onSubmit()}}>
                        <DialogContent>
                            <DialogContentText>
                                Save your entire journal in an encrypted file
                            </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    required={true}
                                    id="filename"
                                    label="Filename"
                                    type="text"
                                    fullWidth
                                    value={this.state.filename}
                                    onChange={e => this.filenameChange(e.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    required={true}
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={this.state.password}
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

export default connect(SaveDialog.mapStateToProps)(SaveDialog);