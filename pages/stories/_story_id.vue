<template>
    <div>
        <div>{{ story.name }}</div>
        <div>
            <ul>
                <li :key="chap.id" v-for="chap in story.chaps">
                    <nuxt-link :to="{name: 'stories-story_id-chaps-chap_id', params: {story_id: story_id, chap_id: chap.id} }">
                        {{ chap.name }} {{ chap.page }}
                    </nuxt-link>
                </li>
            </ul>
            <nuxt-child/>
        </div>
    </div>
</template>
<script>
import storySerivce from '~/service/story.service'

export default {
    async asyncData({params, $axios, redirect}) {
        
        try {
            let dataStory = await storySerivce.getById($axios, params.story_id)
            dataStory.data.story.chaps = dataStory.data.story.chaps.sort(function (a, b) {
                return a.page - b.page
            })
            return {
                story_id: params.story_id,
                story: dataStory.data.story
            }
        } catch (err) {
            redirect('/')
        }
        
    },
    mounted() {
    }
}
</script>
