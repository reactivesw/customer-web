<template>
  <div id="content">
    <TopMenu></TopMenu>
    <router-view></router-view>
    <footer>Footer</footer>
  </div>
</template>

<script lang="ts">
import TopMenu from './TopMenu'

export default {
  name: 'app',
  components: {
    TopMenu
  }
}
</script>

<style lang="scss">
#content {
  padding-top: 54px;
}
</style>
