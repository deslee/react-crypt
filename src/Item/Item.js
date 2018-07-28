import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Button, Input } from 'reactstrap';

const Display = ({title, content, onEdit = () => {}}) => (
    <div>
        <h1>{title}</h1>
        <div>
            <ReactMarkdown source={content} />
        </div>
        <Button onClick={() => onEdit()}>Edit</Button>
    </div>
);

class Edit extends Component {
    constructor(props) {
        super(props);

        const { title, content } = this.props;

        this.state = {
            title: title,
            content: content
        }
    }

    render() {
        const {id, onSave = () => {}} = this.props;
        const { title, content } = this.state
        return (
            <div>
                <h1>{title} (editing)</h1>
                <div>
                    <Input type="textarea" value={content} onChange={e => this.setState({content: e.target.value})}>
                    </Input>
                </div>
                <Button onClick={() => onSave({
                    id: id,
                    title: title,
                    content: content
                })}>Save</Button>
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