import LocalizedString from './LocalizedString'
import BaseTimeEnity from './BaseTimeEnity'
import CategoryDraft from './CategoryDraft'

// just to share CategoryDraft propertyies
interface Category extends BaseTimeEnity, CategoryDraft {
  lastMessageSequenceNumber: number
}

export default Category
