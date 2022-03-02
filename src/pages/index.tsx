import { getAllDocs } from '@/lib/docs-api.lib'

import { Layout } from '@/shared/components'

const Home: React.FC<any> = ({ allDocs }) => {
  return (
    <Layout title="Neovim lua plugins" allDocs={allDocs} currentPluginName="">
      <></>
    </Layout>
  )
}

export default Home

export const getStaticProps = async () => {
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
