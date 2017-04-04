export interface CreditCardDraft {
  number: string
  cardholderName: string
  expirationMonth: string
  cvv: string
  customerId: string
}

export interface CreditCardView {
  id: string
  customerId: string
  bin: string
  cardholderName: string
  cardType?: string
  expired?: boolean
  last4: string
  selected: boolean
}

export interface DefaultCardRequest {
  customerId: string
  creditCardId: string
}

export interface DeleteCardRequest {
  creditCardId: string
  version: string
}
