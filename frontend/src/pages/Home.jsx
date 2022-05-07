
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import QuestionBoard from '../components/QuestionBoard';
import Questions from '../components/Questions';
import axios from 'axios';
import Header from '../components/Header';
import { Grid } from '@material-ui/core';
import Announcements from '../components/Announcements';
import { Context } from '../context/Context';
import { makeStyles } from '@material-ui/styles';
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;


const useStyles = makeStyles((theme) => (
    {
        containerQsStyle: {
            display: "flex",
        },
        qntsantsStyle: {
            flex: "1",

        }
    }

))

function Home() {
    const { user } = useContext(Context);
    const classes = useStyles();

    const [posts, setposts] = useState([]);
    const [ants, setAnts] = useState([]);



    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/post");
            setposts(res.data)
        }
        const fetchants = async () => {
            const resants = await axios.get("/announcement");
            setAnts(resants.data)
        }
        fetchPosts();
        fetchants();
    }, [])

    return (

        <>
            <Navbar posts={posts} />
            <Header />
            <QuestionBoard />
            <Grid container className={classes.containerQsStyle}>
                <Grid item className={classes.qntsantsStyle}
                >
                    <Questions posts={posts}
                        user={user} />

                </Grid>
                <Grid item className={classes.qntsantsStyle}
                >

                    <Announcements announcements={ants}
                        user={user} />

                </Grid>
            </Grid>



        </>

    )
}

export default Home;