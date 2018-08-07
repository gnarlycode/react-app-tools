import * as React from 'react'
import styled from 'styled-components'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'
import {
  ScrollRestorer,
  ScrollStateProvider,
} from '@gnarlycode/react-scroll-state'
import { colors } from 'utils/styles'
import 'utils/defaultStyles'

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
      <App>{route && renderRoutes(route.routes)}</App>
    </ScrollStateProvider>
  )
}
