import { useState } from 'react'
import { Octokit } from '@octokit/rest'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'

const gh = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,
})

const postUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/doc/create'
    : 'https://nvimluau-rsbear.vercel.app/api/doc/create'

const initialInputs = {
  url: '',
  category: '',
}

const initialDataToSubmit = {
  description: '',
  url: '',
  stars: 0,
  topics: [''],
  updated_at: '',
  category: '',
  // readme_content: ""
}

type IDataToSubmit = typeof initialDataToSubmit

function useRepoAdder() {
  const [inputs, setInputs] = useState(initialInputs)
  const [dataToSubmit, setDataToSubmit] = useState<IDataToSubmit | null>(null)

  function handleChange(e: any) {
    setInputs((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function fetchRepo() {
    const { owner, repo } = generateRepoName(inputs.url)
    try {
      const res = await gh.rest.repos.get({
        owner,
        repo,
      })

      if (res.status === 200) {
        setDataToSubmit({
          description: res.data.description || '',
          url: res.data.html_url,
          stars: res.data.stargazers_count,
          topics: res.data.topics || [''],
          updated_at: res?.data?.updated_at || '',
          category: inputs.category,
          // readme_content: readMe.data.content
        })
      }
    } catch (err) {
      console.log('err --', err)
    }
  }

  async function submitRepo(e: any) {
    e.preventDefault()
    try {
      const response = await fetch(postUrl, {
        method: 'POST',
        body: JSON.stringify(dataToSubmit),
      })

      console.log(response)
    } catch (err) {
      console.log('err --', err)
    }
  }

  return { dataToSubmit, handleChange, fetchRepo, submitRepo }
}

export default useRepoAdder
