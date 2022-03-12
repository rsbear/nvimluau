export type TDocument = {
  name: string
  slug: string
  category: string
  created: string
  description: string
  url: string
  stars: string | number
  topics: string[]
  updated_at: string
  content: string
}

export interface AllDocumentsList {
  category: string
  items: Array<TDocument | never>
}
