<template>
  <div class=" bg-teal-500">
    <nav class="container mx-auto w-950 flex items-center justify-between flex-wrap  py-4 mb-4">
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <nuxt-link
            :to="{name: 'index'}"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Tasy book (Beta 1.0)</nuxt-link>
          <nuxt-link
            :to="{name: 'categories'}"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >Categories</nuxt-link>
          <nuxt-link
            :to="{name: 'about'}"
            class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >About</nuxt-link>
        </div>
        <div>
          <a
            href="https://github.com/tasynguyen3894/nuxt-express-book"
            target="_blank"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-black border-white hover:border-black hover:text-black hover:bg-white mt-4 lg:mt-0"
          >Github</a>
          <a
            href="https://twitter.com/tasyit"
            target="_blank"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-twitter border-white hover:border-twitter hover:text-twitter hover:bg-white mt-4 lg:mt-0"
          >Twitter</a>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
