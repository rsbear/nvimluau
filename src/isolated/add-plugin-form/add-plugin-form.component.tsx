import { Fragment, FC, useState } from 'react'
import { TiStar } from 'react-icons/ti'
import { HiOutlineSelector } from 'react-icons/hi'
import { BiCheck } from 'react-icons/bi'

import { generateRepoName } from '@/shared/utils/generateRepoName.util'
import useAddPluginForm from './add-plugin-form.util'

//TODO: REFACTOR
const AddPluginForm: FC<any> = () => {
  const {
    inputs,
    dataToSubmit,
    handleChange,
    handleCategory,
    fetchRepo,
    submitRepo,
  } = useAddPluginForm()

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="pb-2 font-semibold">PUBLISH A PLUGIN</h1>

      <input
        type="text"
        placeholder="Repo URL"
        name="url"
        value={inputs.url}
        onChange={handleChange}
        autoComplete="off"
        className="mt-4 min-w-[400px] rounded-md border border-gray-800 bg-transparent py-2 px-4 text-center text-sm focus:border-blue-400 focus:outline-none"
      />
      <CategoryAutocomplete
        category={inputs.category}
        setCategory={handleChange}
        handleCategory={handleCategory}
      />
      {!dataToSubmit ? (
        <button
          type="button"
          onClick={fetchRepo}
          className="mt-6 h-[38px] w-[400px] rounded-md bg-purple-400 py-2 text-sm font-semibold"
        >
          FETCH REPO
        </button>
      ) : (
        <button
          type="button"
          onClick={submitRepo}
          className="mt-6 h-[38px] w-[400px] rounded-md bg-blue-400 py-2 text-sm font-semibold"
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

import { Combobox, Transition } from '@headlessui/react'

const categories = [
  { id: 1, name: 'Colorschemes' },
  { id: 2, name: 'LSP' },
  { id: 3, name: 'Package Managers' },
  { id: 4, name: 'Completion' },
  { id: 5, name: 'Git' },
  { id: 6, name: 'Extras' },
]

function CategoryAutocomplete({ category, handleCategory }: any) {
  const [query, setQuery] = useState('')

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((c) =>
          c.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="mt-4 w-full">
      <Combobox value={category} onChange={handleCategory}>
        <div className="relative mt-1">
          <div className="relative h-[38px] w-full cursor-default overflow-hidden rounded-md border border-gray-800 bg-transparent text-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="h-full w-full bg-black py-2 pl-3 pr-10 text-center text-sm leading-5 text-white focus:ring-0"
              name="category"
              autoComplete="off"
              placeholder="Category"
              displayValue={category}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiOutlineSelector className="" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-800 py-1 text-base text-white ring-1 ring-white ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCategories.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-red-400">
                  Nothing found.
                </div>
              ) : (
                filteredCategories.map((c) => (
                  <Combobox.Option
                    key={c.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-white'
                      }`
                    }
                    value={c.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {c.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-blue-600'
                            }`}
                          >
                            <BiCheck className="" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
