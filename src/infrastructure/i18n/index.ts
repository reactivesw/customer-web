import * as Vue from 'vue'
import * as VueI18n from 'vue-i18n'
import * as Cookies from 'js-cookie'

export default function (Vue) {
  Vue.use(VueI18n)
  loadLocales(Vue)
  customizeTranslation(Vue)
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
  let zh_cn = require(`./zh_cn.json`)
  let locales = { en, zh_cn }

  // set lang context
  Object.keys(locales).forEach(key => {
    (Vue as any).locale(key, locales[key])
  })
}

function customizeTranslation(Vue) {
  let oldT = Vue.prototype['$t']

  Vue.prototype['$t'] = function (this: Vue.Component, key, ...args) {
    let result
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
