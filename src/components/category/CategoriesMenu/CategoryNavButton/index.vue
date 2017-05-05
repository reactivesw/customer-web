<template>
  <router-link
    class="category-btn"
    :to="{ name: 'categories', params: { 'catSlug': category.slug }}">
    {{ $t(category.name) }}
  </router-link>
</template>

<script lang="ts">
  export default {
    name: 'CategoriesNavButton',

    props: {
      category: Object
    }
  }
</script>

<style lang="scss">
  @import "~src/styles/init";

  .category-btn {
    border-radis: 0;
    background-color: $gray-lightest;
    padding: 10px 20px;
    color: $gray;
    display: inline-block;
    text-decoration: none !important;

    &:hover,
    &:active {
      background-color: $gray-lighter;
    }
  }
</style>
