import { NextPage } from 'next'
import { AddPluginForm } from '@/isolated/add-plugin-form'
import { Layout } from '@/shared/components'
import { getAllDocs } from '@/lib/docs-api.lib'

const PublishPlugin: NextPage<any> = (props: { allDocs: any }) => {
  return (
    <Layout
      title="Neovim lua plugins"
      allDocs={props.allDocs}
      currentPluginName={''}
    >
      <aside className="absolute h-[100vh] w-full border-l border-neutral-700 bg-neutral-900 px-4 py-8 md:relative lg:relative lg:w-3/5">
        <AddPluginForm allDocs={props.allDocs} />
      </aside>
    </Layout>
  )
}

export default PublishPlugin

export const getStaticProps = () => {
  const allDocs = getAllDocs([
    'url',
    'name',
    'description',
    'created',
    'slug',
    'stars',
    'category',
  ])

  return {
    props: { allDocs },
  }
}
