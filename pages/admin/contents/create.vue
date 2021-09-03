<template>
  <div class="w-full m-auto max-w-xs">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="content.title"
          type="text"
          placeholder="Title"
        >
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="content">Content</label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="content.text"
          type="text"
          placeholder="Content"
          rows="10"
        ></textarea>
        <p class="text-red-500 text-xs italic" v-text="message"></p>
      </div>
      <div class="flex flex-wrap items-center text-right">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          @click="create"
        >Create</button>
      </div>
    </div>
  </div>
</template>
<script>
import contentService from '~/service/content.service'

export default {
  layout: 'admin',
  middleware: 'authenticated',
  async asyncData({params, $axios, redirect, store}) {
  },
  data: () => {
    return {
      message: '',
      content: {
        text: '',
        title: ''
      },
      contentServiceAdmin: null
    }
  },
  created() {
    let token = this.$store.state.auth.token
    this.contentServiceAdmin = contentService.admin(token)
  },
  methods: {
    create() {
      let _this = this
      this.contentServiceAdmin.create(this.content).then(function (res) {
        if(res.status == 200) {
          _this.message = 'Create successfully'
        }
      }).catch(function (error) {
        _this.message = 'Error'
      })
    }
  }
}
</script>
