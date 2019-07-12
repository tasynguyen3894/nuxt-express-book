<template>
    <div>
        <div>
            <input type="text" v-model="category.name">
        </div>
    </div>
</template>
<script>
import categorySerivce from '~/service/category.service'

export default {
    layout: 'admin',
    middleware: 'authenticated',
    async asyncData({params, $axios, redirect}) {
        
        try {
            var categoryDoc = await categorySerivce.getById(params.id);
            let category = categoryDoc.data.category
            return {
                category: category,
                id: params.id
            }
        } catch (err) {
            redirect('/')
        }
        
    },
    mounted() {
    }
}
</script>
