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
  import { Component } from 'vue'
  import CategoryNavButton from './CategoryNavButton'
  import { FETCH_CATEGORIES } from 'src/infrastructure/store/modules/categories/actions'

  export default {
    name: 'CategoriesMenu',

    props: {
      categories: Array
    },

    created(this: Component) {
      this['fetchCategories']()
    },

    methods: {
      fetchCategories(this: Component) {
        return this['$store'].dispatch(FETCH_CATEGORIES)
      }
    },

    components: {
      CategoryNavButton
    }
  }
</script>

<style lang="scss">
  @import "~src/styles/init";

  .categories-menu {
    margin-top: -1rem;
    margin-bottom: 1rem;
    background-color: $gray-lightest;
  }
</style>
