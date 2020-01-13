import React from 'react';
import Main from "../Components/Main";
import AddTask from "../Components/Main/AddTask";
import EditTask from "../Components/Main/EditTask";
import Login from "../Components/Authentication/Login";
import { AuthProtection } from '../utils/index'

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
export const routerConfig = [
      {
            path: "/react-redux-pagination",
            exact: true,
            component: Main
      },
      {
            path: "/react-redux-pagination/add-task",
            component: AddTask
      },
      {
            path: "/react-redux-pagination/login",
            component: Login,
      },
      {
            path: "/react-redux-pagination/page/:id",
            component: Main
      },
      {
            path: "/react-redux-pagination/edit/:id",
            exact: true,
            component: () => <AuthProtection path='/react-redux-pagination/edit/:id'> <EditTask /> </AuthProtection>
      },
];