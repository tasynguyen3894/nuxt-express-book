<template>
  <div class="w-full m-auto max-w-xs">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Name</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="story.name"
          type="text"
          placeholder="Username"
        >
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Alias</label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="story.tiny_info"
          type="text"
          placeholder="Alias"
          rows="10"
        ></textarea>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Alias</label>
        <select
          class="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          v-model="story.category_id"
        >
          <option
            :key="category.id"
            :value="category.id"
            v-for="category in categories"
            v-text="category.name"
          ></option>
        </select>
        <p class="text-red-500 text-xs italic" v-text="message"></p>
      </div>
      <div class="flex items-center text-right">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="edit"
        >Edit</button>
      </div>
    </div>
  </div>
</template>
<script>
import storyService from "~/service/story.service";
import categoryService from "~/service/category.service";

export default {
  layout: "admin",
  middleware: "authenticated",
  async asyncData({ params, $axios, redirect, store }) {
    try {
      let token = store.state.auth.token;
      let storyServiceAdmin = storyService.admin(token);
      let categoryServiceAdmin = categoryService.admin(token);
      var storyDoc = await storyServiceAdmin.getById(params.story_id);
      var categoryDoc = await categoryServiceAdmin.get();
      var story = storyDoc.data.story;
      var categories = categoryDoc.data.categories;
      return {
        story: story,
        categories: categories,
        id: params.story_id
      };
    } catch (err) {
      redirect("/");
    }
  },
  data: () => {
    return {
      message: "",
      storyServiceAdmin: null,
      categoryServiceAdmin: null
    };
  },
  created() {
    let token = this.$store.state.auth.token;
    this.storyServiceAdmin = storyService.admin(token);
    this.categoryServiceAdmin = categoryService.admin(token);
  },
  methods: {
    edit() {
      let _this = this;
      this.storyServiceAdmin
        .update(this.id, this.story)
        .then(function(res) {
          if (res.status == 200) {
            _this.message = "Update success";
          }
        })
        .catch(function(error) {
          _this.message = "Error";
        });
    }
  }
};
</script>
