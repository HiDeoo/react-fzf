import { Link } from '@tanstack/react-router'

import { routeConfig } from './router'

export function Header() {
  return (
    <header>
      {routeConfig.children?.map((route) => {
        if (route.path === '/') {
          return null
        }

        return (
          <Link key={route.path} to={route.path}>
            {route.path}
          </Link>
        )
      })}
    </header>
  )
}
