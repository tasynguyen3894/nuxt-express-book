import utilService from './util.service'
import axios from 'axios'
const apiUrl = '/guess/categories'

export default {
    get: function (params = {}) {
        return axios.get(utilService.baseUrl + apiUrl, {
            params: params
        });
    },
    getById: function (id) {
        return axios.get(utilService.baseUrl + apiUrl + '/' + id);
    }
}