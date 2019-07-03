import * as React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader/root'

const Wrap = styled.div`
  font-family: sans-serif;
  text-align: center;
  color: #666;
  margin: 0 auto;
  padding: 40px;
  font-size: 20px;
  letter-spacing: 0.15;
`

export const App = hot(() => <Wrap>Test Example</Wrap>)
