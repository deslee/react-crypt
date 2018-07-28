import React, { Component } from 'react';

const Display = ({title, content}) => (
    <div>
        <h1>{title}</h1>
        <div>
            {content}
        </div>
    </div>
);

const Edit = ({title, content}) => (
    <div>
        <h1>{title} (editing)</h1>
        <div>
            {content}
        </div>
    </div>
);

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