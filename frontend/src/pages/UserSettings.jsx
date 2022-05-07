import { Button, makeStyles, TextField } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import React, { useContext, useState } from 'react'
import { Context } from '../context/Context';
import ChangePassword from "./ChangePassword.jsx";
import axios from 'axios';
import NavBar from '../components/Navbar';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;



const useStyle = makeStyles((theme) => ({
    textStyle: {
        fontSize: "50px",
        // marginLeft: "10px"
        // color: "white"
    },
    btnStyle1: {
        marginRight: "30%",
        marginTop: "-80px",
        backgroundColor: "#a7ffeb"

    },
    btnStyle2: {
        backgroundColor: "cyan",
        fontWeight: "600"

    },
    successStyle: {
        color: "green",
        fontSize: "20px",
        textAlign: "center",
        marginTop: "20px"
    },
    dangerStyle: {
        color: "red",
        fontSize: "20px",
        textAlign: "center",
        marginTop: "20px"
    },
    navbarStyle: {
        marginTop: "2%",
        marginLeft: "10px",
        marginBottom: "64px",
    },
    profilePicStyle: {

        cursor: "pointer",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        objectFit: "cover",
        marginLeft: "20px",
        marginBottom: "2%"

    },

}))


export default function Settings() {
    const classes = useStyle();
    const { user, jsonwebtoken, dispatch, changePasswordBoxDisplay } = useContext(Context);
    const [file, setFile] = useState(null);
    const [name, setName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [designation, setDesignation] = useState(user.designation);
    const [linkedInURL, setLinkedInURL] = useState(user.linkedInURL);

    const [state, setState] = useState("initial");
    const handleClickOpen = () => {
        dispatch({ type: "DISPLAY_PASSWORD_CHANGE_WINDOW" })
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        setState("sending")
        const updatedUser = new FormData();
        updatedUser.append("userId", user._id)
        updatedUser.append("name", name)
        updatedUser.append("linkedInURL", linkedInURL)
        updatedUser.append("phoneNumber", phoneNumber)
        updatedUser.append("designation", designation)

        if (file) {
            updatedUser.append("profilePic", file)
        }
        try {
            // console.log(updatedUser)
            const res = await axios.put("/user/" + user._id, updatedUser,
                {
                    headers: {
                        Authorization: `Bearer ${jsonwebtoken}`
                    }
                });
            // console.log(res.data)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            setState("successful")

        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
            setState("unsuccessful")
        }
    }
    return (
        <div>
            <NavBar />
            <form onSubmit={handleSubmitForm} className={classes.navbarStyle}>

                <label htmlFor="fileInput" >
                    {file ?
                        <img
                            src={URL.createObjectURL(file)}

                            className={classes.profilePicStyle}
                            alt=""
                        />
                        :
                        (user.profilePic ?
                            <img
                                src={user.profilePic}

                                className={classes.profilePicStyle}
                                alt=""
                            />
                            :
                            <AccountCircleIcon className={classes.profilePicStyle} />

                        )
                    }
                </label>

                {/* {cond1?
<img></img>:
(cond2? <img></img>:<ib></ib>)} */}

                <input type="file" id="fileInput"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                />



                <TextField className={classes.textStyle}
                    id="standard-multiline-flexible"
                    label="Username"
                    multiline
                    maxRows={4}
                    defaultValue={user.username}
                    fullWidth
                    disabled

                />

                <br />
                <br />
                <br />
                <br />
                <TextField className={classes.textStyle}
                    id="standard-multiline-flexible"
                    label="Email"
                    multiline
                    maxRows={4}
                    defaultValue={user.email}
                    fullWidth
                    disabled

                />

                <br />
                <br />
                <br />
                <br />
                <TextField className={classes.textStyle}
                    id="standard-multiline-flexible"
                    label="Phone Number"
                    multiline
                    maxRows={4}
                    defaultValue={user.phoneNumber}
                    fullWidth
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <br />
                <br />
                <br />
                <br />
                <TextField className={classes.textStyle}
                    id="standard-multiline-flexible"
                    label="Name"
                    multiline
                    maxRows={4}
                    defaultValue={user.name}
                    fullWidth
                    onChange={(e) => setName(e.target.value)}

                />
                <br />
                <br />
                <br />
                <br />
                <TextField className={classes.textStyle}
                    id="standard-multiline-flexible"
                    label="LinkedInURL"
                    multiline
                    maxRows={4}
                    defaultValue={user.linkedInURL}
                    fullWidth
                    onChange={(e) => setLinkedInURL(e.target.value)}

                />
                <br />
                <br />
                <br />
                <br />
                <TextField className={classes.textStyle}
                    id="standard-multiline-flexible"
                    label="Designation"
                    multiline
                    maxRows={4}
                    defaultValue={user.designation}
                    fullWidth
                    onChange={(e) => setDesignation(e.target.value)}

                />
                <br />
                <br />
                <br />
                <br />
                <Button variant="contained" className={classes.btnStyle1} onClick={handleClickOpen}>
                    Change Password
                </Button>
                {
                    state !== "sending" && state !== "successful" &&
                    <Button className={classes.btnStyle2} type="submit" variant="contained">Update User</Button>
                }


                {
                    state === "successful" &&
                    <div className={classes.successStyle} role="alert">
                        Succesfully Updated Your Profile!!
                    </div>
                }

                {
                    state === "unsuccessful" &&
                    <div className={classes.dangerStyle} role="alert">
                        Something went wrong!!! Please try again later.
                    </div>
                }

                {
                    state === "sending" &&
                    <p>Loading...</p>
                }
            </form>
            {changePasswordBoxDisplay ? <ChangePassword /> : null}
        </div>
    )
}
