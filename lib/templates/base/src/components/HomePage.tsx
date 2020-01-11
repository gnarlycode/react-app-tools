import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Title } from 'components/Common/Title'
import * as links from 'utils/links'

import SVGExample from 'assets/svg-example.svg'

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Gnarly Boilerplate</title>
      </Helmet>
      <Title>
        <SVGExample width={120} height={120} />
        <div>Gnarly Boilerplate Here</div>
        <Link to={links.second}>Second Page</Link>
      </Title>
    </>
  )
}
