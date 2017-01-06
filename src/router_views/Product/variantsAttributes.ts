import * as _ from 'lodash'

const COMBINATION_UNIQUE = 'CombinationUnique'

export default function computeVariantsAttributes(variants, productType) {
  let result: any = false
  if (variants && productType) {
    const combinationAttributes = getCombinationAttributes(productType)
    if (combinationAttributes) {
      result = getValuesAndSku(variants, combinationAttributes)
    }
  }
  return result
}

/**
 * get all combination attribute definitions from the Product Type definitin
 * an extra 'values' field has all 'combination attribute' values of the current product.
 * The 'combination attribute' could be only one or nothing
 */
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
 * get combination attributes and their values
 * create a map for variant's sku and its attributes
 */
function getValuesAndSku(variants, attributesValues) {
  const skuAttributeMap = {}
  variants.forEach(variant => {
    let variantAttributes = getVariantAttributes(variant, attributesValues)
    skuAttributeMap[variant.sku] = variantAttributes
  })

  return {
    attributesValues,
    skuAttributeMap
  }
}

/**
 * get the combination attributes and their values for a product variant
 */
function getVariantAttributes(variant, attributesValues) {
  let variantAttributes = {}
  attributesValues.forEach(attributeValues => {
    const variantAttribute = getVariantAttribute(variant, attributeValues)
    const currentValue = variantAttribute.value

    variantAttributes[variantAttribute.name] = currentValue
    addNewValue(attributeValues, currentValue)
  })
  return variantAttributes
}

// get teh variant attribute for the combination attribute
function getVariantAttribute(variant, attributeValues) {
  const attr = variant.attributes.find(variantAttr => {
    return variantAttr.name === attributeValues.name
  })
  return attr
}

// add the current value to attribute's values if it is new
function addNewValue(attributeValues, currentValue) {
  const isExisted = attributeValues.values.some(value => {
      return value === currentValue
    })
    if (!isExisted) {
      attributeValues.values.push(currentValue)
    }
}
