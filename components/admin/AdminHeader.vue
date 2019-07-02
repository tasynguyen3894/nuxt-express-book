<template>
    <div>
        <div v-if="$store.state.auth">
            <span @click="logout">Log Out</span>
        </div>
    </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined

export default {
    methods: {
        logout() {
            this.$store.commit('setAuth', null)
            Cookie.set('auth', null)
            this.$router.push('/admin/login')
        }
    }
}
</script>
