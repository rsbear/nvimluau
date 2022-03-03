import type { NextApiRequest, NextApiResponse } from 'next'

import matter from 'gray-matter'
import dayjs from 'dayjs'
import { Octokit } from '@octokit/rest'

const gh = new Octokit({
  auth: process.env.GH_TOKEN,
})

export default async function createDoc(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category, description, url, stars, topics, updated_at, fullName } =
    JSON.parse(req?.body)

  const filename = fullName.replace(/[^a-z0-9]/gi, '-').toLowerCase()

  const content = matter.stringify('', {
    name: fullName,
    slug: filename,
    category,
    created: dayjs().format('MMM DD, YYYY h:mm'),
    description,
    url,
    stars,
    topics,
    updated_at,
  })

  const b64 = Buffer.from(content).toString('base64')

  try {
    const owner = 'rsbear',
      repo = 'nvimluau'

    const getSha = await gh.repos.listCommits({
      owner: 'rsbear',
      repo: 'nvimluau',
      per_page: 1,
    })

    await gh.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${filename}`,
      sha: getSha?.data[0]?.sha,
    })

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
      branch: filename,
    })

    const result = await gh.pulls.create({
      owner,
      repo,
      title: `Add plugin ${filename}`,
      head: filename,
      base: 'main',
    })

    if (result.data) {
      res.status(200).json({ status: 200, message: 'success' })
    }
  } catch (err) {
    console.log(err)
    res.send(err)
  }

  res.status(200).json({ status: 200, message: 'success' })
}
