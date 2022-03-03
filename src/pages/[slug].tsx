import { remark } from 'remark'
import html from 'remark-html'
import { Octokit } from '@octokit/rest'
import { HiOutlineExternalLink } from 'react-icons/hi'

import { getAllDocs, getDocBySlug } from '@/lib/docs-api.lib'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import { Layout } from '@/shared/components'

const PluginPage: React.FC<any> = ({ allDocs, pluginData, readMe }) => {
  return (
    <Layout
      title="Neovim lua plugins"
      allDocs={allDocs}
      currentPluginName={pluginData.name}
    >
      <aside className="max-w-2/3 w-full py-8">
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

  return {
    paths: allDocs.map((x) => ({ params: { slug: x.slug } })),
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
  ])
  const pluginData = getDocBySlug(params.slug, [
    'url',
    'name',
    'description',
    'created',
    'slug',
    'stars',
  ])

  const gh = new Octokit({
    auth: process.env.GH_TOKEN,
  })

  const repo = generateRepoName(pluginData.url)
  const getReadMe = await gh.repos.getReadme({
    owner: repo?.owner || '',
    repo: repo?.repo || '',
  })

  const content = Buffer.from(getReadMe.data.content, 'base64').toString('utf8')

  const readme = await remark().use(html).process(content)

  return {
    props: { allDocs, pluginData, readMe: readme.toString() },
  }
}
