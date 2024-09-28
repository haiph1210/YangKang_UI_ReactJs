import { toast } from "react-toastify";
import { APIRegister } from "../service/AuthService";

export const RegisterAction = (username, password, firstName, lastName, email, phoneNumber, address, birthDay, gender) => {
    return async (dispatch) => {
        dispatch({
            type: 'auth/register'
        });
        try {
            const res = await APIRegister(username, password, firstName, lastName, email, phoneNumber, address, birthDay, gender);
            if(res&& res.responseData) {
                toast.success(`Register with username ${username} and email ${email} success`);
                dispatch({
                    type: 'auth/register-success',
                    payload: username, password, firstName, lastName, email, phoneNumber, address, birthDay, gender,
                })
            }else {
                if(res.status ===500) {
                    toast.error(res.data.responseData);
                    dispatch({
                        type: 'auth/register-false',
                    })
                }
            }
        } catch (error) {

        }
    }
}