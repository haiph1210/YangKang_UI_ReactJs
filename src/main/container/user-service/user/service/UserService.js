import axios from "axios"

// import axios from '../../../../../enviroments/enviroment-dev'
const URL = "http://localhost:8001/api/user/"

const findAllUser = (page) => {
    return axios.get(URL+`findPage?page=${page}`);
}

const findByUserCode = (userCode) => {
    return axios.get(URL+`userCode/${userCode}`)
}

const updateAvartar = (username,imgUrl) => {
    const formData = new FormData();
    formData.append('username',username);
    formData.append('imgUrl',imgUrl);
    return axios.post(URL+`updateAvartar`,formData, {
        headers: {
            "Content-Type" : "form-data",
        }
    })
}

export {findAllUser,findByUserCode,updateAvartar}