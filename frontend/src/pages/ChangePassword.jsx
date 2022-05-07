import React, { useContext, useEffect, useState } from 'react'
import { Button, makeStyles, Dialog, withStyles, Typography, IconButton, FormControl, InputLabel, OutlinedInput, } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Context } from '../context/Context';
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import axios from 'axios';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const useStyle = makeStyles((theme) => ({
    textStyle: {
        fontSize: "50px",
        color: "white"
    },
    btnStyle1: {
        marginTop: "0%"
    },
    btnStyle: {
        backgroundColor: "cyan",
        marginLeft: "35%",
        marginTop: "5%"
    },
    successStyle: {
        color: "green",
        fontSize: "20px",
        textAlign: "center",
        marginTop: "20px"
    }

}))


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {

        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);
const validatePassword = (password) => {
    const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z].{8,16}$/;
    return re.test(password);
}




export default function ChangePassword() {
    const { user, jsonwebtoken, dispatch, changePasswordBoxDisplay } = useContext(Context);

    const classes = useStyle();
    const [state, setState] = useState("initial");

    const [errorsState, setErrorsState] = useState([]);

    const handleClose = async (e) => {
        dispatch({ type: "CLOSE_PASSWORD_CHANGE_WINDOW" })
    }

    const handleSubmitPassword = async (e) => {
        // console.log("submitting......")
        e.preventDefault();
        const errors = [];


        if (!validatePassword(values.newPassword)) {
            errors.push("Please enter a valid password ");

            if (errors.length > 0) {
                setState("validation error");
                // Populate the alert box with the errors
                setErrorsState(errors);
            }
        }
        else {
            setState("sending");


            try {
                const updatedPassword = {
                    oldpassword: values.oldPassword,
                    newpassword: values.newPassword
                }

                const res = await axios.put("/user/" + user._id + "/resetpassword", updatedPassword,
                    {
                        headers: {
                            Authorization: `Bearer ${jsonwebtoken}`
                        }
                    });
                // console.log(res)
                if (res.status === 201) { setState("wrongpassword") } else {
                    setState("successful");
                }

            } catch (err) {

                setState("unsuccessful");
            }
        }
    }




    const [values, setValues] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        showPassword1: false,
        showPassword2: false,
        showPassword3: false,
    });
    const [isError, setIsError] = useState(false)

    const handleClickShowPassword1 = () => {
        setValues({ ...values, showPassword1: !values.showPassword1 });
    };
    const handleClickShowPassword2 = () => {
        setValues({ ...values, showPassword2: !values.showPassword2 });
    };
    const handleClickShowPassword3 = () => {
        setValues({ ...values, showPassword3: !values.showPassword3 });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    useEffect(() => {
        const checkPasswords = async () => {
            if (values.newPassword !== values.confirmNewPassword) {
                setIsError(true);
            } else {
                setIsError(false);
            }
        }
        checkPasswords()
    }, [values.confirmNewPassword])


    const checkValidation = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
        // console.log(values)


    }



    return (
        <div>


            <Dialog maxWidth="md" classes={{ paper: classes.gridStyle }} onClose={handleClose} aria-labelledby="customized-dialog-title" open={changePasswordBoxDisplay} >
                {/* classes={{ paperWidthSm: classes.paperw }} */}
                <DialogTitle className={classes.titleStyle} id="customized-dialog-title" onClose={handleClose}>
                    Change Password
                </DialogTitle>
                <form onSubmit={handleSubmitPassword}>
                    <DialogContent  >

                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword1 ? 'text' : 'password'}
                                value={values.oldPassword}
                                onChange={handlePasswordChange('oldPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword1}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword1 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword2 ? 'text' : 'password'}
                                value={values.newPassword}
                                onChange={handlePasswordChange('newPassword')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword2}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword2 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword3 ? 'text' : 'password'}
                                value={values.confirmNewPassword}
                                onChange={checkValidation("confirmNewPassword")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword3}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword3 ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                        {isError &&
                            <Typography>Your New Password Should match with Confirm New Passord</Typography>
                        }


                    </DialogContent>

                    {
                        state !== "sending" && state !== "successful" &&
                        <DialogActions>
                            <Button
                                //  onClick={handleClose}
                                type="submit" className={classes.buttonStyle} variant="contained">
                                Update Password
                            </Button>
                        </DialogActions>
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
                            You have updated your password successfully!
                        </div>
                    }

                    {
                        state === "unsuccessful" &&
                        <div className="alert alert-danger" role="alert">
                            Something went wrong!!! Please try again later.
                        </div>
                    }
                    {
                        state === "wrongpassword" &&
                        <div className="alert alert-danger" role="alert">
                            Wrong Password!!
                        </div>
                    }

                    {
                        state === "sending" &&
                        <p>Loading...</p>
                    }
                </form>
            </Dialog>


        </div>
    )

}
