import * as React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import * as links from 'utils/links'

const Title = styled.div`
  margin: 60px 0;
  font-size: 18px;
  text-align: center;
`

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Gnarly Boilerplate</title>
      </Helmet>
      <Title>
        <div>Gnarly Boilerplate Here</div>
        <Link to={links.second}>Second Page</Link>
      </Title>
    </>
  )
}
