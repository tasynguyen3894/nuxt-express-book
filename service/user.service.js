import utilService from './util.service'
import axios from 'axios'
const apiUrl = 'guess/users';

export default {
    get: function (params = {}) {
        return axios.get(utilService.baseUrl + apiUrl, {params: params});
    },
    getById: function (id, params = {}) {
        return axios.get(utilService.baseUrl + apiUrl + '/' + id, {params: params});
    }
}