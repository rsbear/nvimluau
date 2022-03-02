import { FC } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { IoFlowerOutline } from 'react-icons/io5'
import { AiFillGithub } from 'react-icons/ai'
import { TiStar } from 'react-icons/ti'

const Layout: FC<{
  title: string
  allDocs: any[]
  currentPluginName: string
  children: JSX.Element
}> = (props) => {
  return (
    <div className="grid grid-cols-2 px-20">
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pr-8">
        <header className="mt-10 border-b border-gray-800 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <a className="flex items-center">
                  <IoFlowerOutline className="text-pink-400" size={24} />
                  <h4 className="pl-2 text-2xl font-semibold">NVIM LUAU</h4>
                </a>
              </Link>
              <a
                href="https://github.com/rsbear/nvimluau"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub className="ml-8 justify-self-end" size={28} />
              </a>
            </div>
            <Link href="/publish">
              <a className="text-neutral-400 hover:text-blue-400">ADD PLUGIN</a>
            </Link>
          </nav>
        </header>

        <main className="">
          <PluginsList
            allDocs={props.allDocs}
            currentPluginName={props.currentPluginName}
          />
        </main>
      </div>

      <aside>{props.children}</aside>
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
                <h4
                  className={
                    currentPluginName !== x.name
                      ? 'font-semibold'
                      : 'font-semibold text-blue-400'
                  }
                >
                  {x?.name}
                </h4>
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
