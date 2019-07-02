const apiUrl = 'guess/stories';

export default {
    get: function (axios) {
        return axios.get(apiUrl);
    },
    getById: function (axios, id) {
        return axios.get(apiUrl + '/' + id);
    }
}