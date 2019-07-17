<template>
  <div class="w-full">
    <h4 v-if="chap.content" class="text-2xl mb-5">{{ chap.content.title }}</h4>
    <div v-if="chap.content">
      <div class="text-md my-4 whitespace-pre-line" v-text="chap.content.text"></div>
      <ul class="px-5">
        <li class="text-md" :key="note.id" v-for="note in chap.content.notes">
          <b>{{ note.title }}:</b>
          <span>{{ note.text }}</span>
        </li>
      </ul>
      <div class="text-right mt-10 text-sm">{{ chap.page }}</div>
    </div>
  </div>
</template>
<script>
import chapService from "~/service/chap.service";

export default {
  async asyncData({ params, $axios, redirect }) {
    try {
      let dataChap = await chapService.getById(params.story_id, params.chap_id);
      var chap = dataChap.data.chap;
    } catch (err) {
      redirect("/");
    }
    return {
      chap_id: params.chap_id,
      chap: chap
    };
  }
};
</script>
