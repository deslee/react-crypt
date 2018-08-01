import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@material-ui/core';

export default class ListComponent extends Component {
    render() {
        const {
            items = [],
            settings = {},
            selected = undefined
        } = this.props;

        return (
            <List>
                {items.map(({id, title = "", content = ""}) => {
                    const preview = content;

                    return (
                        <ListItem
                            key={id}
                            style={{
                                background: selected === id ? 'lightgray' : 'inherit'
                            }}
                            component={Link}
                            to={`/items/${id}`}
                            button
                        >
                            <ListItemText primary={title} secondary={settings.displayPreview && preview} />
                        </ListItem>
                    )
                })}
            </List>
        )
    }
}