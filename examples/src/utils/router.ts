import { createReactRouter, createRouteConfig } from '@tanstack/react-router'

import { Basic } from '../basic'
import { Downshift } from '../downshift'
import { ReactSelect } from '../react-select'

const rootRoute = createRouteConfig()

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: Basic,
})

const basicRoute = rootRoute.createRoute({
  path: '/basic',
  component: Basic,
})

const downshiftRoute = rootRoute.createRoute({
  path: '/downshift',
  component: Downshift,
})

const reactSelectRoute = rootRoute.createRoute({
  path: '/react-select',
  component: ReactSelect,
})

export const routeConfig = rootRoute.addChildren([indexRoute, basicRoute, downshiftRoute, reactSelectRoute])

export const router = createReactRouter({ routeConfig })
