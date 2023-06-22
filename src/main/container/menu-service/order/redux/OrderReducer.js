const initState = {
    orders: [],
    totalPages: 0,
}

const OrderReducer = (state = initState, action) => {
    switch (action.type) {
        case 'Order/findAllPage':
            return {
                ...state,
                orders: action.payload.content,
                totalPages: action.payload.totalPages,
            }
            break;

        case 'Order/findAllListApproved':
            return {
                ...state,
                orders: action.payload,
            }
            break;

        case 'Order/findAllByUserCode':
            return {
                ...state,
                orders: action.payload,
            }
            break;

        default:
            return state;
    }
}

export default OrderReducer;