import utilService from './util.service'
import axios from 'axios'

export default {
    login: function (email, password) {
        return axios.post(utilService.baseUrl + '/auth/login', {
            email: email,
            password: password
        });
    }
}