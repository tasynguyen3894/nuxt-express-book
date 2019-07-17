<template>
    <div>
        {{ user_id }}
    </div>
</template>
<script>
export default {
    async asyncData({params, $axios, redirect}) {
        
        try {
            // let dataCategory = await $axios.get('/guess/categories/' + params.id)
            // let dataStory = await $axios.get('/guess/stories?category_id=' + params.id)
            return {
                user_id: params.user_id
            }
        } catch (err) {
            redirect('/')
        }
        
    }
}
</script>
