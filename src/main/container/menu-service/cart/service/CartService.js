import axios from "axios"

const URL = "http://localhost:8000/api/cart/"
const findAllCart = (page) => {
    return axios.get(URL+`findPage?page=${page}`);
}

const findByUserCode = (userCode) => {
    return axios.get(URL+ `userCode/${userCode}`);
}

const findByUserCodeV2 = (userCode) => {
    return axios.get(URL+ `userCodeV2/${userCode}`);
}

const total = (userCode) => {
    return axios.get(URL+`total/${userCode}`);
}
const createCart = (userCode,code,amount) => {
    return axios.post(URL + "create",{userCode,code,amount})
}

const updateCart = (id,userCode,code,amount) => {
    return  axios.put(URL + `update/${id}`,{userCode,code,amount})
}

const deleteCart = (id) => {
    return axios.delete(URL + `delete/${id}`)
}

const findAllCartPage = (page) => {
    return axios.get(URL+`findPage?page=${page}`).then(data => data);
}
export{findAllCart,findByUserCode,findByUserCodeV2,createCart,updateCart,deleteCart,total,findAllCartPage}
