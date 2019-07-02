<template>
    <div>
        <div>{{ chap_id }}</div>
        <div v-if="chap.content">
            {{ chap.content.text }}
            <div :key="note.id" v-for="note in chap.content.notes">
                <b>{{ note.title }}:</b> <span>{{ note.text }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import chapService from '~/service/chap.service'

export default {
    async asyncData({params, $axios, redirect}) {
        try {
            let dataChap = await chapService.getById(params.story_id, params.chap_id)
            var chap = dataChap.data.chap
        } catch (err) {
            redirect('/')
        }
        return {
            chap_id: params.chap_id,
            chap: chap
        }
    },
}
</script>
