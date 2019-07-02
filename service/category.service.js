import utilService from './util.service'
import axios from 'axios'

export default {
    get: function () {
        return axios.get(utilService.baseUrl + '/guess/categories');
    }
}