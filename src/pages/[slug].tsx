import { getAllDocs, getDocBySlug } from '@/lib/docs-api.lib'

import { Layout } from '@/shared/components'
import { Octokit } from '@octokit/rest'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'

import { remark } from 'remark'
import html from 'remark-html'

const PluginPage: React.FC<any> = ({ allDocs, pluginData, readMe }) => {
  return (
    <Layout
      title="Neovim lua plugins"
      allDocs={allDocs}
      currentPluginName={pluginData.name}
    >
      <div className="mt-10 rounded-xl px-8 py-8">
        <article className="prose max-w-[85ch]">
          <div className="" dangerouslySetInnerHTML={{ __html: readMe }}></div>
        </article>
      </div>
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

  const { owner, repo } = generateRepoName(pluginData.url)
  const getReadMe = await gh.repos.getReadme({
    owner,
    repo,
  })

  const content = Buffer.from(getReadMe.data.content, 'base64').toString('utf8')

  const readme = await remark().use(html).process(content)

  return {
    props: { allDocs, pluginData, readMe: readme.toString() },
  }
}
