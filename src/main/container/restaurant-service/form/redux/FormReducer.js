const initState = {
    formList: [{
        id: '',
        masterialName: '',
        formCode: '',
        status: ''
    }],
    totalPages: 0,

}

const FormReducer = (state = initState, action) => {
    switch (action.type) {
        case "FORM/findAll":
            return {
                ...state,
                formList: action.payload,
            }
            break;

        case "FORM/findAllPage":
            return {
                ...state,
                formList: action.payload.content,
                totalPages: action.payload.totalPages
            }
            break;

        default:
            return state;
    }
}


export default FormReducer;