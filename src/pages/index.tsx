import { getAllDocs } from '@/lib/docs-api.lib'
import { Layout } from '@/shared/components'

const Home: React.FC<any> = ({ allDocs }) => {
  return (
    <Layout title="Neovim lua plugins" allDocs={allDocs} currentPluginName="">
      <div className="w-3/5"></div>
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
    'category',
  ])
  return {
    props: { allDocs },
  }
}
