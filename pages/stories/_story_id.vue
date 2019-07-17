<template>
  <div>
    <h1 class="text-3xl px-2">{{ story.name }}</h1>
    <nuxt-link
      v-if="story.user"
      class="px-3 hover:text-teal-500 block py-2 text-md"
      :to="{name: 'users-user_id', params: {user_id: story.user.id} }"
      v-text="story.user.username"
    ></nuxt-link>
    <div class="flex border-t">
      <div class="flex w-1/5 border-gray-400 py-2 pl-2">
        <ul class="block w-full">
          <li>
            <nuxt-link
              @click="changeChapId(chap.id)"
              v-bind:class="[!chap_id ? 'text-teal-500' : '']"
              class="px-1 hover:text-teal-500 block"
              :to="{name: 'stories-story_id', params: {story_id: story_id} }"
            >Giới thiệu</nuxt-link>
          </li>
          <li :key="chap.id" v-for="chap in story.chaps">
            <nuxt-link
              @click="changeChapId(chap.id)"
              v-bind:class="[chap.id == chap_id ? 'text-teal-500' : '']"
              class="px-1 my-2 hover:text-teal-500 block"
              :to="{name: 'stories-story_id-chaps-chap_id', params: {story_id: story_id, chap_id: chap.id} }"
            >{{ chap.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="flex w-4/5 border-l mr-5 pl-2">
        <div v-if="!chap_id" v-text="story.tiny_info" class="whitespace-pre-line py-2 w-full"></div>
        <nuxt-child/>
      </div>
    </div>
  </div>
</template>
<script>
import storySerivce from "~/service/story.service";

export default {
  head() {
      return {
          title: this.story.name + ' | Story | Tasy Book'
      }
  },
  async asyncData({ params, $axios, redirect }) {
    try {
      let dataStory = await storySerivce.getById(params.story_id, {
        relation: "category,user"
      });
      dataStory.data.story.chaps = dataStory.data.story.chaps.sort(function(
        a,
        b
      ) {
        return a.page - b.page;
      });
      return {
        story_id: params.story_id,
        chap_id: params.chap_id ? params.chap_id : null,
        story: dataStory.data.story
      };
    } catch (err) {
      redirect("/");
    }
  },
  watch: {
    $route: function(to, from) {
      this.chap_id = to.params.chap_id;
    }
  }
};
</script>
