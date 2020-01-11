import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { makeStore } from 'data/store'
import { ClientAppRoot } from 'components/Layout/ClientAppRoot'

const store = makeStore({ init: (window as any).__INITIAL_STATE__ })

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ClientAppRoot fetchContext={store} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
