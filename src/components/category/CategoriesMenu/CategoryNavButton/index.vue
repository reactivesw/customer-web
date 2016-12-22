<template>
  <router-link
    class="btn btn-link btn-block btn-lg"
    :to="{ name: 'categories', params: { 'catId': category.id }}">
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