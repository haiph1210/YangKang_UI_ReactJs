import { toast } from 'react-toastify';
import { APILogin } from '../service/AuthService'
import { useNavigate } from 'react-router-dom';
export const LoginAction = (username, password,navigateCallBack) => {
    return async (dispatch) => {
        dispatch({
            type: 'auth/login',
        });
        try {
            const res = await APILogin(username, password);
            if (res && res.responseData) {
                const dataRes = res.responseData;
                const userJson = JSON.stringify(dataRes.user);
                localStorage.setItem('token',dataRes.token);
                localStorage.setItem('user',userJson);
                dispatch({
                    type: 'auth/login-success',
                    payload: dataRes,
                })
                toast.success("Login Success,Navigate To Home <3");
                navigateCallBack();
            } else {
                if (res && res.status === 500) {
                    toast.error(res.data.responseData);
                    dispatch({
                        type: 'auth/login-false',
                    })
                }
            }
        } catch (error) {

        }
    }
}


export const LogOutAction = () => {
    return{
        type: 'auth/log-out',
    }
}

export const RefreshAction = () => {
    return (dispatch) => {
        dispatch({
            type: 'auth/refresh',
        })
    }
}