export default {
    get: function (axios) {
        return axios.$get('guess/stories');
    }
}