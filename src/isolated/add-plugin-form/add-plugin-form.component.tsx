import { FC } from 'react'
import { TiStar } from 'react-icons/ti'

import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import useAddPluginForm from './add-plugin-form.util'

const AddPluginForm: FC<any> = () => {
  const { dataToSubmit, handleChange, fetchRepo, submitRepo } =
    useAddPluginForm()

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="pb-2 font-semibold">PUBLISH A PLUGIN</h1>

      <input
        type="text"
        placeholder="Repo URL"
        name="url"
        onChange={handleChange}
        className="mt-4 min-w-[400px] rounded-md border border-gray-800 bg-transparent py-2 px-4 text-center"
      />
      <input
        type="text"
        placeholder="Plugin category"
        name="category"
        onChange={handleChange}
        className="mt-4 min-w-[400px] rounded-md border border-gray-800 bg-transparent py-2 px-4 text-center"
      />
      {!dataToSubmit ? (
        <button
          type="button"
          onClick={fetchRepo}
          className="mt-4 w-[400px] rounded-md bg-purple-400 py-2"
        >
          FETCH REPO
        </button>
      ) : (
        <button
          type="button"
          onClick={submitRepo}
          className="mt-4 w-[400px] rounded-md bg-blue-400 py-2"
        >
          SUBMIT
        </button>
      )}
      {dataToSubmit && (
        <div className="mt-14">
          <div className="flex items-center">
            <h4 className={'font-semibold'}>
              {generateRepoName(dataToSubmit?.url as any).fullName}
            </h4>
            <div className="ml-4 border-l border-gray-600 pl-4">
              <TiStar className="text-gray-300" />
            </div>
            <span className="pl-2 text-sm text-gray-300">
              {dataToSubmit?.stars}
            </span>
          </div>
          <p className="text-gray-400">{dataToSubmit?.description}</p>
        </div>
      )}
    </div>
  )
}

export default AddPluginForm
