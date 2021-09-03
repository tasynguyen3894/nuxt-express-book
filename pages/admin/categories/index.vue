<template>
    <div>
        <div class="text-lg font-bold">Category</div>
        <div>
            <nuxt-link :to="{name: 'admin-categories-create'}">
                Create
            </nuxt-link>
        </div>
        <div class="flex flex-wrap">
            <Category :key="category.id" v-for="category in categories" v-bind:category="category" />
        </div>
    </div>
</template>
<script>
import categoryService from '~/service/category.service'
import Category from '~/components/admin/Category'

export default {
    layout: 'admin',
    middleware: 'authenticated',
    components: {
        Category
    },
    async asyncData({params, $axios, redirect, store}) {
        try {
            let token = store.state.auth.token
            let categoryServiceAdmin = categoryService.admin(token)
            var categoryDoc = await categoryServiceAdmin.get();
        } catch (error) {
            console.log(error)
        }
        return {
            categories: categoryDoc.data.categories
        }
    }
}
</script>
