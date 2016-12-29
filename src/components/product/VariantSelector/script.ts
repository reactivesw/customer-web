import * as _ from 'lodash'
import { Component } from 'vue'

export default {
  name: 'Product',

  props: {
    computedAttributes: Object,
  },

  methods: {
    // bind to selector styles 
    checkState(this: Component, name, value) {
      const computedAttributes = this['computedAttributes']
      const result = computeStates(computedAttributes, name, value)
      return {
        'btn-danger': result.selected,
        'btn-outline-danger': !result.selected && result.available,
        'btn-outline-secondary': !result.selected && !result.available
      }
    },

    // bind to click event 
    handleAttributeClick(this: Component, name, value) {
      // if selected, ignore
      // if available, use the matched available sku
      // else, use first sku with the same attribute value
      const computedAttributes = this['computedAttributes']
      const result = computeStates(computedAttributes, name, value)

      if (!result.selected) {
        this['$emit']('selectSku', result.selectedSku)
      }
    }
  }
}

function computeStates(computedAttributes, name, value) {
  let selectedSku = computedAttributes.selectedSku
  const selectedAttributes = computedAttributes.skuAttributeMap[selectedSku]

  // is the current value the selected value
  const selected = selectedAttributes[name] === value

  // is the current value part of an available combination with current other selected attributes
  let available = false

  if (!selected) {
    const tryAttributes = { ...selectedAttributes, [name]: value }
    const skuAttributes = computedAttributes.skuAttributeMap
    const result = getAvailableSku(tryAttributes, skuAttributes, name)
    available = result.available
    selectedSku = result.nextSku
  }

  return {
    selected,
    available,
    selectedSku
  }
}

function getAvailableSku(tryAttributes, skuAttributes, name) {
  let available = false

  // if availble, use the sku
  // else, use the first sku with this attribute value
  let nextSku

  const skus = Object.keys(skuAttributes)
  for (let sku of skus) {
    const attributesValues = skuAttributes[sku]
    // first try to match all other selected attribute values 
    available = _.isEqual(attributesValues, tryAttributes)
    if (available) {
      nextSku = sku
      break
    }

    // set the fallback next sku: the first sku that has the same attribute value
    if (!nextSku && (attributesValues[name] === tryAttributes[name])) {
      nextSku = sku
    }
  }

  return {
    available,
    nextSku
  }
}
