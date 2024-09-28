import React from 'react'
const initState = {
  register: {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDay: '',
    gender: ''
  },
  isLoading: false,
  isError: false
}
const RegisterReducer = (state = initState, action) => {
  switch (action.type) {
    case 'auth/register': {
      return {
        ...state,
        isLoading: true,
        isError: false,
      }
    }
    case 'auth/register-success':
      return {
        ...state,
        register: {
          username: action.payload.username,
          password: action.payload.password,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          phoneNumber: action.payload.phoneNumber,
          address: action.payload.address,
          birthDay: action.payload.birthDay,
          gender: action.payload.gender,
        },
        isLoading: false,
        isError: false,
      }
    case 'auth/register-false':
      return {
        ...state,
        isLoading: false,
        isError: true,
      }
    default:
      return state;
  }

}

export default RegisterReducer
