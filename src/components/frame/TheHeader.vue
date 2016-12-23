<template>
  <nav class="the-header navbar navbar-fixed-top navbar-dark bg-inverse">
    <div class="container">

      <a href="#" class="navbar-brand">{{ $t('meta.brand') }}</a>

      <button class="navbar-toggler hidden-sm-up float-xs-right" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      </button>

      <div class="collapse navbar-toggleable-xs" id="navbarResponsive">
        <ul class="nav navbar-nav float-xs-right text-xs-right">
          <li class="nav-item">
            <a href="#" class="nav-link">{{ $t('header.search') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">{{ $t('header.login') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">{{ $t('header.cart') }}</a>
          </li>
          <li class="nav-item">
            <LanguageSelector></LanguageSelector>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script lang="ts">
import LanguageSelector from './LanguageSelector'

export default {
  name: "TheHeader",
  components: {
    LanguageSelector
  }
}
</script>
