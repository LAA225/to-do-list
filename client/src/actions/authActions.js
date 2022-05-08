import axios from 'axios';
import { returnErrors } from './errorActions';

import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR
} from './types';

//check token and load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });

    //get the user 
    axios.get('api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            });
        });
}

export const tokenConfig = getState => {
    // GET token from local storage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //if token add to headers
    if (token) {
        console.log('there was a token found in config')
        config.headers['x-auth-token'] = token
    }

    return config;
}

// send for registration of user 
export const register = (name, email, password) => dispatch => {
    console.log('in register')

    //create json body for post req
    const body = {
        name,
        email,
        password
    }
    console.log('body: ', body)

    //create headers
    const config = {
        'Content-type': 'application/json'
    }

    //send out request
    axios.post('api/users', body)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            console.log(err)
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// login user
export const login = (email, password) => dispatch => {
    const body = {
        email,
        password
    }

    axios.post('api/auth', body)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}