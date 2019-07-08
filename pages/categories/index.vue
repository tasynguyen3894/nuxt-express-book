<template>
    <div>
        <ul>
            <li :key="category.id" v-for="category in categories">
                <nuxt-link :to="{name: 'categories-id', params: {id: category.id} }">
                    {{ category.name }}
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>
<script>
import categorySerivce from '~/service/category.service'

export default {
    async asyncData({params, $axios, redirect}) {
        try {
            var categoryDoc = await categorySerivce.get();
        } catch (error) {
        }
        return {
            categories: categoryDoc.data.categories
        }
    }
}
</script>
