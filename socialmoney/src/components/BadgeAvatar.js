import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function BadgeAvatars(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="user picture" src={props.user} />
        </div>
    );
}