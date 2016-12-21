<template>
  <div class="row text-xs-center categories-menu">

    <div class="col-sm-2" v-for="category in categories">
      <CategoryNavButton :category="category"></CategoryNavButton>
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