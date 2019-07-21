<template>
  <div>
    <h1 v-text="user.username" class="text-3xl font-bold border-b py-1"></h1>
    <span class="py-2 block">
      Email:
      <a v-bind:href="'mailto:'+user.email" class="text-teal-500" v-text="user.email"></a>
    </span>
    <h3 class="text-2xl font-bold border-b py-1">Stories</h3>
    <div class="w-full md:flex">
      <Story :key="story.id" v-for="story in stories" v-bind:story="story" />
    </div>
  </div>
</template>
<script>
import userSerivce from "~/service/user.service";
import storySerivce from '~/service/story.service'
import Story from '~/components/template/Story'

export default {
  head() {
    return {
      title: this.user.username + " | User | Tasy Book"
    };
  },
  components: {
    Story
  },
  async asyncData({ params, $axios, redirect }) {
    try {
      // let dataCategory = await $axios.get('/guess/categories/' + params.id)
      let dataUser = await userSerivce.getById(params.user_id);
      let dataStory = await storySerivce.get({user_id: params.user_id})
      return {
        user_id: params.user_id,
        user: dataUser.data.user,
        stories: dataStory.data.stories
      };
    } catch (err) {
      redirect("/");
    }
  }
};
</script>
