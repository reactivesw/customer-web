<template>
  <div>
    <TheHeader></TheHeader>

    <div class="content-wrapper">
      <router-view></router-view>
    </div>

    <TheFooter></TheFooter>
  </div>
</template>

<script lang="ts">
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'app',
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
