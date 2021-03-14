import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Post from './Post.js';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            sim
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{width:"100%"}}
            
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
}));

export default function TagsTabBar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} style={{width:"100%"}}>
            <AppBar position="static" id="apptab" style={{width:"100%"}}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" id="tabs">
                    <Tab id="tab" label="Ultimos" />
                    <Tab id="tab" label="Opinion" />
                    <Tab id="tab" label="Analisis" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} id="tagpanel" style={{width:"100%"}}>
                <Post author={props.data} className="post" />
                <Post author={props.data} className="post" />
            </TabPanel>
            <TabPanel value={value} index={1} id="tagpanel" style={{width:"100%"}}>
                <Post author={props.data} className="post" />
                <Post author={props.data} className="post" />
            </TabPanel>
            <TabPanel value={value} index={2} id="tagpanel" style={{width:"100%"}}>
                <Post author={props.data} className="post" />
            </TabPanel>
        </div>
    );
}