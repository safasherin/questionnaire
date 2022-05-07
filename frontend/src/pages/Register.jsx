import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Avatar, Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import validator from 'validator'

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log("Email validation ", re.test(email))
    return re.test(email);
}

const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{8,16}$/;
    // console.log("Pass validation ", re.test(password))
    return re.test(password);
}

const useStyles = makeStyles((theme) => (
    {
        rects: {
            display: "flex",
            [theme.breakpoints.down('sm')]: {
                flexDirection: "column",
                alignItems: "center",

            },
            [theme.breakpoints.up('md')]: {
                flexDirection: "row",
                justifyContent: "space-between"
            },
        },
        rect1: {
            backgroundColor: '#F1948A ',
            display: "flex",
            flexDirection: "column",
            position: "relative ",
            zIndex: "10",
            padding: "10px 20px",
            color: "white",
            letterSpacing: "6px",
            [theme.breakpoints.down('sm')]: {
                marginTop: "50px",
                // width: "300px",
                width: "50%",
            },
            [theme.breakpoints.up('md')]: {
                justifyContent: "center",
                width: "30%",
                marginTop: "2%",
                marginLeft: "5%",
            },
        },
        rect2: {
            backgroundColor: '#41f1e5',
            display: "flex",
            flexDirection: "column",
            color: "white",
            letterSpacing: "6px",
            position: "absolute",
            textAlign: "center",
            [theme.breakpoints.down('sm')]: {
                height: "70%",
                width: "100%",
            },
            [theme.breakpoints.up('md')]: {
                alignItems: "flex-end",
                minWidth: " 65%",
                justifyContent: "center",
                height: "950px",
                marginLeft: "15%",
                marginRight: "25%",
            },
        },
        avatarStyle: {
            backgroundColor: "cyan",
            marginTop: "10px"
        },
        btnStyle: {
            backgroundColor: "white",
            borderRadius: "50px",
            fontSize: "15px",
            [theme.breakpoints.down('sm')]: {
                padding: "5px 15px ",
            },
            [theme.breakpoints.up('md')]: {
                padding: "8px 18px ",
            },
        },

        typography1Style: {
            [theme.breakpoints.down('sm')]: {
                fontSize: "15px",
            },
            [theme.breakpoints.up('md')]: {
                fontSize: "18px",
            },
        },
        linkStyleReg: {
            cursor: "pointer"
        },
        divGridStyle: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        },
        btnGridStyle: {
            display: "flex",
            justifyContent: "center"
        },
        textStyle1: {
            [theme.breakpoints.up('md')]: {
                fontSize: "35px",
                paddingRight: "98px",
            },
            [theme.breakpoints.down('sm')]: {
                display: "none"
            }
        },
        textStyle2: {
            [theme.breakpoints.up('md')]: {
                fontSize: "35px",
                paddingRight: "54px",
            },
            [theme.breakpoints.down('sm')]: {
                display: "none"
            }
        }
    }
)
)

function Register() {
    const classes = useStyles();
    const [state, setState] = useState("initial");
    const [errorsState, setErrorsState] = useState([]);
    const [expertise, setexpertise] = useState('');
    const handleChange = (event) => {
        setexpertise(event.target.value);
    }
    const nameRef = useRef();
    const usernameRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const designationRef = useRef();
    const linkedInURLRef = useRef();
    const [errorMessage, setErrorMessage] = useState('')
    const formData = new FormData();
    const validate = (value) => {

        if (validator.isURL(value)) {
            setErrorMessage('')
        } else {
            setErrorMessage('Please enter a valid URL')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];
        // console.log(nameRef.current.value)
        // console.log(passwordRef.current.value)
        if (!validateEmail(emailRef.current.value)) {
            errors.push("Please enter a valid email address ");
        }
        if (!validatePassword(passwordRef.current.value)) {
            errors.push("Please enter a valid password ");
        }

        // 1.1 If there are errors, set the state to "validation error"
        if (errors.length > 0) {
            setState("validation error");
            // Populate the alert box with the errors
            setErrorsState(errors);
        }
        // 1.2 If there are no errors, set the state to "sending"
        else {
            setState("sending");
            setErrorsState([]);
            formData.append('username', usernameRef.current.value);
            formData.append('name', nameRef.current.value);
            formData.append('phoneNumber', phoneNumberRef.current.value);
            formData.append('email', emailRef.current.value);
            formData.append('designation', designationRef.current.value);
            formData.append('password', passwordRef.current.value);
            formData.append('linkedInURL', linkedInURLRef.current.value);
            formData.append('expertiseLevel', expertise);
            try {
                const res = await axios.post("/user/register", formData)
                setState("successful");
                res.data && window.location.replace("/login");
            } catch (error) {
                setState("unsuccessful");
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.rects}>
                <div xs={12} md={6} className={classes.rect1}>
                    <Box item align="center">
                        <Avatar className={classes.avatarStyle} ><LockOutlinedIcon /></Avatar>
                        <h2>SIGN UP</h2>
                    </Box>
                    <TextField
                        label="Name"
                        fullWidth
                        required
                        inputRef={nameRef}
                    />
                    <br />

                    <TextField
                        label="Email"
                        fullWidth
                        required
                        inputRef={emailRef}
                    />
                    <br />

                    <TextField
                        label="Designation"
                        fullWidth
                        required
                        inputRef={designationRef}
                    />
                    <br />

                    <TextField
                        inputProps={{ type: 'number' }}
                        label="Phone Number"
                        fullWidth

                        inputRef={phoneNumberRef}
                    />
                    <br />

                    <TextField
                        label="LinkedIn URL"
                        fullWidth
                        onChange={(e) =>
                            // console.log(e.target.value)
                            validate(e.target.value)
                        }
                        inputRef={linkedInURLRef}
                    />
                    <span style={{
                        fontSize: "15px",
                        letterSpacing: "0px"
                    }}>{errorMessage}</span>
                    <br />

                    <TextField
                        label="Username"
                        fullWidth
                        required
                        inputRef={usernameRef}
                    />
                    <br />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        inputRef={passwordRef}
                    />
                    <br />

                    <FormControl >
                        <InputLabel
                            required
                        >Expertise Level</InputLabel>
                        <Select
                            onChange={handleChange}
                        >
                            <MenuItem value="" >
                                <em >None</em>
                            </MenuItem>
                            <MenuItem
                                value={"Beginner"}>Beginner</MenuItem>
                            <MenuItem
                                value={"Intermediate"}>Intermediate</MenuItem>
                            <MenuItem
                                value={"Expert"}>Expert</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />

                    {
                        state !== "sending" && state !== "successful" &&
                        <div className={classes.btnGridStyle}>
                            <Button className={classes.btnStyle} type="submit" variant="contained"  >
                                Sign Up
                            </Button>
                        </div>
                    }
                    {
                        state === "validation error" &&
                        <div className="alert alertdiv" role="alert">
                            <ul>
                                {
                                    errorsState.map(
                                        (error) => <li>{error}</li>
                                    )
                                }
                            </ul>
                        </div>
                    }

                    {
                        state === "successful" &&
                        <div className="alert alert-success" role="alert">
                            You have registered successfully!
                        </div>
                    }

                    {
                        state === "unsuccessful" &&
                        <div className="alert alert-danger" role="alert">
                            Something went wrong!! Please try again later.
                        </div>
                    }
                    {
                        state === "sending" &&
                        <p style={{ color: "white" }}>Loading...</p>
                    }
                    <br />
                    <div className={classes.divGridStyle}>
                        <Typography className={classes.typography1Style}> Already a member?
                        </Typography>
                        <Link to="/login" className={classes.linkStyleReg}>
                            Sign In
                        </Link>
                    </div>
                </div>

                <div xs={12} md={6} className={classes.rect2}>
                    <Typography className={classes.textStyle1}>Welcome To</Typography>
                    <Typography className={classes.textStyle2}> Our Community!!!</Typography>
                </div>

            </div>
        </form>
    )

}
export default Register;
