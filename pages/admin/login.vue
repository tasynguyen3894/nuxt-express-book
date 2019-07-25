<template>
  <div class="login-form">
    <div class="w-full m-auto max-w-xs">
      <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="email"
            type="text"
            placeholder="Username"
          >
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            v-model="password"
            type="password"
            placeholder="Password"
          >
          <p class="text-red-500 text-xs italic" v-text="message"></p>
        </div>
        <div class="flex flex-wrap items-center text-right">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            @click="login"
          >Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import authService from "~/service/auth.service";

export default {
  layout: "admin",
  middleware: "nonAuthenticated",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let _this = this;
      authService.login(this.email, this.password).then(function(response) {
        let { status, data } = response;
        if (status == 200 && data.token) {
          let auth = {
            token: data.token,
            user: data.user
          };
          _this.$store.commit("setAuth", auth);
          Cookie.set("auth", auth);
          _this.$router.push("/admin");
        }
      });
    }
  }
};
</script>
<style scoped>
div.login-form {
  width: 960px;
  margin: 50px auto;
}
</style>
