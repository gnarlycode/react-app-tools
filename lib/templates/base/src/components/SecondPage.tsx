import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Title } from 'components/Common/Title'
import * as links from 'utils/links'

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
