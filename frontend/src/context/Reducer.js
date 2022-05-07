const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                user: null,
                jsonwebtoken: null,
                isFetching: true,
                error: false
            }

        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                jsonwebtoken: action.payload.jsonwebtoken,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                jsonwebtoken: null,
                isFetching: false,
                error: true
            };
        case "UPDATE_START":

            return {
                ...state,
                isFetching: true,
                error: false


            }

        case "UPDATE_SUCCESS":
            // console.log(action.payload)
            return {
                user: action.payload,
                jsonwebtoken: state.jsonwebtoken,
                isFetching: false,
                error: false
            }
        case "UPDATE_FAILURE":
            return {
                user: state.user,
                jsonwebtoken: state.jsonwebtoken,
                isFetching: false,
                error: true
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                jsonwebtoken: null,
                isFetching: false,
                error: false
            };
        case "DISPLAY_PASSWORD_CHANGE_WINDOW":
            return {
                ...state,
                changePasswordBoxDisplay: true
            };
        case "CLOSE_PASSWORD_CHANGE_WINDOW":
            return {
                ...state,
                changePasswordBoxDisplay: false
            };


        default: return state;
    }

}

export default reducer;