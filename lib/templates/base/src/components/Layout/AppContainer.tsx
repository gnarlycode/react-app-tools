import * as React from 'react'
import styled from 'styled-components'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'
import {
  ScrollRestorer,
  ScrollStateProvider,
} from '@gnarlycode/react-scroll-state'
import { colors } from 'utils/styles'
import { GlobalStyles } from 'components/Layout/GlobalStyles'

const App = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.bg};
`

// Typings
interface AppContainerProps extends RouteConfigComponentProps<{}> {}

// Component
export const AppContainer = ({ route }: AppContainerProps) => {
  return (
    <ScrollStateProvider>
      <ScrollRestorer />
      <GlobalStyles />
      <App>{route && renderRoutes(route.routes)}</App>
    </ScrollStateProvider>
  )
}
