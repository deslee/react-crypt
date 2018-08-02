import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit,
        [theme.breakpoints.down('sm')]: {
            backgroundColor: theme.palette.secondary.main,
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: green[500],
        },
    }
})

class Login extends Component {
    render() {
        return (
            <div className={this.props.classes.root}>hi</div>
        )
    }
}

export default withStyles(styles)(Login);