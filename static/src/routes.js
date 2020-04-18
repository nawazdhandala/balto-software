import React from 'react';

const Forms = React.lazy(() => import('./views/Base/Forms'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/new', name: 'Forms', component: Forms },
  { path: '/edit/:id', name: 'Forms', component: Forms },
];

export default routes;
