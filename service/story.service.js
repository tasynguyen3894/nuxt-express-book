import utilService from './util.service'
import axios from 'axios'
const apiUrl = '/guess/stories';

export default {
    get: function (params = {}) {
        return axios.get(utilService.baseUrl + apiUrl, {params: params});
    },
    getById: function (axios, id) {
        return axios.get(apiUrl + '/' + id);
    }
}