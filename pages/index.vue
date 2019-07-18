<template>
    <div class="w-full flex">
        <Story :key="story.id" v-for="story in stories" v-bind:story="story" />
    </div>
</template>
<script>
import storySerivce from '~/service/story.service'
import Story from '~/components/template/Story'

export default {
    head() {
        return {
            title: 'Home | Tasy Book'
        }
    },
    async asyncData({params, $axios, redirect}) {
        try {
            let dataStory = await storySerivce.get({relation: "category,user"})
            let stories = dataStory.data.stories.map(function (story) {
                story.chaps = story.chaps.sort(function (a, b) {
                    return a.page - b.page
                })
                return story
            })
            return {
                stories: stories
            }
        } catch (err) {
            return {
                stories: []
            }
        }
    },
    components: {
        Story
    }
}
</script>
<style scoped>

</style>
