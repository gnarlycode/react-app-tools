import * as React from 'react'
import styled, { css } from 'astroturf'
import { hot } from 'react-hot-loader/root'
import BoneSVG from 'assets/bone.svg'
import BallSVG from 'assets/ball.svg'

// Component
export const App = hot(() => (
  <Wrap>
    <figure>
      <BoneSVG />
    </figure>
    <BallSVG className={s.ball} width={90} height={90} />
    <div>Test Example</div>
  </Wrap>
))

// Styles
const Wrap = styled.div`
  font-family: sans-serif;
  text-align: center;
  color: #666;
  margin: 0 auto;
  padding: 40px;
  font-size: 20px;
  letter-spacing: 0.15;

  & > figure > svg {
    margin: 5px auto;
    display: block;
    fill: #f33;
    width: 70px;
    height: 70px;
  }
`

const s = css`
  .ball {
    fill: #f3f;
  }
`
