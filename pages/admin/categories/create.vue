<template>
  <div class="w-full m-auto max-w-xs">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Name</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="category.name"
          type="text"
          placeholder="Username"
        >
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Alias</label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          v-model="category.alias"
          type="text"
          placeholder="Alias"
        >
        <p class="text-red-500 text-xs italic" v-text="message"></p>
      </div>
      <div class="flex items-center text-right">
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
import categorySerivce from '~/service/category.service'

export default {
  layout: 'admin',
  middleware: 'authenticated',
  async asyncData({params, $axios, redirect, store}) {
      
      try {
          let token = store.state.auth.token
          let categorySerivceAdmin = categorySerivce.admin(token)
          var categoryDoc = await categorySerivceAdmin.getById(params.category_id);
          let category = categoryDoc.data.category
          return {
              category: category,
              id: params.category_id
          }
      } catch (err) {
          redirect('/')
      }
  },
  data: () => {
    return {
      message: '',
      categorySerivceAdmin: null
    }
  },
  created() {
    let token = this.$store.state.auth.token
    this.categorySerivceAdmin = categorySerivce.admin(token)
  },
  methods: {
    create() {
      let _this = this
      this.categorySerivceAdmin.create(this.category).then(function (res) {
        if(res.status == 200) {
          _this.message = 'Update success'
        }
      }).catch(function (error) {
        _this.message = 'Error'
      })
    }
  }
}
</script>
