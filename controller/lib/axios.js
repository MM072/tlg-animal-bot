const axios = require("axios")
const TOKEN = process.env.token

const BASE_URL =  `https://api.telegram.org/bot${TOKEN}`

function getAxiosInstance() {
    return{
        get(method, params) {
            return axios.get(`/${method}`, {
                baseURL: BASE_URL,
                params,
            })
        },

        post(method, data) {
            return axios({
                method:"post",
                baseURL: BASE_URL,
                url: `/${method}`,
                data,
            });
        }
    };
}

module.exports = { axiosInstance: getAxiosInstance() };