<template>
  <div class=" overflow-hidden">
    <DefaultHeader />
    <div class="container mx-auto md:w-950 p-2">
      <nuxt />
    </div>
    <DefaultFooter />
  </div>
</template>
<script>
import DefaultHeader from '~/components/template/DefaultHeader'
import DefaultFooter from '~/components/template/DefaultFooter'

export default {
  components: {
    DefaultHeader,
    DefaultFooter
  }
}
</script>

<style>

</style>
