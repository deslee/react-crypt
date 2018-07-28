import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { MdChevronRight } from 'react-icons/lib/md';
import { Link } from 'react-router-dom';

const Title = ({children}) => {
    const style = {
        display: 'block',
        fontSize: '2rem'
    };
    return (
        <span style={style}>{children}</span>
    );
}
const Preview = ({children}) => {
    const style = {
        display: 'block'
    };
    return (
        <span style={style}>{children}</span>
    );
}

export default class List extends Component {
    render() {
        const {
            items = [],
            onSelect = () => {},
            selected = undefined
        } = this.props;

        const itemStyle = {
            display: 'flex'
        };
        const titleAndPreview = {
            flexGrow: '1'
        };
        const chevron = {
            alignSelf: 'center'
        };

        return (
            <ListGroup>
                {items.map(({id, title = "", preview = ""}) => (<ListGroupItem 
                    tag={Link}
                    replace={true}
                    to={`/items/${id}`}
                    action
                    active={selected && id && selected.toString() === id.toString()}
                    onClick={() => {onSelect(id)}}
                    key={id}
                >
                    <div style={itemStyle}>
                        <div style={titleAndPreview}>
                            <Title>{title}</Title>
                            <Preview>{preview}</Preview>
                        </div>
                        <MdChevronRight style={chevron} />
                    </div>
                </ListGroupItem>))}
            </ListGroup>
        )
    }
}