export default function ({ $axios, store, redirect }) {
    $axios.onResponse(res=>{
        res.data.status = res.status;        
        return res;
    })
    $axios.onRequest((config) => {
        // config.headers.common['_token'] = store.state.auth.token ? store.state.auth.token : null
   })
}