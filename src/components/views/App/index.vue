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
import s from './script'
export default s
</script>
