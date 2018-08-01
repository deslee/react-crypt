import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { TextField, Button, Icon } from '@material-ui/core';

const Display = ({id, title = '', content = '', tags = [], date = ''}) => (
    <div>
        <h1>{title}</h1>
        <div>
            <ReactMarkdown source={content} />
        </div>
        <Link to="?editing=true"><Button variant="fab" aria-label="Edit" color="secondary"><Icon>edit_icon</Icon></Button></Link>
    </div>
);

class Edit extends Component {
    changed(data) {
        const { id, title, content, tags, date, saveItem = () => {} } = this.props
        
        saveItem({
            id,
            title,
            content,
            tags,
            date,
            ...data
        })
    }

    render() {
        const { title = '', content = '', deleteItem = () => {} } = this.props
        return (
            <div>
                <h1>{title}</h1>
                <div>
                    <TextField
                        label="Title"
                        value={title}
                        style = {{width: '100%'}}
                        onChange={e => this.changed({title: e.target.value})}
                        margin="normal"
                    />
                    <TextField
                        label="Content"
                        multiline
                        value={content}
                        style = {{width: '100%'}}
                        onChange={e => this.changed({content: e.target.value})}
                        margin="normal"
                    />
                </div>
                <Link to="?"><Button variant="contained" color="primary">Save</Button></Link>
                <Button onClick={() => deleteItem()} variant="contained" color="secondary">Delete</Button>
            </div>
        );
    }
}

export default class Item extends Component {
    render() {
        const {
            editing = false
        } = this.props;

        return (
            <div style={{padding: '1rem'}}>
                {editing === false ? <Display {...this.props} /> : <Edit {...this.props} />}
            </div>
        );
    }
}