import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Button, Input } from 'reactstrap';

const Display = ({id, title = '', content = '', tags = [], date = ''}) => (
    <div>
        <h1>{title}</h1>
        <div>
            <ReactMarkdown source={content} />
        </div>
        <Link to="?editing=true"><Button>Edit</Button></Link>
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
                <h1>{title} (editing)</h1>
                <div>
                    <Input type="text" value={title} onChange={e => this.changed({title: e.target.value})} /> <br />
                    <Input type="textarea" value={content} onChange={e => this.changed({content: e.target.value})}>
                    </Input>
                </div>
                <Link to="?"><Button>Save</Button></Link>
                <Button onClick={() => deleteItem()}>Delete</Button>
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
            editing === false ? <Display {...this.props} /> : <Edit {...this.props} />
        );
    }
}