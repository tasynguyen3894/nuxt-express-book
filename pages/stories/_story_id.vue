<template>
  <div>
    <h1 class="text-3xl py-2">{{ story.name }}</h1>
    <div class="flex border-t">
      <div class="flex w-1/5 border-gray-400 border-r py-2 pl-2 mr-5">
        <ul class="block w-full">
          <li :key="chap.id" v-for="chap in story.chaps">
            <nuxt-link
              @click="changeChapId(chap.id)"
              v-bind:class="[chap.id == chap_id ? 'text-teal-500' : '']"
              class="px-1 hover:text-teal-500 block"
              :to="{name: 'stories-story_id-chaps-chap_id', params: {story_id: story_id, chap_id: chap.id} }"
            >{{ chap.name }}</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="flex w-4/5">
        <div v-if="!chap_id" v-text="story.tiny_info" class="whitespace-pre-line">

        </div>
        <nuxt-child/>
      </div>
    </div>
  </div>
</template>
<script>
import storySerivce from "~/service/story.service";

export default {
  async asyncData({ params, $axios, redirect }) {
    try {
      let dataStory = await storySerivce.getById($axios, params.story_id);
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
