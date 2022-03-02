import type { NextApiRequest, NextApiResponse } from 'next'

// import fs from 'fs/promises'
import matter from 'gray-matter'
import { join } from 'path'
// import { stringify } from 'yaml'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import dayjs from 'dayjs'
import { Octokit } from '@octokit/rest'

const documentsDirectory = join(process.cwd(), 'documents')
const gh = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,
})

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

  const content = matter.stringify('', {
    category,
    created: dayjs().format('MMM DD, YYYY h:mm'),
    description,
    url,
    stars,
    topics,
    updated_at,
  })

  const b64 = Buffer.from(content).toString('base64')

  // TODO: Figure out branching
  await gh.repos.createOrUpdateFileContents({
    owner: 'rsbear',
    repo: 'nvimluau',
    path: `documents/${filename}.md`,
    message: filename,
    content: b64,
    committer: {
      name: 'Ross S',
      email: process.env.SECRET_EMAIL || 'hellorosss@gmail.com',
    },
    author: {
      name: 'Ross S',
      email: process.env.SECRET_EMAIL || 'hellorosss@gmail.com',
    },
    // branch: filename,
  })

  res.json({ slug: filepath })
}
