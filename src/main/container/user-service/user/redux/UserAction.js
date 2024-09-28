import { findAllUser } from "../service/UserService";

export const findAllAction = (page) => {
    return async (dispatch) => {
      try {
        const res = await findAllUser(page);
        if (res && res.data.responseData) {
          const userList = res.data.responseData.content;
          dispatch({
            type: 'USER/findAll',
            payload: userList,
          });
        }
      } catch (error) {
        // Xử lý lỗi nếu có
      }
    };
  };

export const createUser = (userRequest) => {
    return{
        type: 'USER/create',
        payload: userRequest
    }
}
