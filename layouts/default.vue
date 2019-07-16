<template>
  <div class="">
    <DefaultHeader />
    <div class="container mx-auto px-20">
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
