import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { IoFlowerOutline } from 'react-icons/io5'
import { TiStar } from 'react-icons/ti'

const Layout: FC<{
  title: string
  allDocs: any[]
  currentPluginName: string
  children: JSX.Element
}> = (props) => {
  return (
    <div className="flex">
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-2/5 pr-8 pl-20">
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

const PluginsList: React.FC<{ allDocs: any[]; currentPluginName: string }> = ({
  allDocs,
  currentPluginName,
}) => {
  return (
    <ul>
      {allDocs?.map((x) => (
        <li key={x.slug} className="my-2 py-2">
          <Link href={`/${x?.slug}`}>
            <a className="hover:text-blue-400">
              <div className="flex items-center">
                <h6
                  className={
                    currentPluginName !== x.name
                      ? 'text-sm font-semibold'
                      : 'text-sm font-semibold text-blue-400'
                  }
                >
                  {x?.name}
                </h6>
                <div className="ml-4 border-l border-gray-600 pl-4">
                  <TiStar className="text-gray-300" />
                </div>
                <span className="pl-2 text-sm text-gray-300">{x?.stars}</span>
              </div>
              <p className="text-sm text-gray-400">{x?.description}</p>
            </a>
          </Link>
          <a
            href={x.url}
            className="text-xs text-gray-400 hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            GO TO REPO
          </a>
        </li>
      ))}
    </ul>
  )
}
