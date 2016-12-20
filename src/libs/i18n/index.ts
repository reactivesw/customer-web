declare function require(moduleName: string): any

import * as Vue from 'vue'
import * as VueI18n from 'vue-i18n'
import Cookies = require('js-cookie')

export default function (Vue) {
  Vue.use(VueI18n)
  loadLocales(Vue)
  customizeTranslate(Vue)
  initLang()
}

export function changeLang (newLang) {
  Vue.config['lang'] = newLang
  Cookies.set('lang', newLang, { expires: 365 })
}

/**
 * change lang according to cookie
 */
function initLang() {
  const lang = Cookies.get('lang')
  if (lang) changeLang(lang)
}

function loadLocales(Vue) {
  let en = require(`./en.json`)
  let zh = require(`./zh.json`)
  let locales = { en, zh }

  // set lang context
  Object.keys(locales).forEach(key => {
    (Vue as any).locale(key, locales[key])
  })
}

function customizeTranslate(Vue) {
  let oldT = Vue.prototype['$t']

  Vue.prototype['$t'] = function (key, ...args) {
    let result = 'Locale String Not Found'
    if (typeof key === 'object') {
      result = key[Vue.config['lang']]
      if (!result) {
        result = key[Vue.config['fallbackLang']]
      }
    } else {
      result = oldT.call(this, key, ...args)
    }
    return result
  }
}
