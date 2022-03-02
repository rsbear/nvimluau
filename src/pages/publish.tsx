import { AddPluginForm } from '@/isolated/add-plugin-form'
import { NextPage } from 'next'

const PublishPlugin: NextPage = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <AddPluginForm />
    </div>
  )
}

export default PublishPlugin
