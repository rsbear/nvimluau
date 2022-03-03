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
      <aside className="flex w-full justify-center border-l border-neutral-700 px-8 py-8">
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
  ])

  return {
    props: { allDocs },
  }
}
