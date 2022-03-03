import { FC } from 'react'
import { TiStar } from 'react-icons/ti'

import CategoryAutocomplete from './category-autocomplete.component'
import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import useAddPluginForm from './add-plugin-form.util'

//TODO: REFACTOR
const AddPluginForm: FC<any> = (props) => {
  const { state, actions } = useAddPluginForm(props.allDocs)

  return (
    <div className="flex w-1/2 flex-col items-center py-10">
      <h1 className="pb-2 font-semibold">PUBLISH A PLUGIN</h1>

      <div className="mt-6 w-full">
        <p
          className={!state?.errors?.url ? 'text-transparent' : 'text-red-400'}
        >
          {!state?.errors?.url ? '.' : state.errors.url}
        </p>
        <input
          type="text"
          placeholder="Repo URL"
          name="url"
          value={state.inputs.url}
          onChange={actions.handleUrlInput}
          autoComplete="off"
          className="h-[48px] w-full rounded-md border border-gray-800 bg-transparent py-2 px-4 text-center text-sm focus:border-blue-400 focus:outline-none"
        />
      </div>

      <div className="mt-2 w-full">
        <p
          className={
            !state?.errors?.category ? 'text-transparent' : 'text-red-400'
          }
        >
          {!state?.errors?.category ? '.' : state.errors.category}
        </p>
        <CategoryAutocomplete
          category={state.inputs.category}
          handleCategory={actions.handleCategorySelect}
        />
      </div>

      {!state.dataToSubmit ? (
        <button
          type="button"
          onClick={actions.fetchRepo}
          className="mt-10 h-[48px] w-full rounded-md bg-purple-400 py-2 text-sm font-semibold"
        >
          FETCH REPO
        </button>
      ) : (
        <button
          type="button"
          onClick={actions.submitRepo}
          className="mt-10 h-[48px] w-full rounded-md bg-blue-400 py-2 text-sm font-semibold"
        >
          SUBMIT
        </button>
      )}
      {state.dataToSubmit && (
        <div className="mt-14">
          <div className="flex items-center">
            <h4 className={'font-semibold'}>
              {generateRepoName(state?.dataToSubmit?.url as any)?.fullName}
            </h4>
            <div className="ml-4 border-l border-gray-600 pl-4">
              <TiStar className="text-gray-300" />
            </div>
            <span className="pl-2 text-sm text-gray-300">
              {state?.dataToSubmit?.stars}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {state?.dataToSubmit?.description}
          </p>
        </div>
      )}
      {state.success && (
        <div className="mt-12">
          <h1 className="font-2xl font-semibold">{state?.success}</h1>
        </div>
      )}
    </div>
  )
}

export default AddPluginForm
