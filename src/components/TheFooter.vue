<template>
  <footer class="the-footer">
    <div class="container">
      <p class="text-muted">Reactivesw.</p>
    </div>
  </footer>
</template>

<script lang="ts">
  export default {
    name: 'TheFooter'
  }
</script>

<style lang="scss">
  @import "~src/styles/init";

  .the-footer {
    // Match the padding-bottom
    line-height: $footer-height;

    background-color: $footer-background-color;

    p {
      margin: 0;
    }
  }
</style>
