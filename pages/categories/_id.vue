<template>
    <div>
        <h1 class="font-bold border-b text-2xl mb-1">{{ category.name }}</h1>
        <div class="w-full flex">
            <Story :key="story.id" v-for="story in stories" v-bind:story="story" />
        </div>
    </div>
</template>
<script>
import Story from '~/components/template/Story'
import storySerivce from '~/service/story.service'
import categorySerivce from '~/service/category.service'

export default {
    head() {
        return {
            title: this.category.name + ' | Categories | Tasy Book'
        }
    },
    async asyncData({params, $axios, redirect}) {
        
        try {
            let dataCategory = await categorySerivce.getById(params.id)
            let dataStory = await storySerivce.get({category_id: params.id, relation: "category,user"})
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
