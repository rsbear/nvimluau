import { FC } from 'react'
import useRepoAdder from './add-plugin-form.util'

const AddPluginForm: FC<any> = () => {
  const { dataToSubmit, handleChange, fetchRepo, submitRepo } = useRepoAdder()

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
        <button type="button" onClick={fetchRepo}>
          fetch repo
        </button>
      ) : (
        <button type="button" onClick={submitRepo}>
          submit
        </button>
      )}
      <div>
        <p>{dataToSubmit?.url}</p>
        <p>{dataToSubmit?.stars}</p>
      </div>
    </div>
  )
}

export default AddPluginForm
