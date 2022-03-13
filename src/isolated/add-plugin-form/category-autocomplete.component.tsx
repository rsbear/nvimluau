import { FC, useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { HiOutlineSelector } from 'react-icons/hi'
import { BiCheck } from 'react-icons/bi'

import { categories } from '@/lib/categories-list.lib'

const CategoryAutocomplete: FC<{
  category: string
  handleCategory: (arg: string) => void
}> = ({ category, handleCategory }) => {
  const [query, setQuery] = useState('')

  const filteredCategories =
    query === ''
      ? categories
      : categories.filter((cat) =>
          cat
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

  return (
    <div className="w-full">
      <Combobox value={category} onChange={handleCategory}>
        <div className="relative mt-1">
          <div className="relative h-[48px] w-full cursor-default overflow-hidden rounded-md border border-gray-800 bg-transparent text-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="h-full w-full bg-transparent py-2 pl-3 pr-10 text-center text-sm leading-5 text-white focus:ring-0"
              name="category"
              autoComplete="off"
              placeholder="Category"
              displayValue={category as any}
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
                filteredCategories.map((cat, idx) => (
                  <Combobox.Option
                    key={idx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-white'
                      }`
                    }
                    value={cat}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {cat}
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

export default CategoryAutocomplete
