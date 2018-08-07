import { RouteConfig } from 'react-router-config'
import { HomePage } from 'components/HomePage'
import { SecondPage } from 'components/SecondPage'
import { AppContainer } from 'components/Layout/AppContainer'
import * as links from 'utils/links'

export const routes: RouteConfig[] = [
  {
    component: AppContainer,
    routes: [
      {
        component: HomePage,
        exact: true,
        path: links.home,
      },
      {
        component: SecondPage,
        exact: true,
        path: links.second,
      },
    ],
  },
]
