import type { NextApiRequest, NextApiResponse } from 'next'

import fs from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'
import { stringify } from 'yaml'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import dayjs from 'dayjs'

const documentsDirectory = join(process.cwd(), 'documents')

export default async function createDoc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category, description, url, stars, topics, updated_at } = JSON.parse(
    req?.body
  )

  const { fullName } = generateRepoName(url)
  const filename = fullName.replace(/[^a-z0-9]/gi, '-').toLowerCase()

  const filepath = `${documentsDirectory}/${filename}.md`
  await fs.writeFile(filepath, '')

  const { data: frontMatter, content } = matter(await fs.readFile(filepath))

  frontMatter.name = fullName
  frontMatter.slug = filename
  frontMatter.description = description
  frontMatter.created = dayjs().format('MMM D, YYYY h:mm a')
  frontMatter.updated_at = updated_at
  frontMatter.stars = stars
  frontMatter.topics = topics
  frontMatter.url = url
  frontMatter.category = category

  const newContent = `---\n${stringify(frontMatter)}---\n${content}`

  await fs.writeFile(filepath, newContent)

  res.json({ slug: filepath })
}
