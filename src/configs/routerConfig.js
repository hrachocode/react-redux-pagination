import Main from "../Components/Main";
import AddTask from "../Components/Main/AddTask";
import Login from "../Components/Authentication/Login";

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
export const routerConfig = [
      {
            path: '/',
            exact: true,
            component: Main
      },
      {
            path: "/add-task",
            component: AddTask
      },
      {
            path: "/login",
            component: Login,
      },
      {
            path: "/page/:id",
            component: Main
      }
];