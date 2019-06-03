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
            <button type="button">Login</button>
        </div>
    </div>
</template>
<script>


export default {
    layout: 'empty',
    data() {
        return {
            email: '',
            password: ''
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
