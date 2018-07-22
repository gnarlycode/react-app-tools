const baseUrl = process.env.BASE_URL || ''
export const routes = [
  {
    component: 'AppComponentMustBeHere',
    routes: [
      {
        component: 'HomePageComponentMustBeHere',
        path: baseUrl + '/',
      },
      {
        component: 'SecondPageComponentMustBeHere',
        path: baseUrl + '/second',
      },
      {
        component: 'Third',
        path: baseUrl + '/third/',
        routes: [
          {
            component: 'YouGotIt',
            path: baseUrl + '/third-1',
          },
          {
            component: 'YouGotIt',
            path: baseUrl + '/third-2',
          },
          {
            component: 'NotSupported',
            path: baseUrl + '/third/:id',
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
