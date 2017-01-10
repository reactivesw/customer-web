<template>
  <nav class="the-header navbar fixed-top navbar-toggleable-md navbar-inverse bg-inverse">
    <div class="container">

      <router-link
        class="navbar-brand"
        :to="{ name: 'featureCategory' }">
        {{ $t('meta.brand') }}
      </router-link>

      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">{{ $t('header.search') }}</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click="showLogin">{{ $t('header.login') }}</a>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'cart' }">
              {{ $t('header.cart') }}
            </router-link>
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
import { mapActions } from 'vuex'
import LanguageSelector from './LanguageSelector'
import { SHOW_LOGIN } from 'src/infrastructure/store/modal_dialogs_types'

export default {
  name: "TheHeader",

  methods: {
    ...mapActions({
      showLogin: SHOW_LOGIN
    })
  },

  components: {
    LanguageSelector
  }
}
</script>
