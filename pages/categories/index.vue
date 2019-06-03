<template>
    <div>
       <ul>
           <li :key="category.id" v-for="category in categories">{{ category.id }} - {{ category.name }}</li>
       </ul>
    </div>
</template>
<script>
export default {
    async asyncData({params, $axios, redirect}) {
        
        try {
            let data = await $axios.$get('/guess/categories')
            return {
                categories: data.categories
            }
        } catch (err) {
            redirect('/')
        }
        
    },
    mounted() {
    }
}
</script>
