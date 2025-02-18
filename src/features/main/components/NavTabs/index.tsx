'use client'

import { ProgressLink } from '@/shared/components/navigation-progress/ProgressLink'
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
            <ProgressLink
              href='/'
              className={`inline-block px-2 github-hover ${
                activeTab === '' &&
                'relative after:absolute after:bottom-[-11px] after:left-0 after:z-10 after:h-[1px] after:w-full after:bg-orange-500'
              }`}
            >
              Overview
            </ProgressLink>
          </li>

          <li>
            <ProgressLink
              href='/repositories'
              className={`inline-block px-2 github-hover ${
                activeTab === 'repositories' &&
                'relative after:absolute after:bottom-[-11px] after:left-0 after:z-10 after:h-[1px] after:w-full after:bg-orange-500'
              }`}
            >
              Repositories
            </ProgressLink>
          </li>

          <li>
            <ProgressLink
              href='/projects'
              className={`inline-block px-2 github-hover ${
                activeTab === 'projects' &&
                'relative after:absolute after:bottom-[-11px] after:left-0 after:z-10 after:h-[1px] after:w-full after:bg-orange-500'
              }`}
            >
              Projects
            </ProgressLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}
