export interface NavigationLink {
  label: string
  href: string
}

export const NAVIGATION_LINKS: NavigationLink[] = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Company',
    href: '/company',
  },
]
