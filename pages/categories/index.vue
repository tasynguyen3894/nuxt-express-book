<template>
    <div class="w-full flex">
        <Category v-bind:category="category" :key="category.id" v-for="category in categories" />
    </div>
</template>
<script>
import categorySerivce from '~/service/category.service'
import Category from '~/components/template/Category'

export default {
    head() {
        return {
            title: 'Category | Tasy Book'
        }
    },
    components: {
        Category
    },
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
