<template>
  <div class="categories-menu">
    <div class="container">
      <div class="row text-xs-center">

        <div class="col">
          <CategoryNavButton v-for="(category, index) in categories" :key="index" :category="category"></CategoryNavButton>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import CategoryNavButton from './CategoryNavButton'

  export default {
    name: 'CategoriesMenu',

    props: {
      categories: Array
    },

    components: {
      CategoryNavButton
    }
  }
</script>

<style lang="scss">
  @import "~src/styles/init";

  .categories-menu {
    margin-bottom: 1rem;
    background-color: $gray-lightest;
  }
</style>
