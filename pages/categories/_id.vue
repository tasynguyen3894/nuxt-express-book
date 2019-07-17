<template>
    <div>
        <h1 class="font-bold border-b text-2xl mb-1">{{ category.name }}</h1>
        <div class="w-full">
            <Story :key="story.id" v-for="story in stories" v-bind:story="story" />
        </div>
    </div>
</template>
<script>
import Story from '~/components/template/Story'

export default {
    async asyncData({params, $axios, redirect}) {
        
        try {
            let dataCategory = await $axios.get('/guess/categories/' + params.id)
            let dataStory = await $axios.get('/guess/stories?category_id=' + params.id)
            return {
                id: params.id,
                category: dataCategory.data.category,
                stories: dataStory.data.stories
            }
        } catch (err) {
            redirect('/')
        }
        
    },
    components: {
        Story
    }
}
</script>
