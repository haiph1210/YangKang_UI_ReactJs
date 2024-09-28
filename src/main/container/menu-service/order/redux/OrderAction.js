import { toast } from "react-toastify";
import { createOrder, findAllOrder, findAllOrderByUserCode, findOrderById, updateOrderApproved, updateOrderRefuse } from "../service/OrderService";

export const findAllOrderPageAction = (page) => {
    return async(dispatch) => {
        try{
            const res = await findAllOrder(page);
            if(res && res.responseData) {
                dispatch({
                    type: 'Order/findAllPage',
                    payload: res.responseData
                })
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export const findAllOrderByUserCodeAction = (userCode) => {
    return async(dispatch) => {
        try{
            const res = await findAllOrderByUserCode(userCode);
            if(res && res.responseData) {
                dispatch({
                    type: 'Order/findAllByUserCode',
                    payload: res.responseData
                })
            }
        }catch(err){

        }
    }
}

export const findOrderByIdAction = (id) => {
    return async(dispatch) => {
        try{
            const res = await findOrderById(id);
            if(res) {
                dispatch({
                    type: 'Order/findById',
                    payload: res.responseData
                })
            }
        }catch(err){

        }
    }
}

export const updateApprovedAction = (id) => {
    return async(dispatch) => {
        try{
            const res = await updateOrderApproved(id);
            if(res && res.responseData) {
                toast(res.responseData);
                dispatch({
                    type: 'Order/updateOrderApproved'
                })
                dispatch(findAllOrderPageAction(1));
            }
        }catch(err) {
            console.log(err);
        }finally{
        }
        
    }
}

export const updateRefuseAction = (id) => {
    return async(dispatch) => {
        try{
            const res = await updateOrderRefuse(id);
            if(res && res.responseData) {
                dispatch({
                    type: 'Order/updateOrderRefuse'
                })
                toast(res.responseData);
                dispatch(findAllOrderPageAction(1));

            }
        }catch(err) {
            console.log(err);
        }finally{
        }
        
    }
}

export const createOrderAction = (personCode,idMenus,idCombos,idCarts,idForms,people,hour,description,type,onHide) => {
    return async(dispatch) => {
        try{
            const res = await createOrder(personCode,idMenus,idCombos,idCarts,idForms,people,hour,description,type);
            console.log(res);
            if(res&& res.responseData) {
                toast.success(`${personCode}create new order successfully`);
                dispatch(findAllOrderPageAction(1));
                onHide();
            }
        }catch(err){

        }
    }
}


export const findByOrderCode = () => {
    return async(dispatch) => {
        
    }
}


// export const findAllPageAction = () => {
//     return async(dispatch) => {
        
//     }
// }
