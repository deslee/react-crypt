import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import NewItemIcon from '@material-ui/icons/NoteAdd';
import { getSettings } from '../reducers/optionsReducer';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import { triggerAddItem, triggerDeleteItem } from '../actions/itemActions';
import { withStyles } from '@material-ui/core/styles';
import { guid } from '../utils/guid';
import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import FolderIcon from '@material-ui/icons/Folder';
import EditIcon from '@material-ui/icons/Edit';
import { updateUi } from '../actions/uiActions';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column'
    },
    newItemIcon: {
        color: blueGrey[400]
    },
    itemList: {
        flexGrow: 1,
        overflowY: 'auto'
    },
    options: {
    },
    optionsButton: {
        flex: 1,
        textAlign: 'center'
    },
    mainListItem: {
        maxHeight: '68px',
    },
    mainListItemSelected: {
        '&:hover': {
            background: grey[200]
        },
        background: grey[200]
    },
})

class ListComponent extends Component {

    state = {
        isEditing: false,
        itemsBeingEdited: {

        }
    }

    static mapStateToProps(state) {
        return {
            settings: getSettings(state.options)
        }
    }

    addItem() {
        const { dispatch, onItemAdded = () => { } } = this.props;
        dispatch(triggerAddItem({
            id: guid(),
            title: 'Untitled',
            content: 'Hello world! This is an example entry',
            tags: [],
            date: ''
        }))
        onItemAdded();
    }

    itemSelected(id) {
        const { onItemSelected = () => { } } = this.props;
        onItemSelected(id);
    }

    toggleEdit = id => {
        this.setState(state => ({
            ...state,
            itemsBeingEdited: {
                ...state.itemsBeingEdited,
                [id]: state.itemsBeingEdited[id] ? false : true
            }
        }))
    }

    toggleEditing = () => {
        this.setState(state => ({
            ...state,
            isEditing: !state.isEditing,
            itemsBeingEdited: {}
        }))
    }

    showDialog(dialog) {
        this.props.dispatch(updateUi({
            [dialog]: true
        }))
    }

    deleteSelected = () => {
        const { 
            items,
            dispatch
        } = this.props;
        const {
            itemsBeingEdited
        } = this.state;
        const idsToDelete = Object.keys(itemsBeingEdited).filter(id => itemsBeingEdited[id]);
        const itemsToDelete = items.filter(i => idsToDelete.indexOf(i.id) !== -1);
        itemsToDelete.forEach(item => {
            dispatch(triggerDeleteItem(item))
        })
    }

    render() {
        const {
            items,
            settings,
            classes,
            style,
            selectedItemId
        } = this.props;

        const {
            isEditing,
            itemsBeingEdited
        } = this.state;

        return (
            <List className={classes.root} style={style}>
                <ListItem
                    button
                    onClick={() => this.addItem()}
                >
                    <NewItemIcon className={classes.newItemIcon} />
                    <ListItemText primary="New Item" />
                </ListItem>
                <Divider />
                <div className={classes.itemList}>
                    {items.map(({ id, title = "", content = "" }) => {
                        const preview = content;

                        return (
                            <ListItem
                                key={id}
                                className={classes.mainListItem + (!isEditing && selectedItemId === id ? ` ${classes.mainListItemSelected}` : '')}
                                component={isEditing ? undefined : Link}
                                replace={isEditing ? undefined : selectedItemId !== undefined}
                                to={`/items/${id}`}
                                onClick={() => isEditing ? this.toggleEdit(id) : this.itemSelected(id)}
                                button
                            >
                                { isEditing && <Checkbox
                                    checked={Boolean(itemsBeingEdited[id])}
                                    disableRipple
                                /> }
                                <ListItemText secondaryTypographyProps={{style: {overflow: 'hidden', maxHeight: '1rem'}}} primary={title} secondary={settings.displayPreview && preview} />
                            </ListItem>
                        )
                    })}
                </div>
                <ListItem className={classes.options}>
                    {
                        (isEditing ? [
                            <div key="Save" className={classes.optionsButton}>
                                <IconButton aria-label="Save" onClick={() => this.deleteSelected()}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>,
                            <div key="Cancel" className={classes.optionsButton}>
                                <IconButton aria-label="Cancel" onClick={() => this.toggleEditing()}>
                                    <CancelIcon />
                                </IconButton>
                            </div>
                        ] : [
                            <div key="Save" className={classes.optionsButton}>
                                <IconButton aria-label="Save" onClick={() => this.showDialog('saveDialog')}>
                                    <SaveIcon />
                                </IconButton>
                            </div>,
                            <div key="Load" className={classes.optionsButton}>
                                <IconButton aria-label="Load" onClick={() => this.showDialog('loadDialog')}>
                                    <FolderIcon />
                                </IconButton>
                            </div>,
                            <div key="Edit" className={classes.optionsButton}>
                                <IconButton aria-label="Edit" onClick={() => this.toggleEditing()}>
                                    <EditIcon />
                                </IconButton>
                            </div>
                        ])
                    }
                </ListItem>
            </List>
        )
    }
}

export default connect(ListComponent.mapStateToProps)(withStyles(styles)(ListComponent))