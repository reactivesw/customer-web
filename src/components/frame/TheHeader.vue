<template>
  <nav class="the-header navbar navbar-fixed-top navbar-dark bg-inverse">
    <div class="container">

      <router-link
        class="navbar-brand"
        :to="{ name: 'featureCategory' }">
        {{ $t('meta.brand') }}
      </router-link>

      <button class="navbar-toggler hidden-sm-up float-xs-right" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      </button>

      <div class="collapse navbar-toggleable-xs" id="navbarResponsive">
        <ul class="nav navbar-nav float-xs-right text-xs-right">
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
