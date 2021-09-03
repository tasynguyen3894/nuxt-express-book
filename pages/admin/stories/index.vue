<template>
    <div>
        <div class="text-lg font-bold">Story</div>
        <div>
            <nuxt-link :to="{name: 'admin-stories-create'}">
                Create
            </nuxt-link>
        </div>
        <div class="flex flex-wrap">
            <Story :key="story.id" v-for="story in stories" v-bind:story="story" />
        </div>
    </div>
</template>
<script>
import storyService from '~/service/story.service'
import Story from '~/components/admin/Story'

export default {
    layout: 'admin',
    middleware: 'authenticated',
    components: {
        Story
    },
    async asyncData({params, $axios, redirect, store}) {
        try {
            let token = store.state.auth.token
            let storyServiceAdmin = storyService.admin(token)
            var storyDoc = await storyServiceAdmin.get();
        } catch (error) {
        }
        return {
            stories: storyDoc.data.stories
        }
    }
}
</script>
