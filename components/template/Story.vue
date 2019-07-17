<template>
    <div class="border-b px-3 py-3">
        <nuxt-link class="block text-lg font-bold hover:text-teal-500" :to="{name: 'stories-story_id', params: {story_id: story.id} }">
            {{ story.name }}
        </nuxt-link>
        <nuxt-link v-if="story.user" class="block text-md text-teal-500 font-bold hover:text-teal-500" :to="{name: 'users-user_id', params: {user_id: story.user.id} }">
            {{ story.user.username }}
        </nuxt-link>
        <div v-text="story.tiny_info" class="italic"></div>
    </div>
</template>
<script>
export default {
    props: {
        story: {
            required: true
        }
    }
}
</script>
