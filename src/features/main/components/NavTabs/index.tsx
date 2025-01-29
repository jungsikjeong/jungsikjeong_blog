'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavTabs() {
  const pathname = usePathname()
  const activeTab = pathname.split('/')[1]

  return (
    <div className='mt-4 hidden border-b px-2 md:block'>
      <nav className='mx-auto grid max-w-[1280px] grid-cols-[300px_1fr]'>
        <div />
        <ul className='flex h-11 list-none items-center gap-4'>
          <li>
            <Link
              href='/'
              className={`github-hover inline-block px-2 ${
                activeTab === '' &&
                'relative after:absolute after:bottom-[-11px] after:left-0 after:z-10 after:h-[1px] after:w-full after:bg-orange-500'
              }`}
            >
              Overview
            </Link>
          </li>

          <li>
            <Link
              href='/repositories'
              className={`github-hover inline-block px-2 ${
                activeTab === 'repositories' &&
                'relative after:absolute after:bottom-[-11px] after:left-0 after:z-10 after:h-[1px] after:w-full after:bg-orange-500'
              }`}
            >
              Repositories
            </Link>
          </li>

          <li>
            <Link
              href='/projects'
              className={`github-hover inline-block px-2 ${
                activeTab === 'projects' &&
                'relative after:absolute after:bottom-[-11px] after:left-0 after:z-10 after:h-[1px] after:w-full after:bg-orange-500'
              }`}
            >
              Projects
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
