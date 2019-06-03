import axios from 'axios'

export default {
    get: function () {
        return axios.get('http://localhost:3000/api/guess/categories');
    }
}