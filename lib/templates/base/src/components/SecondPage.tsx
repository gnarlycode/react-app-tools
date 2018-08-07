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

export const SecondPage = () => {
  return (
    <>
      <Helmet>
        <title>Second Page</title>
        <meta name="description" content="This is second page" />
      </Helmet>
      <Title>
        <div>Second Page</div>
        <Link to={links.home}>Home Page</Link>
      </Title>
    </>
  )
}
