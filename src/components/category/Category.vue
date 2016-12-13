<template>
  <div class="container">
    <CategoriesMenu :categories="categories"></CategoriesMenu>
  </div>
</template>

<script lang="ts">
import CategoriesMenu from './CategoriesMenu'

export default {
  name: 'Category',

  data() {
    return {
      categories: [
        { name: 'All' },
        { name: 'Cate1' },
        { name: 'Cate2' },
        { name: 'Cate3' },
        { name: 'Cate4' },
        { name: 'Cate5' }
      ]
    }
  },

  components: {
    CategoriesMenu
  }
}
</script>