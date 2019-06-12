<template>
    <div>
        {{ id }} - {{ category.name }}
        <ul>
           <li :key="story.id" v-for="story in stories">
               <nuxt-link :to="{name: 'stories-story_id', params: {story_id: story.id} }">
                   {{ story.name }}
               </nuxt-link>
            </li>
       </ul>
    </div>
</template>
<script>
export default {
    async asyncData({params, $axios, redirect}) {
        
        try {
            let dataCategory = await $axios.$get('/guess/categories/' + params.id)
            let dataStory = await $axios.$get('/guess/stories?category_id=' + params.id)
            return {
                id: params.id,
                category: dataCategory.category,
                stories: dataStory.stories
            }
        } catch (err) {
            redirect('/')
        }
        
    },
    mounted() {
        console.log(this.$route.params.id)
    }
}
</script>
