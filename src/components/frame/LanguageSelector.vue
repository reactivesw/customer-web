<template>
  <select class="form-control language-selector" @change="changeLang" id="exampleSelect1">
    <option value="select" selected>{{ $t('header.language') }}</option>
    <option value="en">English</option>
    <option value="zh">中文(简体)</option>
  </select>
</template>

<script lang="ts">
import * as Vue from 'vue'

export default {
  name: "LanguageSelector",
  methods: {
    changeLang: function (event) {
      Vue.config['lang'] = event.target.value
      event.target.selectedIndex = 0 // reset to "select language"
    }
  }
}
</script>
