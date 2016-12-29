import * as _ from 'lodash'
import { Component } from 'vue'

function help(this: Component, name, value, isClick: boolean) {
  // if selected, ignore
  // if availble, use the sku
  // else, use first sku with this attribute value
  const computedAttributes = this['computedAttributes']
  const selectedSku = computedAttributes.selectedSku
  const selectedAttributes = computedAttributes.skuAttributeMap[selectedSku]

  // is the current value the selected value
  const selected = selectedAttributes[name] === value
  // is the current value part of an available combination with current other selected attributes
  let available = false
  if (!selected) {
    const tryAttributes = { ...selectedAttributes, [name]: value }

    const skuAttributes = computedAttributes.skuAttributeMap
    const skus = Object.keys(skuAttributes)
    for (let sku of skus) {
      const attributesValues = skuAttributes[sku]
      available = _.isEqual(attributesValues, tryAttributes)
      if (available) {
        if (isClick) {
          this['$emit']('selectSku', sku)
        }
        break
      }
    }

    if (!isClick) {
      return {
        'btn-danger': selected,
        'btn-outline-danger': !selected && available,
        'btn-outline-secondary': !selected && !available
      }
    }

    if (!available && isClick) {
      for (let sku of skus) {
        const attributesValues = skuAttributes[sku]
        let found = attributesValues[name] === value
        if (found) {
          this['$emit']('selectSku', sku)
          break
        }
      }
    }

  }
}


export default {
  name: 'Product',

  props: {
    computedAttributes: Object,
  },

  methods: {
    checkState(this: Component, name, value) {
      return help.call(this, name, value, false)
    },

    handleAttributeClick(this: Component, name, value) {
      // if selected, ignore
      // if availble, use the sku
      // else, use first sku with this attribute value
      help.call(this, name, value, true)
    }
  }
}
