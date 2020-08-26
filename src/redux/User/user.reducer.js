import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    resetPasswordSuccess: false,
    userErr: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // Sign IN
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                userErr: [],
            };

        case userTypes.RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordSuccess: action.payload,
            };
        }

        case userTypes.USER_ERROR:
            return {
                ...state,
                userErr: action.payload,
            };

        // Sign OUT && Reset user state
        case userTypes.RESET_USER_STATE:
        case userTypes.SIGN_OUT_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
            };

        default:
            return state;
    }
};

export default userReducer;
