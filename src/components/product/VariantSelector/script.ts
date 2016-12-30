import * as _ from 'lodash'
import { Component } from 'vue'

export default {
  name: 'VariantSelector',

  props: {
    variantsAttributes: Object,
    currentSku: String
  },

  methods: {
    // bind to selector styles
    checkState(this: Component, name, value) {
      let stateParams = prepareParams(this, name, value)
      const result = computeStates(stateParams)
      return {
        'btn-danger': result.selected,
        'btn-outline-danger': !result.selected && result.available,
        'btn-outline-secondary': !result.selected && !result.available
      }
    },

    // bind to click event
    handleAttributeClick(this: Component, name, value) {
      let stateParams = prepareParams(this, name, value)
      const result = computeStates(stateParams)

      if (!result.selected) {
        this['$emit']('selectSku', result.selectedSku)
      }
    }
  }
}

function prepareParams(vm: Component, name, value) {
  const variantsAttributes = vm['variantsAttributes']
  const skuAttributeMap = variantsAttributes.skuAttributeMap
  const currentSku = vm['currentSku']
  const currentAttributes = variantsAttributes.skuAttributeMap[currentSku]
  return {
    skuAttributeMap,
    currentAttributes,
    name,
    value
  }
}

function computeStates(stateParams) {
  const currentAttributes = stateParams.currentAttributes
  const name = stateParams.name
  const value = stateParams.value

  // is the value the currently selected value
  const selected = currentAttributes[name] === value

  // is the value part of a combination with other current attributes
  let available = false
  let selectedSku: string | null = null
  if (!selected) {
    const tryAttributes = { ...currentAttributes, [name]: value }
    const skuAttributes = stateParams.skuAttributeMap
    const result = getAvailableSku(tryAttributes, skuAttributes, name)
    available = result.available
    selectedSku = result.selectedSku
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
  let selectedSku: string | null = null

  const skus = Object.keys(skuAttributes)
  for (let sku of skus) {
    const attributesValues = skuAttributes[sku]
    // first try to match all other selected attribute values
    available = _.isEqual(attributesValues, tryAttributes)
    if (available) {
      selectedSku = sku
      break
    }

    // set the fallback sku to the first sku that has the same attribute value
    if (selectedSku === null && (attributesValues[name] === tryAttributes[name])) {
      selectedSku = sku
    }
  }

  return {
    available,
    selectedSku
  }
}
