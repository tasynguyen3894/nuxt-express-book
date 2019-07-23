<template>
  <div class=" bg-black">
    <nav  v-if="$store.state.auth" class="container mx-auto w-950 flex items-center justify-between flex-wrap  py-4 mb-4">
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <nuxt-link :to="{name: 'admin'}" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">Admin</nuxt-link>
          <nuxt-link
            :to="{name: 'admin-categories'}"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >Categories</nuxt-link>
          <nuxt-link
            :to="{name: 'about'}"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >About</nuxt-link>
        </div>
        <div>
          <a
            href="https://github.com/tasynguyen3894/nuxt-express-book"
            target="_blank"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-black border-white hover:border-white hover:text-black hover:bg-white mt-4 lg:mt-0"
            v-text="$store.state.auth.user.username"
          ></a>
          <a
            @click="logout"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-twitter border-white hover:border-twitter hover:text-twitter hover:bg-white mt-4 lg:mt-0"
          >Logout</a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  methods: {
    logout() {
      this.$store.commit("setAuth", null);
      Cookie.set("auth", null);
      this.$router.push("/admin/login");
    }
  }
};
</script>
