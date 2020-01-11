import { css } from 'astroturf'

css`
  * {
    min-width: 0;
    min-height: 0;
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-size: 14px;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    color: $colorText;
  }

  html,
  body {
    display: flex;
    width: 100%;
    min-height: 100%;
  }

  :global(#root) {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul {
    margin: 0;
    padding: 0;
    font-size: 100%;
    font-weight: normal;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  th,
  td {
    padding: 0;
    text-align: left;
  }

  textarea {
    resize: none;
  }

  input,
  textarea,
  button,
  select {
    border: 0;
    outline: none;
    font: inherit;
    -webkit-font-smoothing: inherit;
    -webkit-appearance: none;
  }

  input,
  textarea,
  button,
  select,
  label,
  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  img,
  embed,
  iframe,
  object,
  audio,
  video {
    max-width: 100%;
    height: auto;
  }

  a {
    text-decoration: none;
  }
`
