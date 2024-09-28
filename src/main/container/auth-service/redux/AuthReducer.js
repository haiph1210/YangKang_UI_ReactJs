import { useState } from "react";

const initState = {
    tokenResponse: {
        token: '',
        user: {
            id: '',
            username: '',
            userCode: '',
            fullName: '',
            email: '',
            address: '',
            gender: '',
            status: '',
            role: '',
            imgUrl: '',
        }
    },
    auth: null,
    isLoading: false,
    isErrorr: false
}

const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case 'auth/login':
            return {
                ...state,
                isLoading: true,
                isErrorr: false
            }

        case 'auth/login-success':
            return {
                ...state,
                auth: true,
                tokenResponse: action.payload,
                isLoading: false,
                isErrorr: false
            }
        case 'auth/login-false':
            return {
                ...state,
                auth: false,
                tokenResponse: action.payload,
                isLoading: false,
                isErrorr: true
            }
        case 'auth/log-out':
            localStorage.removeItem('token')
            localStorage.removeItem('user');
            return {
                ...state,
                auth: null,
                tokenResponse: {
                    token: '',
                    user: {
                        id: '',
                        username: '',
                        userCode: '',
                        fullName: '',
                        email: '',
                        address: '',
                        gender: '',
                        status: '',
                        role: '',
                        imgUrl: '',
                    }
                },
                isLoading: false,
                isErrorr: false
            }
        case 'auth/refresh':
            return {
                ...state,
                auth: true,
                tokenResponse: {
                    token: localStorage.getItem('token'),
                    user: JSON.parse(localStorage.getItem('user'))
                }
            }
        default:
            return state;
    }
}

export default AuthReducer;