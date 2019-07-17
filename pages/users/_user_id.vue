<template>
  <div>
    <h1 v-text="user.username" class="text-2xl font-bold border-b py-1"></h1>
    <span class="py-2 block">
      Email:
      <a v-bind:href="'mailto:'+user.email" class="text-teal-500" v-text="user.email"></a>
    </span>
  </div>
</template>
<script>
import userSerivce from "~/service/user.service";

export default {
  head() {
    return {
      title: this.user.username + " | User | Tasy Book"
    };
  },
  async asyncData({ params, $axios, redirect }) {
    try {
      // let dataCategory = await $axios.get('/guess/categories/' + params.id)
      let dataUser = await userSerivce.getById(params.user_id);
      return {
        user_id: params.user_id,
        user: dataUser.data.user
      };
    } catch (err) {
      redirect("/");
    }
  }
};
</script>
