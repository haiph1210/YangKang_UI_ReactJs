import axios from "../../../../../enviroments/enviroment-dev"

const findAllPagePayment = (page) => {
    return axios.get(`payment/findAll?page=${page}`);
}

const createPayment = (personCode,orderIds,discountId,customerPay,status) => {
    return axios.post(`payment/create`, {personCode,orderIds,discountId,customerPay,status})
}

const createPaymentByVNPay = (id) => {
    return axios.post(`/payment/paymentByVnPay/${id}`);
}

export {
    findAllPagePayment,
    createPayment,
    createPaymentByVNPay,
}