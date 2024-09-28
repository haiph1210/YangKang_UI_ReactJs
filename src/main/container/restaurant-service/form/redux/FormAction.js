import { toast } from "react-toastify";
import { findAll, findAllFormPage, updateBooked, updateMaintenance, updatePending, updateReady } from "../service/FormService";

export const findAllFormAction = () => {
    return async (dispatch) => {
        try {
            const res = await findAll();
            if (res && res.data.responseData) {
                const formList = res.data.responseData;
                dispatch({
                    type: 'FORM/findAll',
                    payload: formList,
                });
            }
        } catch (error) {
        }
    };
};

export const findAllPageFormAction = (page) => {
    return async (dispatch) => {
        try {
            const res = await findAllFormPage(page);
           
            if (res && res.data.responseData) {
                const formList = res.data.responseData;
                dispatch({
                    type: 'FORM/findAllPage',
                    payload: formList,
                });
            }
        } catch (error) {
        }
    };
};

export const updateReadyAction = (id) => {
    return async (dispatch) => {
        try{
            const res  = await updateReady(id);
            if(res && res.data.responseData) {
                const data = res.data.responseData;
                toast.success(data);
                dispatch({
                    type: 'FORM/updateReady'
                })
                dispatch(findAllPageFormAction())
            }else{
                toast.error("Cannot Update")
            }
        }catch(error) {

        }
    }
}

export const updatePendingAction = (id) => {
    return async (dispatch) => {
        try{
            const res  = await updatePending(id);
            if(res && res.data.responseData) {
                const data = res.data.responseData;
                toast.success(data);
                dispatch({
                    type: 'FORM/updatePending'
                })
                dispatch(findAllPageFormAction())
            }else{
                toast.error("Cannot Update")
            }
        }catch(error) {

        }
    }
}

export const updateMaintenanceAction = (id) => {
    return async (dispatch) => {
        try{
            const res  = await updateMaintenance(id);
            if(res && res.data.responseData) {
                const data = res.data.responseData;
                toast.success(data);
                dispatch({
                    type: 'FORM/updateMaintenance'
                })
                dispatch(findAllPageFormAction())
            }else{
                toast.error("Cannot Update")
            }
        }catch(error) {

        }
    }
}

export const updateBookedAction = (id) => {
    return async (dispatch) => {
        try{
            const res  = await updateBooked(id);
            if(res && res.data.responseData) {
                const data = res.data.responseData;
                toast.success(data);
                dispatch({
                    type: 'FORM/updateBooked'
                })
                dispatch(findAllPageFormAction())
            }else{
                toast.error("Cannot Update")
            }
        }catch(error) {

        }
    }
}
