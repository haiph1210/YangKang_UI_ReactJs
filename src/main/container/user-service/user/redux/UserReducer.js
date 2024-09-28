import React from 'react';

const INITSTATE = {
    userList: []
}


const UserReducer = (state = INITSTATE, action) => {
    switch (action.type) {
        case 'USER/findAll':
            return {
                ...state,
                userList: action.payload,
            }
        default:
            return state;
    }
}

export default UserReducer;
