import { useEffect } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import { Octokit } from '@octokit/rest'
import { HiOutlineExternalLink } from 'react-icons/hi'

import { getAllDocs, getDocBySlug } from '@/lib/docs-api.lib'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import { Layout } from '@/shared/components'
import { useRouter } from 'next/router'

const PluginPage: React.FC<any> = ({ allDocs, pluginData, readMe }) => {
  const r = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const imageNodes = document.getElementsByTagName('img')

      for (let i = 0; i < imageNodes.length; i++) {
        const imageNode = imageNodes[i]
        const src = imageNode.getAttribute('src')

        if (src && !src.includes('.com')) {
          const repo = generateRepoName(pluginData.url)
          const remoteBaseUrl = `https://raw.githubusercontent.com`

          if (src.startsWith('./')) {
            console.log('TEST', src.slice(2))
            imageNode.setAttribute(
              'src',
              `${remoteBaseUrl}/${repo?.owner}/${repo?.repo}/master/${src.slice(
                2
              )}`
            )
            return
          }
          imageNode.setAttribute(
            'src',
            `${remoteBaseUrl}/${repo?.owner}/${repo?.repo}/main/${src}`
          )
        }
      }
    }
  }, [r.asPath])

  return (
    <Layout
      title="Neovim lua plugins"
      allDocs={allDocs}
      currentPluginName={pluginData.name}
    >
      <aside className="absolute overflow-y-auto border-l border-neutral-700 bg-neutral-900 px-4 py-8 md:relative lg:relative lg:w-3/5">
        <div className="mx-auto max-w-[75ch] pb-10">
          <a
            href={pluginData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center rounded-sm border-b-2 border-pink-400 px-4 py-2 text-sm font-semibold text-white"
          >
            {pluginData.url}
            <span>
              <HiOutlineExternalLink className="mt-[2px] ml-4" />
            </span>
          </a>
        </div>
        <div className="flex justify-center">
          <article className="prose max-w-[75ch]">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: readMe }}
            ></div>
          </article>
        </div>
      </aside>
    </Layout>
  )
}

export default PluginPage

export const getStaticPaths = () => {
  const allDocs = getAllDocs(['slug'])

  const allSlugs = []
  for (const x of allDocs) {
    for (const y of x.items) {
      allSlugs.push(y.slug)
    }
  }

  return {
    paths: allSlugs.map((x) => ({ params: { slug: x } })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: any) => {
  const allDocs = getAllDocs([
    'url',
    'name',
    'description',
    'created',
    'slug',
    'stars',
    'category',
  ])
  const pluginData = getDocBySlug(params.slug, [
    'url',
    'name',
    'description',
    'created',
    'slug',
    'stars',
    'content',
  ])

  // TODO: deal with this later
  // let content = pluginData?.content

  // content is missing from the plugin doc
  // if (content.length === 1) {
  console.log('TEST')
  const gh = new Octokit({
    auth: process.env.GH_TOKEN,
  })

  const repo = generateRepoName(pluginData.url)
  const getReadMe = await gh.repos.getReadme({
    owner: repo?.owner || '',
    repo: repo?.repo || '',
  })

  const content = Buffer.from(getReadMe.data.content, 'base64').toString('utf8')
  // }

  const readme = await remark().use(html).process(content)

  return {
    props: { allDocs, pluginData, readMe: readme.toString() },
  }
}
