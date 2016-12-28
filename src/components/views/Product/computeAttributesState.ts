/**
 * get specified attribute from variant.
 *
 * @param {any} variant
 * @param {any} name
 * @returns
 */
function getVariantAttribute(variant, name) {
  return variant.attributes.find((attribute) => {
    return attribute.name === name
  }).value
}

/**
 * use attributes array filter variants array.
 *
 * @param {any} variants
 * @param {any} attributes
 * @returns
 */
function filterVariantsByAttributes (variants, attributes) {
  return variants.filter((variant) => {
    // is this variant fit every attributes.
    const result = Object.keys(attributes).every((name) => {
      const value = attributes[name]
      return !value || getVariantAttribute(variant, name) === value // if attribute value is falsy, treat it as fit.
    })
    return result
  })
}

function buildAttributesMap (attributes) {
  return attributes.reduce((map, attr) => {
    map[attr.name] = attr.value
    return map
  }, {})
}

function initComputedAttributes (attributes) {
  return attributes.reduce((map, attr) => {
    map[attr.name] = {
      name: attr.name,
      label: attr.label,
      options: {}
    }
    return map
  }, {})
}

function compute (variants, selectedVariant, productType) {

  // build selected attribute map
  const selectedAttributeMap = buildAttributesMap(selectedVariant.attributes)

  // build the result object structure.
  const computedAttributes = initComputedAttributes(productType.attributes)

  // get all attribute value.
  variants.forEach((variant) => {
    variant.attributes.forEach((attr) => {

      // compute which variant to go when this attribute option been selected.
      const newAttr = { ...selectedAttributeMap, [attr.name]: attr.value }
      let availableVariant = filterVariantsByAttributes(variants, newAttr)[0]

      // if no available variant found, then this option is not available, but we still give it a fallback variant.
      // which match this attribute only.
      const available = Boolean(availableVariant)
      if (!availableVariant) {
        availableVariant = filterVariantsByAttributes(variants, { [attr.name]: attr.value })[0]
      }

      // To every attribute, set the options we computed.
      const options = computedAttributes[attr.name].options
      if (!options[attr.value]) {
        options[attr.value] = {
          value: attr.value,
          selected: attr.value === selectedAttributeMap[attr.name],
          available: Boolean(availableVariant),
          sku: availableVariant.sku
        }
      }
    })
  })

  return computedAttributes
}

/**
 * Fed in variants, selected variant and product type, return computed attributes to render variantsSelector.
 *
 * @param {any} variants
 * @param {any} selectedVariant
 * @param {any} productType
 */
function computeAttributesState (variants, selectedVariant, productType) {
  // every parameters is required
  if (variants && selectedVariant && productType) {
    return compute(variants, selectedVariant, productType)
  }
  // else, data is not ready in initializatoin, return undefined
}

export default computeAttributesState

