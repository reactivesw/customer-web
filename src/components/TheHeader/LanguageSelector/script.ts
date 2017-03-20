import * as Vue from 'vue'
import { changeLang } from 'src/infrastructure/i18n'

export default {
  name: 'LanguageSelector',
  methods: {
    changeLang: function (event) {
      changeLang(event.target.value) // this "changeLang" is from i18n
      event.target.selectedIndex = 0 // reset to "select language"
    }
  }
}
