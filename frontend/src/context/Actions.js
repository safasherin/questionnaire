export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
});


export const LoginSuccess = (user, jsonwebtoken) => ({
    type: "LOGIN_SUCCESS",
    payload: { user, jsonwebtoken }
});


export const LoginFailure = (error) => ({
    type: "LOGIN_START",

});
export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"
});


export const UpdateSuccess = (user, jsonwebtoken) => ({
    type: "UPDATE_SUCCESS",
    payload: { user, jsonwebtoken }
});


export const UpdateFailure = (error) => ({
    type: "UPDATE_FAILURE",
    payload: error,
});
export const Logout = (error) => ({
    type: "LOGOUT"

});
export const DisplayChangePasswordWindow = () => ({ type: "DISPLAY_PASSWORD_CHANGE_WINDOW" });
export const CloseChangePasswordWindow = () => ({ type: "CLOSE_PASSWORD_CHANGE_WINDOW" });
