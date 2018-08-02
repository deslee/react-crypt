import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NewItemIcon from '@material-ui/icons/NoteAdd';
import { getSettings } from '../reducers/optionsReducer';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { triggerAddItem } from '../actions/itemActions';
import { withStyles } from '@material-ui/core/styles';
import { guid } from '../utils/guid';
import { Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
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
    }
})

class ListComponent extends Component {
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

    itemSelected() {
        const { onItemSelected = () => { } } = this.props;
        onItemSelected();
    }

    showDialog(dialog) {
        this.props.dispatch(updateUi({
            [dialog]: true
        }))
    }

    render() {
        const {
            items,
            settings,
            classes,
            style
        } = this.props;

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
                                component={Link}
                                to={`/items/${id}`}
                                onClick={() => this.itemSelected()}
                                button
                            >
                                <ListItemText primary={title} secondary={settings.displayPreview && preview} />
                            </ListItem>
                        )
                    })}
                </div>
                <ListItem className={classes.options}>
                    <div className={classes.optionsButton}>
                        <IconButton aria-label="Save" onClick={() => this.showDialog('saveDialog')}>
                            <SaveIcon />
                        </IconButton>
                    </div>
                    <div className={classes.optionsButton}>
                        <IconButton aria-label="Load" onClick={() => this.showDialog('loadDialog')}>
                            <FolderIcon />
                        </IconButton>
                    </div>
                    <div className={classes.optionsButton}>
                        <IconButton aria-label="Edit" onClick={() => {}}>
                            <EditIcon />
                        </IconButton>
                    </div>
                </ListItem>
            </List>
        )
    }
}

export default connect(ListComponent.mapStateToProps)(withStyles(styles)(ListComponent))