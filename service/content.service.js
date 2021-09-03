import utilService from './util.service'
import axios from 'axios'
const apiUrl = '/guess/contents';
const apiAdminUrl = '/admin/contents'

export default {
    get: function (params = {}) {
        return axios.get(utilService.baseUrl + apiUrl, {params: params});
    },
    getById: function (id, params = {}) {
        return axios.get(utilService.baseUrl + apiUrl + '/' + id, {params: params});
    },
    admin: function(token = '') {
        let headers = {
            'tasy-book-token': token
        };
        return {
            get: function (params = {}) {
                return axios.get(utilService.baseUrl + apiAdminUrl, {
                    params: params,
                    headers: headers
                });
            },
            getById: function (id) {
                return axios.get(utilService.baseUrl + apiAdminUrl + '/' + id, {
                    headers: headers
                });
            },
            update: function (id, data) {
                return axios.put(utilService.baseUrl + apiAdminUrl + '/' + id, 
                data, {
                    headers: headers
                });
            },
            create: function (data) {
                return axios.post(utilService.baseUrl + apiAdminUrl, 
                data, {
                    headers: headers
                });
            }
        }
    }
}