<template>
    <div>
        <!-- <ul>
            <li :key="category.id" v-for="category in categories">
                <nuxt-link :to="{name: 'admin-categories-id', params: {id: category.id} }">
                    {{ category.name }}
                </nuxt-link>
            </li>
        </ul> -->
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
