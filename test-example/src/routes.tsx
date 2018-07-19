export const routes = [
  {
    component: 'AppComponentMustBeHere',
    routes: [
      {
        component: 'HomePageComponentMustBeHere',
        path: '/',
      },
      {
        component: 'SecondPageComponentMustBeHere',
        path: '/second',
      },
      {
        component: 'Third',
        path: '/third/',
        routes: [
          {
            component: 'YouGotIt',
            path: '/third-1',
          },
          {
            component: 'YouGotIt',
            path: '/third-2',
          },
          {
            component: 'NotSupported',
            path: '/third/:id',
          },
        ],
      },
      {
        component: '404Here',
        path: '*',
      },
    ],
  },
]
