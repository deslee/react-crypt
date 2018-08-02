import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import { withStyles } from '@material-ui/core/styles';
import { getAllItems } from '../reducers/itemReducer';
import { push } from 'connected-react-router';
import { triggerSaveItem, triggerDeleteItem } from '../actions/itemActions';

class Display extends Component {
    static styles = theme => ({
        root: {

        },
        editButton: {
            position: 'absolute',
            bottom: theme.spacing.unit * 4,
            right: theme.spacing.unit * 4
        },
        content: {
            ...theme.typography.body1
        }
    })

    render() {
        const { item = {}, onEdit, classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant="display2" gutterBottom>{item.title}</Typography>
                <ReactMarkdown className={classes.content} source={item.content} />
                <Button className={classes.editButton} onClick={() => onEdit()} variant="fab" aria-label="Edit" color="secondary"><Icon>edit_icon</Icon></Button>
            </div>
        );
    }
} 

Display = withStyles(Display.styles)(Display);

class Edit extends Component {
    static styles = theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        contentTextArea: {
            flex: 1
        },
        deleteButton: {
            float: 'right'
        }
    })

    changed(data) {
        const { item: { id, title, content, tags, date }, onSave } = this.props
        
        onSave({
            id,
            title,
            content,
            tags,
            date,
            ...data
        })
    }

    render() {
        const { item = {}, onDelete, onSaveClicked, classes } = this.props
        return (
            <div className={classes.root}>
                <TextField
                    label="Title"
                    value={item.title}
                    style = {{width: '100%'}}
                    onChange={e => this.changed({title: e.target.value})}
                    margin="normal"
                />
                <TextField
                    label="Content"
                    multiline
                    className={classes.contentTextArea}
                    value={item.content}
                    style = {{width: '100%'}}
                    onChange={e => this.changed({content: e.target.value})}
                    margin="normal"
                />
                <div className={classes.buttons}>
                    <Button className={classes.saveButton} onClick={() => onSaveClicked()} variant="contained" color="primary">Save</Button>&nbsp;
                    <Button className={classes.deleteButton} onClick={() => onDelete()} variant="contained" color="secondary">Delete</Button>
                </div>
            </div>
        );
    }
}

Edit = withStyles(Edit.styles)(Edit);

class Item extends Component {

    static styles = theme => ({
        root: {
            paddingRight: theme.spacing.unit * 2,
            height: '100%'
        }
    })

    state = {
        editing: false
    }

    static mapStateToProps(state) {
        return {
            items: getAllItems(state.items)
        }
    }

    getItem() {
        const {
            items = [],
            itemId: id
        } = this.props;
        return items.find(i => i.id === id);
    }

    componentWillMount() {
        const item = this.getItem();
        if (!item) {
            // go back
            this.goBack()
        }
    }

    goBack() {
        const {
            dispatch
        } = this.props;
        dispatch(push('../'))
    }

    onEditClicked() {
        this.setState({
            editing: true
        })
    }

    onSaveClicked() {
        this.setState({
            editing: false
        })
    }

    save(data) {
        this.props.dispatch(triggerSaveItem(data))
    }

    delete(item) {
        this.props.dispatch(triggerDeleteItem(item))
        this.goBack();
    }

    render() {
        const {
            classes,
            ...rest
        } = this.props;

        const {
            editing
        } = this.state;

        const item = this.getItem();

        return (
            <div className={classes.root}>
                {editing ?
                    <Edit {...rest} item={item} onSave={(data) => this.save(data)} onDelete={() => this.delete(item)} onSaveClicked={() => this.onSaveClicked()} /> :
                    <Display {...rest} item={item} onEdit={() => this.onEditClicked()} />
                }
            </div>
        );
    }
}

export default connect(Item.mapStateToProps)(withStyles(Item.styles)(Item));