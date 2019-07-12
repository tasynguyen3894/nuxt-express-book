<template>
    <div>
        <div :key="story.id" v-for="story in stories">
            <nuxt-link :to="{name: 'stories-story_id', params: {story_id: story.id} }">
                   {{ story.name }}
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import storySerivce from '~/service/story.service'

export default {
    async asyncData({params, $axios, redirect}) {
        try {
            let dataStory = await storySerivce.get()
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
    }
}
</script>
<style scoped>

</style>
