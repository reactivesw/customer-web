<template>
  <div class="container">
    <CategoriesMenu :categories="categories"></CategoriesMenu>
  </div>
</template>

<script lang="ts">
import CategoriesMenu from './CategoriesMenu'
import * as categoriesType from 'src/store/categories-types'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Category',

  computed: mapGetters({
    categories: categoriesType.GET_CATEGORIES
  }),

  methods: {
    ...mapActions({
      fetchCategories: categoriesType.FETCH_CATEGORIES
    })
  },

  created () {
    this.fetchCategories()
  },

  components: {
    CategoriesMenu
  }
}
</script>