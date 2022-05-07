import React, { useContext, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    listp: {
        margin: "20px",
        fontSize: "15px",
        letterSpacing: "3px",
        lineHeight: "2px",
    },
    listiconBtn: {
        margin: "20px 0 20px 20px",
        fontSize: "26px",
        letterSpacing: "3px",
        lineHeight: "2px",
    },
    listlogoutDesktop: {
        margin: "20px",
        fontSize: "15px",
        letterSpacing: "3px",
        lineHeight: "2px",
        cursor: "pointer"
    },
    listBrand: {
        fontSize: "28px",
        letterSpacing: "10px",
        fontWeight: "800",
    },
    listStyle: {
        display: "flex",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'blue',
    },
    inputInput: {
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    linkStyle: {
        textDecoration: "none",
        color: "#318078",
    },
    linkStylemobile: {
        textDecoration: "none",
        color: "white",
        cursor: "pointer"
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',

        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    listStyleMobile: {
        backgroundColor: "black",
        color: "white"
    },
    navbarProfilePicStyle: {
        cursor: "pointer",
        color: "#318078"
    },
    appbarStyle: {
        position: 'sticky',
        backgroundColor: "transparent",
        marginTop: "0px",
        color: "#318078",
        boxShadow: "0 0 0 0"

    },
    expertStyle: {
        color: "black",
        paddingTop: "28%",
        fontWeight: 600,
        letterSpacing: "0.2em",
    },
    expert1Style: {
        color: "black",
        paddingTop: "11%",
        paddingLeft: "2%",
        fontWeight: 600,
        fontSize: "15px",
        letterSpacing: "0.2em",
    },
    divImgStyle: {
        display: "flex",
    },

}));


export default function NavBar() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    const mobileListId = 'primary-search-account-list-mobile';
    const renderMobileList = (
        <List
            anchorOrigin={'top'}
            id={mobileListId}
            keepMounted
            className={classes.listStyleMobile}
        >
            <ListItem>
                <Link className={classes.linkStylemobile} to="/" >
                    Home
                </Link>
            </ListItem>

            <ListItem>
                <Link className={classes.linkStylemobile}
                    to="/posts"
                >Questions</Link>

            </ListItem>

            <ListItem>
                <Link className={classes.linkStylemobile}
                    to="/ants"
                >Announcements</Link>

            </ListItem>
            {user ? (
                <div>
                    <ListItem
                        className={classes.linkStylemobile}
                        onClick={handleLogout}>
                        Logout

                    </ListItem>

                    <Link to="/profile" className={classes.linkStylemobile}>
                        <ListItem >

                            Profile
                        </ListItem>
                    </Link>
                </div>
            ) : (
                <List>
                    <ListItem >
                        <Link className={classes.linkStyle} to="/register">Register</Link>

                    </ListItem>

                    <ListItem>
                        <Link className={classes.linkStyle} to="/login">Login</Link>

                    </ListItem>
                </List>
            )}

        </List>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appbarStyle}  >
                <Toolbar >
                    <Typography className={classes.listBrand}
                        variant="h6"
                    >
                        Brand
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <list className={classes.listStyle}>
                            <ListItem
                                className={classes.listp}>
                                <Link className={classes.linkStyle} to="/">Home</Link>
                            </ListItem>
                            <ListItem
                                className={classes.listp}>
                                <Link className={classes.linkStyle} to="/posts">Questions</Link>
                            </ListItem>
                            <ListItem
                                className={classes.listp}>
                                <Link className={classes.linkStyle} to="/ants">Announcements</Link>
                            </ListItem>
                            <ListItem onClick={handleLogout}
                                className={classes.listlogoutDesktop}>
                                {user && "Logout"}
                            </ListItem>
                            {user ? (
                                <ListItem >
                                    <Link to="/profile" className={classes.linkStyle}>
                                        <div className={classes.divImgStyle}>
                                            <Avatar
                                                src={user.profilePic}
                                                className={classes.navbarProfilePicStyle}
                                                alt=""
                                            />
                                            {user.expertiseLevel === "Expert" && (
                                                <Typography
                                                    className={classes.expert1Style}
                                                >Expert</Typography>)
                                            }
                                        </div>
                                    </Link>
                                </ListItem>
                            ) : (
                                <list className={classes.listStyle}>
                                    <ListItem className={classes.listp}>
                                        <Link to="/register" className={classes.linkStyle}>Register</Link>
                                    </ListItem>

                                    <ListItem className={classes.listp}>
                                        <Link to="/login" className={classes.linkStyle}>Login</Link>
                                    </ListItem>
                                </list>
                            )}
                        </list>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            onClick={() => setOpen(true)}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                        <Drawer
                            open={open}
                            anchor={"top"}
                            onClose={() => setOpen(false)}>
                            {renderMobileList}
                        </Drawer>
                    </div>
                </Toolbar>
            </AppBar>

        </div >
    );
}



