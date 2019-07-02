<template>
    <div class="login-form">
        <h1>Tasy Vue Book</h1>
        <div>
            <label for="">Email:</label>
            <input type="text" v-model="email">
        </div>
        <div>
            <label for="">Password:</label>
            <input type="password" v-model="password">
        </div>
        <div>
            <button type="button" @click="login">Login</button>
        </div>
    </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
import authService from '~/service/auth.service'

export default {
    layout: 'admin',
    middleware: 'nonAuthenticated',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            let _this = this
            _this.$store.commit('setAuth', {token: 'đsdssds'})
            console.log(this.$store.state.auth)
            authService.login(this.$axios, this.email, this.password).then(function (response) {
                let { status, data } = response
                if(status == 200 && data.token) {
                    let auth = {
                        token: data.token
                    }
                    _this.$store.commit('setAuth', auth)
                    Cookie.set('auth', auth)
                    _this.$router.push('/admin')
                }
            })
        }
    }
}
</script>
<style scoped>
    div.login-form {
        width: 960px;
        margin: 50px auto;
    }
</style>
