import axios from "../service/httpClient"

// import axios from "../../../../enviroments/enviroment-dev"
const URL = 'http://localhost:9001/api/'
const APILogin = (username, password) => {
    return axios.post('authenticate/login', { username, password });
}

const APIRegister = (username, password, firstName, lastName, email, phoneNumber, address, birthDay, gender) => {
    return axios.post('authenticate/register', { username, password, firstName, lastName, email, phoneNumber, address, birthDay, gender });
}

const APIChangePassword = (username, password) => {
    return axios.put('authenticate/change-password', { username, password });
}
export { APILogin, APIRegister, APIChangePassword }

