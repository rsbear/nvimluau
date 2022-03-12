import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import type { AllDocumentsList, TDocument } from '@/core/types'

const documentsDirectory = join(process.cwd(), 'documents')

export function getDocumentSlugsAkaFilenames() {
  return fs.readdirSync(documentsDirectory)
}

export function getDocBySlug(slug: string, fields: Array<keyof TDocument>) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(documentsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {} as TDocument

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllDocs(
  fields: Array<keyof TDocument>
): Array<AllDocumentsList | never> {
  // slugs aka filenames
  const slugs = getDocumentSlugsAkaFilenames()
  const docs = slugs.map((slug) => getDocBySlug(slug, fields))

  let sortedResults: any = {}
  docs.forEach((x, idx) => {
    if (!(x.category in sortedResults)) {
      Object.assign(sortedResults, {
        [x.category]: {
          category: x.category,
          items: [x],
        },
      })
    } else {
      sortedResults[x.category].items.push(x)
    }
  })

  return Object.values(sortedResults)
}
