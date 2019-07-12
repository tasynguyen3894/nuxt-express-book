<template>
    <div>
        <ul>
            <li :key="story.id" v-for="story in stories">{{ story.name }}</li>
        </ul>
    </div>
</template>
<script>
import storySerivce from '~/service/story.service'

export default {
    async asyncData({params, $axios, redirect}) {
        try {
            var storyDoc = await storySerivce.get();
            
        } catch (error) {
        }
        return {
            stories: storyDoc.data.stories
        }
    }
}
</script>
