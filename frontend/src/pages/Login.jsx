import React, { useContext, useRef, useState } from 'react';
import { Avatar, Grid, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import { Context } from '../context/Context.js';
import { Link } from 'react-router-dom';
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{8,16}$/;
    return re.test(password);
}

const useStyles = makeStyles((theme) => (
    {
        rects: {
            [theme.breakpoints.down('sm')]: {
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                alignItems: "center",
            },
            [theme.breakpoints.up('md')]: {
                display: "flex",
                flexDirection: "row",
                height: "100vh"
            },
        },
        rect2: {
            backgroundColor: '#F1948A ',
            [theme.breakpoints.down('sm')]: {
                display: "flex",
                flexDirection: "column",
                position: "relative ",
                zIndex: "10",
                padding: "4%",
                marginTop: "25rem",
                width: "80%",
                color: "white",
                letterSpacing: "6px",
            },
            [theme.breakpoints.up('md')]: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
                height: "65%",
                position: "relative ",
                marginTop: "10%",
                marginLeft: "10%",
                zIndex: "10",
                padding: "3%",
                color: "white",
                letterSpacing: "6px",
            },

        },
        rect1: {
            backgroundColor: '#41f1e5',
            [theme.breakpoints.down('sm')]: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "70%",
                position: "absolute",
                color: "white",
                letterSpacing: "6px",
            },
            [theme.breakpoints.up('md')]: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "70%",
                height: "95%",
                marginTop: "2%",
                marginLeft: "25%",
                position: "absolute",
                color: "white",
                letterSpacing: "6px",
            },
        },

        avatarStyle: {
            backgroundColor: "cyan",
        },

        btnStyle: {
            [theme.breakpoints.down('sm')]: {
                padding: "5px 15px ",
                width: "max-content",
                marginLeft: "36%",
                marginBottom: "20px",
                backgroundColor: "white",
                borderRadius: "50px",
                fontSize: "15px",
            },
            [theme.breakpoints.up('md')]: {
                padding: "8px 18px ",
                backgroundColor: "white",
                borderRadius: "50px",
                marginLeft: "0px",
                marginBottom: "20px",
                width: "max-content",
                fontSize: "15px",
            },
        },

        textStyle: {
            [theme.breakpoints.down('sm')]: {
                fontSize: "25px",
                fontWeight: "400",
                color: "white",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "2%"
            },
            [theme.breakpoints.up('md')]: {
                fontSize: "40px",
                fontWeight: "400",
                display: "flex",
                color: "white",
                paddingLeft: "30%",
                textAlign: "center",
                textTransform: "uppercase",
                letterSpacing: "2%"
            },
        },

        typography1Style: {
            [theme.breakpoints.down('sm')]: {
                fontSize: "15px",
                marginLeft: "34%",
                marginTop: "4%"
            },
            [theme.breakpoints.up('md')]: {
                fontSize: "18px",
                marginTop: "4%"
            },
        },

        typography2Style: {
            [theme.breakpoints.down('sm')]: {
                fontSize: "15px",
                marginLeft: "29%",
            },
            [theme.breakpoints.up('md')]: {
                fontSize: "18px",
            },
        },
        typography3Style: {
            [theme.breakpoints.down('sm')]: {
                fontSize: "15px",
                marginLeft: "13%"
            },
            [theme.breakpoints.up('md')]: {
                fontSize: "18px",
                marginLeft: "35%"
            },
        }
    }
)
)

function Login() {
    const classes = useStyles();
    const [state, setState] = useState("initial");
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];
        if (!validatePassword(passwordRef.current.value)) {
            errors.push("Please enter a valid username and password");
            // 1.1 If there are errors, set the state to "validation error"
            if (errors.length > 0) {
                setState("validation error");
            }
        }
        // // 1.2 If there are no errors, set the state to "sending"
        else {
            dispatch({ type: "LOGIN_START" })
            setState("sending");
            try {
                const res = await axios.post("/user/login", {
                    username: usernameRef.current.value,
                    password: passwordRef.current.value,
                });
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
                // console.log(res.data)
                setState("successful");
            } catch (err) {
                dispatch({ type: "LOGIN_FAILURE" });
                setState("Unsuccessful");
            };
        }
    }
    // console.log(isFetching)
    return (
        <form onSubmit={handleSubmit}>
            <Grid container className={classes.rects}>
                <Grid item className={classes.rect1}>
                    <Typography className={classes.textStyle}>Log In To Connect With Our Community!!!</Typography>
                </Grid>
                <Grid item className={classes.rect2}>
                    <Grid align="center">
                        <Avatar className={classes.avatarStyle} ><LockOutlinedIcon /></Avatar>
                        <h2>SIGN IN</h2>
                    </Grid>
                    <TextField
                        label="Username"
                        fullWidth
                        required
                        inputRef={usernameRef}
                    />
                    <br />

                    <TextField label="Password"
                        type="password"
                        fullWidth
                        required
                        color="secondary"
                        inputRef={passwordRef}
                    />
                    <br />
                    <br />

                    {
                        state !== "sending" && state !== "successful" &&
                        <Button className={classes.btnStyle}
                            variant="contained"
                            type="submit">
                            Sign In
                        </Button>
                    }
                    {
                        state === "validation error" &&
                        <div className="alert alert-danger" role="alert">
                            Incorrect email or password.
                        </div>
                    }

                    {
                        state === "unsuccessful" &&
                        <div className="alert alert-danger" role="alert">
                            Something went wrong!!! Please try again later.
                        </div>
                    }
                    {
                        state === "sending" &&
                        <p>Loading...</p>
                    }

                    <Typography className={classes.typography2Style} > Already have an account?
                        <br />
                        <Link to="/register" className={classes.typography3Style}>
                            Sign Up
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </form>
    )
}
export default Login;
