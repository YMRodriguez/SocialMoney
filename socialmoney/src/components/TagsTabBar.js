import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Post from './Post.js';
import PostFeed from './PostFeed.js';
import $ from 'jquery';


function TabPanel(props){
    const { children, value, index, ...other } = props;
    //console.log(props)
    return (
        <div
            sim
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: "100%" }}
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

export default class TagsTabBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            posts: []
        }
    }

    async componentDidMount() {
        this.fetchFollowPosts();
    }

    handleChange = (event, newValue) => {
        //console.log(newValue);
        this.setState({value: newValue})
    };

     fetchFollowPosts() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/feed",
        
            xhrFields: {
          withCredentials: true
            },
            crossDomain: true,
            
            type: 'POST',
            data: JSON.stringify({ username: this.props.user.username }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    let receivedposts = JSON.parse(msg.postList)
                    this.setState({ posts: receivedposts })
                }
                else if (msg.code == 204) {
                    console.log('Success')
                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        });
    } 


    render() {
        return (
            <div style={{ width: "100%" }}>
                <AppBar position="static" id="apptab" style={{ width: "100%" }}>
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" id="tabs">
                        <Tab id="tab" label="Últimos" />
                        <Tab id="tab" label="Opinión" />
                        <Tab id="tab" label="Análisis Técnico" />
                        <Tab id="tab" label="Análisis Fundamental" />
                    </Tabs>
                </AppBar>

                <TabPanel value={this.state.value} index={0} id="tagpanel" style={{ width: "100%" }}>
                    <div id="posts">
                            {(this.state.posts.length != 0) ? this.state.posts.map((p, i) => {
                                return (
                                    <PostFeed publication={p}
                                        index={i}
                                        className="post"
                                        allowbutton={true}
                                    />
                                )
                            }) : <p>No hay publicaciones su feed</p>}
                    </div>            
                </TabPanel>
            <TabPanel value={this.state.value} index={1} id="tagpanel" style={{ width: "100%" }}>
                <div id="posts">
                                {(this.state.posts.length != 0) ? this.state.posts.map((p, i) => {
                                    if (p.isopinion){
                                    return (
                                        <PostFeed publication={p}
                                            index={i}
                                            className="post"
                                            allowbutton={true}
                                        />
                                    )
                                }
                                }) : <p>No hay publicaciones de opiniones</p>}
                        </div>    
                </TabPanel>

                <TabPanel value={this.state.value} index={2} id="tagpanel" style={{ width: "100%" }}>

                    <div id="posts">
                                {(this.state.posts.length != 0) ? this.state.posts.map((p, i) => {
                                    if (p.istecan){
                                        return (
                                            <PostFeed publication={p}
                                                index={i}
                                                className="post"
                                                allowbutton={true}
                                            />
                                        )
                                    }
                                }) : <p>No hay publicaciones de análisis técnico </p>}
                        </div>    

                </TabPanel>

                <TabPanel value={this.state.value} index={3} id="tagpanel" style={{ width: "100%" }}>

                    <div id="posts">
                                {(this.state.posts.length != 0) ? this.state.posts.map((p, i) => {
                                    if (p.isfundan){
                                        return (
                                            <PostFeed publication={p}
                                                index={i}
                                                className="post"
                                                allowbutton={true}
                                            />
                                        )
                                    }
                                }) : <p>No hay publicaciones de análisis fundamental</p>}
                        </div>    
                </TabPanel>
            </div>
        );
    }
}