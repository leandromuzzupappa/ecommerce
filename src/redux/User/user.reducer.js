import userTypes from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    signInSuccess: false,
    signInError: [],
    signUpSuccess: false,
    signUpError: [],
    resetPasswordSuccess: false,
    resetPasswordError: []
}

const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {

        // user
        case userTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        
        // sign in
        case userTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                signInSuccess: action.payload
            }
        case userTypes.SIGN_IN_ERROR:
            return {
                ...state,
                signInError: action.payload
            }

        // sign up
        case userTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                signUpSuccess: action.payload
            }
        case userTypes.SIGN_UP_ERROR:
            return {
                ...state,
                signUpError: action.payload
            }
        
        // reset pw
        case userTypes.resetPasswordSuccess:
            return {
                ...state,
                resetPasswordSuccess: action.payload
            }
        case userTypes.resetPasswordError:
            return {
                ...state,
                resetPasswordError: action.payload
            }
        
        // reset forms
        case userTypes.RESET_AUTH_FORMS:
            return {
                ...state,
                signInSuccess: false,
                signInError: [],
                signUpSuccess: false,
                signUpError: [],
                resetPasswordSuccess: false,
                resetPasswordError: []
            }

        default:
            return state;
    }
}

export default userReducer;