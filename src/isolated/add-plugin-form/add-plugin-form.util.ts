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

export const categories = [
  'Colorschemes',
  'LSP',
  'Package Managers',
  'Completion',
  'Git',
  'Extras',
  'Fuzzy Finder',
  'Snippets',
  'Tabline',
  'Status Line',
]

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

type InputErrors = {
  url: string
  category: string
}

type IDataToSubmit = typeof initialDataToSubmit

function useAddPluginForm() {
  const [inputs, setInputs] = useState(initialInputs)
  const [dataToSubmit, setDataToSubmit] = useState<IDataToSubmit | null>(null)
  const [errors, setErrors] = useState<InputErrors | null>(null)
  const [success, setSuccess] = useState('')

  function handleUrlInput(e: any) {
    setInputs((p) => ({ ...p, [e.target.name]: e.target.value }))
    setErrors((p) => ({
      url: '',
      category: !p?.category ? '' : p.category,
    }))
    return
  }

  function handleCategorySelect(category: string) {
    setInputs((p) => ({ ...p, category }))
    setErrors((p) => ({
      url: !p?.url ? '' : p.url,
      category: '',
    }))
    return
  }

  async function fetchRepo() {
    const validUrl = inputs.url.includes('https://github.com')
    const validCat = categories.includes(inputs.category)
    if (!validUrl || !validCat) {
      setErrors(() => ({
        category: !validCat ? 'Pick a category from the list' : '',
        url: !validUrl ? 'Only GitHub URLs allowed' : '',
      }))
      return
    }

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

        setErrors(null)
      }
    } catch (err) {
      setSuccess('Repo doesnt exist')
      console.log('err --', err)
    }
  }

  async function submitRepo(e: any) {
    e.preventDefault()
    try {
      await fetch(postUrl, {
        method: 'POST',
        body: JSON.stringify(dataToSubmit),
      })
      setDataToSubmit(initialDataToSubmit)
      setInputs(initialInputs)
      setSuccess("Sweet, you opened a PR, I'll get to it soon.")
    } catch (err) {
      setSuccess('I broke it')
      console.log('err --', err)
    }
  }

  const state = {
    inputs,
    dataToSubmit,
    errors,
    success,
  }

  const actions = {
    handleCategorySelect,
    handleUrlInput,
    fetchRepo,
    submitRepo,
  }

  return {
    state,
    actions,
  }
}

export default useAddPluginForm
