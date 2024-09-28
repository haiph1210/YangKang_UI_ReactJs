const initState = {
    payment: [],
    totalPage: 0,
}

const PaymentReducer = (state = initState, action) => {
    switch (action.type) {
        case 'Payment/findAllPage':
            return {
                ...state,
                payment: action.payload.content,
                totalPage: action.payload.totalPages,
            };

        default:
            return state;
    }
}

export default PaymentReducer;