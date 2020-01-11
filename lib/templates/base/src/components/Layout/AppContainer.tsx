import React from 'react'
import styled from 'astroturf'
import { RouteConfigComponentProps, renderRoutes } from 'react-router-config'
import 'styles/globalStyles'

// Typings
interface AppContainerProps extends RouteConfigComponentProps<{}> {}

// Component
export const AppContainer = ({ route }: AppContainerProps) => {
  return <App>{route && renderRoutes(route.routes)}</App>
}

const App = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: $colorBg;
`
