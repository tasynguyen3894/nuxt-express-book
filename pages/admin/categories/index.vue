<template>
    <div>
        <ul>
            <li :key="category.id" v-for="category in categories">
                <nuxt-link :to="{name: 'admin-categories-id', params: {id: category.id} }">
                    {{ category.name }}
                </nuxt-link>
            </li>
        </ul>
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
            var categoryDoc = await categorySerivceAdmin.get();
        } catch (error) {
            console.log(error)
        }
        return {
            categories: categoryDoc.data.categories
        }
    }
}
</script>
