<template>
    <div class="md:w-1/3 sm:w-full border m-1 px-3 py-3 text-center md:text-left">
        <nuxt-link class="block text-lg font-bold hover:text-teal-500" :to="{name: 'admin-stories-story_id', params: {story_id: story.id} }">
            {{ story.name }}
        </nuxt-link>
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
