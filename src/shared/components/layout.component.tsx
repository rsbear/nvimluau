import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoFlowerOutline } from 'react-icons/io5'
import { TiStar } from 'react-icons/ti'
import { AllDocumentsList } from '@/core/types'

const Layout: FC<{
  title: string
  allDocs: any[]
  currentPluginName: string
  children: JSX.Element
}> = (props) => {
  const r = useRouter()
  return (
    <div className={`flex ${r.asPath !== '/' && 'h-screen'}`}>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="overflow-y-auto pl-4 sm:pl-4 md:w-full md:pl-8 lg:w-2/5 lg:pr-8 lg:pl-20">
        <header className="mt-10 border-b border-gray-800 py-2">
          <nav className="flex flex-col">
            <div className="flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <IoFlowerOutline className="text-pink-400" size={20} />
                  <h4 className="pl-2 text-xl font-semibold">NVIM LUAU</h4>
                </a>
              </Link>
            </div>

            <div className="flex items-end justify-between pt-2">
              <p className="text-sm text-gray-400">
                Awesome plugins for Neovim
              </p>

              <div className="flex items-center">
                <a
                  href="https://github.com/rsbear/nvimluau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-1 text-sm text-neutral-400 hover:text-blue-400"
                >
                  GitHub
                </a>
                <Link href="/publish">
                  <a className="ml-2 pl-1 text-sm text-neutral-400 hover:text-blue-400">
                    Add Plugin
                  </a>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="w-full">
          <PluginsList
            allDocs={props.allDocs}
            currentPluginName={props.currentPluginName}
          />
        </main>
      </div>

      {props.children}
    </div>
  )
}

export default Layout

const PluginsList: React.FC<{
  allDocs: AllDocumentsList[]
  currentPluginName: string
}> = ({ allDocs, currentPluginName }) => {
  return (
    <ul>
      {allDocs?.map((x, idx) => (
        <div key={idx}>
          <h1 className="mt-12 text-xl uppercase text-blue-300">
            {x?.category}
          </h1>
          {x?.items?.map((y) => (
            <li key={y.slug} className="my-2 py-2">
              <Link href={`/${y?.slug}`}>
                <a className="hover:text-blue-400">
                  <div className="flex items-center">
                    <h6
                      className={
                        currentPluginName !== y.name
                          ? 'text-sm font-semibold'
                          : 'text-sm font-semibold text-blue-400'
                      }
                    >
                      {y?.name}
                    </h6>
                    <div className="ml-4 border-l border-gray-600 pl-4">
                      <TiStar className="text-gray-300" />
                    </div>
                    <span className="pl-2 text-sm text-gray-300">
                      {y?.stars}
                    </span>
                    {/* <a */}
                    {/*   href={x.url} */}
                    {/*   className="relative z-50 ml-4 border-l border-gray-600 pl-4 text-xs text-gray-400 hover:text-blue-400" */}
                    {/*   target="_blank" */}
                    {/*   rel="noopener noreferrer" */}
                    {/* > */}
                    {/*   REPO */}
                    {/* </a> */}
                  </div>
                  <p className="text-sm text-gray-400">{y?.description}</p>
                </a>
              </Link>
            </li>
          ))}
        </div>
      ))}
    </ul>
  )
}
