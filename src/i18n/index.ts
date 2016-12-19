declare function require(moduleName: string): any

import * as VueI18n from 'vue-i18n'

export default function (Vue) {
  Vue.use(VueI18n)
  loadLocales(Vue)
  customizeTranslate(Vue)
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
