import axios from "axios"

const URL = "http://localhost:8002/api/restaurant/form/"

const findAllFormPage = (page) => {
    return axios.get(URL+`findAllPage?page=${page}`)
}
const findAll = () => {
    return axios.get(URL+`findAll`)
}
const updateReady = (id) => {
    return axios.put(URL + `updateReady/${id}`)
}

const updatePending = (id) => {
    return axios.put(URL + `updatePending/${id}`)
}

const updateMaintenance = (id) => {
    return axios.put(URL + `updateRefuse/${id}`)
}

const updateBooked = (id) => {
    return axios.put(URL + `updateBooked/${id}`)
}

export {findAllFormPage,findAll,updateReady,updatePending,updateMaintenance,updateBooked}