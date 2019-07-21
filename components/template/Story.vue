<template>
    <div class="md:w-1/3 sm:w-full py-5 border m-1 px-3 py-3">
        <nuxt-link class="block text-lg font-bold hover:text-teal-500" :to="{name: 'stories-story_id', params: {story_id: story.id} }">
            {{ story.name }}
        </nuxt-link>
        <nuxt-link v-if="story.user" class="block text-md text-teal-500 font-bold hover:text-teal-500" :to="{name: 'users-user_id', params: {user_id: story.user.id} }">
            {{ story.user.username }}
        </nuxt-link>
        <div v-text="formatTinyInfo(story.tiny_info)" class="italic max-h-100 overflow-hidden"></div>
    </div>
</template>
<script>
export default {
    props: {
        story: {
            required: true
        }
    },
    methods: {
        formatTinyInfo: function (tiny_info = '') {
            if(tiny_info.length > 100) {
                return tiny_info.substring(0, 97) + '...'
            }
            return tiny_info
        }
    }
}
</script>
