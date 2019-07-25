<template>
    <div>
        <div class="flex">
            <Content :key="content.id" v-for="content in contents" v-bind:content="content" />
        </div>
    </div>
</template>
<script>
import contentService from '~/service/content.service'
import Content from '~/components/admin/Content'

export default {
    layout: 'admin',
    middleware: 'authenticated',
    components: {
        Content
    },
    async asyncData({params, $axios, redirect, store}) {
        try {
            let token = store.state.auth.token
            let contentServiceAdmin = contentService.admin(token)
            var contentDoc = await contentServiceAdmin.get();
        } catch (error) {
        }
        return {
            contents: contentDoc.data.contents
        }
    }
}
</script>
