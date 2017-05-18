import Vue from 'vue'
import Component from 'vue-class-component'

import { changeLang } from 'src/infrastructure/i18n'

@Component({})
export default class LanguageSelector extends Vue {
  changeLang(event) {
    changeLang(event.target.value) // this "changeLang" is from i18n
    event.target.selectedIndex = 0 // reset to "select language"
  }
}
