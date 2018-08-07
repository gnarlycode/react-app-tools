import { Store } from 'redux'
import { DataFetcher } from '@gnarlycode/react-route-fetch'
import { RouteConfig } from 'react-router-config'
import { HomePage } from 'components/HomePage'
import { SecondPage } from 'components/SecondPage'
import { AppContainer } from 'components/Layout/AppContainer'
import * as links from 'utils/links'

export type FetchContext = Store<any>

const fetchers: {
  [key: string]: DataFetcher<FetchContext>
} = {
  home: (store, match) => new Promise(resolve => resolve()),
}

export const routes: RouteConfig[] = [
  {
    component: AppContainer,
    routes: [
      {
        component: HomePage,
        exact: true,
        fetchData: fetchers.home,
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
