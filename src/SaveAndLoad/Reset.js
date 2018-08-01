import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset } from '../actions/startupActions';

class Reset extends Component {
    reset() {
        this.props.dispatch(
            reset()
        )
    }

    render() {
        return (
            <div>
                <button onClick={() => this.reset()}>Reset</button>
            </div>
        )
    }
}

export default connect()(Reset);