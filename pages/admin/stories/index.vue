<template>
    <div>
        <!-- <ul>
            <li :key="category.id" v-for="category in categories">
                <nuxt-link :to="{name: 'admin-categories-id', params: {id: category.id} }">
                    {{ category.name }}
                </nuxt-link>
            </li>
        </ul> -->
        <div class="flex">
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
