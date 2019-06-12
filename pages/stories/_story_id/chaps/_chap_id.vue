<template>
    <div>
        <div>{{ chap_id }}</div>
        <div v-if="chap.content">
            {{ chap.content.text }}
        </div>
    </div>
</template>
<script>
export default {
    async asyncData({params, $axios, redirect}) {
        try {
            let dataChap = await $axios.$get('/guess/stories/' + params.story_id + '/chaps/' + params.chap_id)
            var chap = dataChap.chap
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
