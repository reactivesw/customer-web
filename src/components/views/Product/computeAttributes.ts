import * as _ from 'lodash'

const COMBINATION_UNIQUE = 'CombinationUnique'

function getCombinationAttributes(productType) {
  // get all combination attributes, use array to keep original order
  const combinationAttributes = productType.attributes
    .filter(attr => attr.attributeConstraint === COMBINATION_UNIQUE)
    .map((attr) => {
      return {
        name: attr.name,
        label: attr.label,
        type: attr.type,
        // Use array to keep original order
        values: []
      }
    })

  return combinationAttributes
}

/**
 * get values for combination attributes, build attributes sku map for each variant
 *
 * It performs two tasks in the outermost iteration:
 * 1. for each variant, use all combination attributes' names and values as a key.
 *    the key is mapped to the variant sku
 * 2. fill the values for each combination attribute
 *
 */
function getValuesAndSku(variants, attributesValues) {
  const skuAttributeMap = {}

  variants.forEach(variant => {
    // add to attribute sku map
    // add combinition attribute value
    let combinationAttributes = {}
    attributesValues.forEach(attributeValues => {
      const attr = variant.attributes.find(variantAttr => {
        return variantAttr.name === attributeValues.name
      })

      const currentValue = attr.value
      combinationAttributes[attr.name] = currentValue

      const isExisted = attributeValues.values.some(value => {
        return value === currentValue
      })
      if (!isExisted) {
        attributeValues.values.push(currentValue)
      }
    })
    skuAttributeMap[variant.sku] = combinationAttributes
  })

  return {
    attributesValues,
    skuAttributeMap
  }
}

function computeAttributes(variants, productType) {
  if (variants && productType) {
    const combinationAttributes = getCombinationAttributes(productType)
    return getValuesAndSku(variants, combinationAttributes)
  }
}

export default computeAttributes
