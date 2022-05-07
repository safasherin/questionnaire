import { Button, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import { Context } from '../context/Context';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Questions from '../components/Questions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'

import Announcements from '../components/Announcements';
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;


const useStyle = makeStyles((theme) => ({

    profilePicStyleacct: {

        fontSize: "300%",
        color: "white",

    },
    profilePicStyle: {

        width: "70px",
        height: "60px",
        borderRadius: "50%",
        marginTop: "20%",
        marginLeft: "5%"
    },

    containerStyle: {
        display: "flex",
        flexDirection: "column",

    },
    qAdivStyle: {
        [theme.breakpoints.up('sm')]: {
            display: "flex"
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column"
        },
    },
    qntsantsStyle: {
        flex: "1"
    },

    editItemStyle: {
        display: "flex",
        justifyContent: "space-between",
    },


    itemsStyle: {
        minHeight: "50%",
        backgroundColor: "cyan",

    },
    item1Style: {
        display: "flex"
    },
    item2Style: {
        width: "100px",
        marginTop: "20px",
    },
    typographyStyle: {
        fontSize: "120%",
        color: "white",
        paddingLeft: "10px",
    },
    buttonStyle: {
        color: "white",
        fontWeight: "600",
        backgroundColor: "#fd7c93",
        width: "150px",
        height: "50px",
        marginTop: "24px",
        marginRight: "16px",
        '&:hover': {
            backgroundColor: "pink",
        },


    },
    CallStyle: {
        fontSize: "110%",
        color: "white",
    },
    CallTextStyle: {
        fontSize: "110%",
        color: "white",
        paddingTop: "1%"

    },
    expStyle: {
        fontSize: "150%",
        color: "white",
        paddingLeft: "16px",
        fontWeight: "600",
        letterSpacing: "0.1em"
    },
    phoneStyle: {
        display: "flex",
    },

    linkStyle: {
        textDecoration: "none",
        color: "white",

    },

}));

export default function Profile() {
    const classes = useStyle();
    const { user } = useContext(Context);
    const [userposts, setuserposts] = useState([]);
    const [userants, setuserants] = useState([]);


    useEffect(() => {
        const fetchuserPosts = async () => {
            const resuserposts = await axios.get("/post/?user=" + user.username);
            setuserposts(resuserposts.data)
            // console.log(resuserposts)
        }
        const fetchuserAnts = async () => {
            const resuserAnts = await axios.get("announcement/?user=" + user.username);
            setuserants(resuserAnts.data)
            // console.log(resuserAnts)
        }
        fetchuserPosts()
        fetchuserAnts()
        // console.log(user)
    }, [])
    return (
        <div className={classes.divStyle}>
            <Navbar />

            <Grid item className={classes.itemsStyle}>
                <Grid item className={classes.editItemStyle}>
                    <Grid item className={classes.item1Style}>


                        {user.profilePic ?
                            (
                                < img
                                    src={user.profilePic}
                                    className={classes.profilePicStyle}
                                    alt=""
                                />

                            ) : (
                                <IconButton >
                                    <AccountCircleIcon className={classes.profilePicStyleacct} />
                                </IconButton>
                            )}
                        <Grid item className={classes.item2Style}>
                            <Typography className={classes.typographyStyle}>{user.username}</Typography>
                            <Typography className={classes.typographyStyle}> {user.designation}</Typography>
                        </Grid>
                    </Grid>

                    <Button

                        className={classes.buttonStyle}
                        variant="contained">
                        <Link to="/userSettings" className={classes.linkStyle}>Edit Profile</Link>

                    </Button>

                </Grid>
                <Grid item >

                    <Typography className={classes.expStyle}>{user.expertiseLevel}</Typography>

                </Grid>
                {user.phoneNumber ?
                    <Grid item className={classes.phoneStyle}>
                        <IconButton >
                            <PhoneIcon className={classes.CallStyle} />
                        </IconButton>
                        <Typography className={classes.CallTextStyle}>{user.phoneNumber}</Typography>
                    </Grid> : null}
                <Grid item className={classes.phoneStyle}>
                    <IconButton >
                        <EmailIcon className={classes.CallStyle} />
                    </IconButton>
                    <Typography className={classes.CallTextStyle}>{user.email}</Typography>
                </Grid>
                {user.linkedInURL ?
                    <Grid item className={classes.phoneStyle}>
                        <IconButton >
                            <LinkedInIcon className={classes.CallStyle} />
                        </IconButton>
                        <Typography className={classes.CallTextStyle}>{user.linkedInURL}</Typography>
                    </Grid> : null}
            </Grid>

            <div className={classes.qAdivStyle}>
                <Grid item className={classes.qntsantsStyle}
                >
                    <Questions posts={userposts}
                        user={user} />

                </Grid>
                <Grid item className={classes.qntsantsStyle}
                >

                    <Announcements announcements={userants}
                        user={user} />

                </Grid>

            </div>

        </div >
    )
}
