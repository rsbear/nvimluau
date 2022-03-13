import { useCallback, useState } from 'react'
import { Octokit } from '@octokit/rest'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import { AllDocumentsList } from '@/core/types'
import { categories } from '@/lib/categories-list.lib'

const gh = new Octokit({
  auth: process.env.NEXT_PUBLIC_GH_TOKEN,
})

const postUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/doc/create'
    : 'https://nvimluau.dev/api/doc/create'

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
  fullName: '',
  // readme_content: ""
}

type InputErrors = {
  url: string
  category: string
}

type IDataToSubmit = typeof initialDataToSubmit

function useAddPluginForm(allDocs: AllDocumentsList[]) {
  const [inputs, setInputs] = useState(initialInputs)
  const [dataToSubmit, setDataToSubmit] = useState<IDataToSubmit | null>(null)
  const [isLoading, setIsLoading] = useState(false)
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

  const fetchRepo = useCallback(async () => {
    const validUrl = inputs.url.includes('https://github.com')
    const validCat = categories.includes(inputs.category)

    if (!validUrl || !validCat) {
      setErrors(() => ({
        category: !validCat ? 'Pick a category from the list' : '',
        url: !validUrl ? 'Only GitHub URLs allowed' : '',
      }))
      return
    }

    for (const x of allDocs) {
      for (const y of x.items) {
        if (y.url === inputs.url) {
          setErrors((p) => ({
            category: !p?.category ? '' : p.category,
            url: 'Plugin already exists',
          }))
          return
        }
      }
    }

    try {
      const repo = generateRepoName(inputs.url)
      if (!repo) return

      const res = await gh.rest.repos.get({
        owner: repo.owner,
        repo: repo.repo,
      })

      if (res.status === 200) {
        setDataToSubmit({
          description: res.data.description || '',
          url: res.data.html_url,
          stars: res.data.stargazers_count,
          topics: res.data.topics || [''],
          updated_at: res?.data?.updated_at || '',
          category: inputs.category,
          fullName: repo.fullName,
          // readme_content: readMe.data.content
        })

        setErrors(null)
      }
    } catch (err) {
      setSuccess('Repo doesnt exist')
      console.log('err --', err)
    }
  }, [dataToSubmit, inputs, errors])

  const submitRepo = useCallback(
    async (e: any) => {
      e.preventDefault()
      setIsLoading(true)
      const res = await fetch(postUrl, {
        method: 'POST',
        body: JSON.stringify(dataToSubmit),
      })

      const json = await res.json()

      if (json) {
        setSuccess("Nice, you opened a PR, I'll get to it soon.")
      }
      setIsLoading(false)
    },
    [success, dataToSubmit, inputs]
  )

  function reset() {
    setInputs(initialInputs)
    setDataToSubmit(null)
    setErrors(null)
    setSuccess('')
    setIsLoading(false)
  }

  const state = {
    inputs,
    dataToSubmit,
    errors,
    success,
    isLoading,
  }

  const actions = {
    handleCategorySelect,
    handleUrlInput,
    fetchRepo,
    submitRepo,
    reset,
  }

  return {
    state,
    actions,
  }
}

export default useAddPluginForm

// import create from 'zustand'
//
// const useForm = create((set, get) => ({
//   state: {
//     inputs: { url: '', category: '' },
//     dataToSubmit: {},
//     errors: {},
//     success: '',
//   },
//   actions: {
//     setUrl: () => {},
//     setCategory: () => {},
//     validateInputs: () => {},
//     fetchRepo: () => {},
//     submitData: () => {},
//   },
// }))
