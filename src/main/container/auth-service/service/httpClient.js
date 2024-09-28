import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:9001/api',
    responseType: 'json',
    headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
    },
})

instance.interceptors.response.use(
    (response) => {
        return response.data ? response.data : { statusCode: response.status };
    },
    (error) => {
        let res = {};
        if (error.response) {
            res.data = error.response.data;
            res.status = error.response.status
            res.headers = error.response.headers
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return res;
    }
)
export default instance;