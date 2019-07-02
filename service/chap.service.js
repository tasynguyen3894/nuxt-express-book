import utilService from './util.service'
import axios from 'axios'
const apiUrl = 'guess/stories';

export default {
    get: function (storyId) {
        return axios.get(utilService.baseUrl + '/' + apiUrl + '/' + storyId + '/chaps');
    },
    getById: function (storyId, chapId) {
        return axios.get(utilService.baseUrl + '/' + apiUrl + '/' + storyId + '/chaps/' + chapId);
    }
}