import LocalizedString from './LocalizedString'
import Category  from './Category'

interface CategoryDraft {
  name: LocalizedString
  slug: LocalizedString
  ancestors: Array<Category>
  description?: LocalizedString
  parent?: Category
  orderHint?: string
  externalId?: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string

  // Todo Custom
}

export default CategoryDraft
