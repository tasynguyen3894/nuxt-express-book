<template>
    <div>
        admin
    </div>
</template>
<script>
import authService from '~/service/auth.service'

export default {
    layout: 'admin',
    middleware: 'authenticated',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
    div.login-form {
        width: 960px;
        margin: 50px auto;
    }
</style>
