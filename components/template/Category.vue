<template>
    <div class="md:w-1/3 sm:w-full border m-1 px-3 py-3 text-center md:text-left">
        <nuxt-link class="block text-lg font-bold hover:text-teal-500" :to="{name: 'categories-id', params: {id: category.id} }">
            {{ category.name }}
        </nuxt-link>
    </div>
</template>
<script>
export default {
    props: {
        category: {
            required: true
        }
    }
}
</script>
