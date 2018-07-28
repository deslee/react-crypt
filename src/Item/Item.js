import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Input } from 'reactstrap';

const Display = ({id, title = '', content = '', tags = [], triggerEditItem = () => {}}) => (
    <div>
        <h1>{title}</h1>
        <div>
            <ReactMarkdown source={content} />
        </div>
        <Button onClick={() => triggerEditItem({title, content, id, tags})}>Edit</Button>
    </div>
);

class Edit extends Component {
    constructor(props) {
        super(props);
        // copy props to state
        const { 
            title = "", 
            content = "",
            tags = []
        } = this.props;

        this.state = {
            title: title,
            content: content,
            tags: tags
        }
    }

    // gets item from current state and initial props
    getCurrentItem() {
        const { id } = this.props;
        const { title, content, tags } = this.state
        return {
            id: id,
            title: title,
            content: content,
            tags
        }
    }

    save() {
        const { saveItem = () => {} } = this.props;
        saveItem(this.getCurrentItem())
    }

    changed(data) {
        this.setState(data);
        setTimeout(() => this.save(), 10);
    }

    render() {
        const { triggerSaveItem = () => {} } = this.props;
        const { title, content } = this.state
        return (
            <div>
                <h1>{title} (editing)</h1>
                <div>
                    <Input type="text" value={title} onChange={e => this.changed({title: e.target.value})} /> <br />
                    <Input type="textarea" value={content} onChange={e => this.changed({content: e.target.value})}>
                    </Input>
                </div>
                <Button onClick={() => triggerSaveItem(this.getCurrentItem())}>Save</Button>
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