import { toast } from "react-toastify"
import { createPayment, createPaymentByVNPay, findAllPagePayment } from "../service/PaymentService"
import { useNavigate } from "react-router-dom"

export const findAllPagePaymentAction = (page) => {
    return async(dispatch) => {
        try {
            const res = await findAllPagePayment(page);
            if (res && res.responseData) {
                dispatch({
                    type: 'Payment/findAllPage',
                    payload: res.responseData
                })
            }
        } catch (error) {
            
        }
    }
}


export const createPaymentAction = (personCode,orderIds,discountId,customerPay,status) => {
    return async(dispatch) => {
        try {
            const res = await createPayment(personCode,orderIds,discountId,customerPay,status);
            if(res && res.responseData) {
                dispatch({
                    type: 'Payment/create'
                });
                toast.success("Create new payment success")
            } else{
                toast.error("Create new payment false")
            }
        } catch (error) {
            
        }
        
    }
}

export const createPaymentByVNPAYAction = (id,navigateCallBack) => {
    return async(dispatch) => {
        try {
            const res = await createPaymentByVNPay(id);
            if(res && res.responseData) {
                dispatch({
                    type: 'Payment/createByVNPay'
                });
                console.log(res.responseData.responseData);
                toast.success("Create new payment success");
                navigateCallBack(res.responseData.responseData);
            } 
        } catch (error) {
            
        }
        
    }
}

