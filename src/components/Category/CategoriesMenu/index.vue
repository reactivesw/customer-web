<template>
  <div class="row text-xs-center categories-menu">

    <div class="col-sm-2" v-for="category in categories">
      <a href="#" class="btn btn-link btn-block btn-lg">{{ $t(category.name) }}</a>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'CategoriesMenu',
  props: {
    categories: Array
  }
}
</script>