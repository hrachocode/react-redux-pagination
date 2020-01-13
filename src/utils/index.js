import React from 'react';
import { Route, Link, Redirect } from 'react-router-dom'
import { SET_SORT, SET_ADMIN, SET_MESSAGE, SET_EDITED_TASK } from '../store/actionTypes';
import { useSelector } from 'react-redux';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const AuthProtection = ({ children, ...rest }) => {
      const adminToken = useSelector(state => state.adminToken);
      return (
            <Route
                  {...rest}
                  render={({ location, match }) =>
                        adminToken ? (
                              children
                        ) : (
                                    <Redirect
                                          to={{
                                                pathname: "/react-redux-pagination",
                                                state: { from: location }
                                          }}
                                    />
                              )
                  }
            />
      );
}

export const getDataFromServer = async (route = '', init = {}, getParams = {}) => {
      try {
            getParams = Object.entries(getParams).map(([key, val]) => `${key}=${val}`).join('&');
            route = `https://uxcandy.com/~shapoval/test-task-backend/v2${route}/?developer=lenin&${getParams}`;
            init.header = {
                  'Content-Type': 'multipart/form-data',
            }
            const fetchData = await fetch(route, init);
            const response = await fetchData.json();
            return response;
      } catch (error) {
            return error;
      }
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export const RouteWithSubRoutes = (route) => {
      return (
            <Route
                  path={route.path}
                  render={props => (
                        // pass the sub-routes down to keep nesting
                        <route.component {...props} routes={route.routes} />
                  )}
            />
      );
}

export const Loading = () => {
      return (
            <div className="d-flex justify-content-center mt-5">
                  <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                  </div>
            </div>
      )
}

export const Pagination = ({ totalTasksCount, currentPage = 1 }) => {
      const totalPages = Math.ceil(totalTasksCount / 3);
      currentPage = parseInt(currentPage)
      const end = (currentPage + 3) <= totalPages ? currentPage + 3 : totalPages;
      const start = currentPage - 2
      return (
            <div>
                  <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end">
                              <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" to={`/react-redux-pagination/page/1`} href="#">First page</Link>
                              </li>
                              <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" href="#" tabIndex="-1" to={`/react-redux-pagination/page/${currentPage - 1}`}>Previous</Link>
                              </li>
                              {[...Array(end + 1)].map((elem, key) => {
                                    if (key !== 0 && key >= start && key <= end) {
                                          return (
                                                <li key={key} className={`page-item ${key === currentPage ? 'disabled' : ''}`}>
                                                      <Link to={`/react-redux-pagination/page/${key}`} className="page-link">{key}</Link>
                                                </li>
                                          )
                                    } else {
                                          return false
                                    }
                              })}
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link className="page-link" to={`/react-redux-pagination/page/${currentPage + 1}`} href="#">Next</Link>
                              </li>
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link className="page-link" to={`/react-redux-pagination/page/${totalPages}`} href="#">Last page</Link>
                              </li>
                        </ul>
                  </nav>
            </div>
      )
}

export const handleSort = async (event, dispatch, currentSort) => {

      const sortParams = {
            sort_field: event.target.dataset.value,
            sort_direction: !currentSort ? 'desc' : (currentSort.sort_direction === 'desc' ? 'asc' : 'desc')
      }

      dispatch({ type: SET_SORT, sort: sortParams })
}

export const formDataIterator = (form, adminToken) => {
      const formData = new FormData()
      Object.values(form.elements).forEach(element => {
            const values = element.value || element.textContent !== 'Submit';
            if (values && element.hasAttribute('id')) {
                  if(adminToken){
                        formData.append('token', adminToken)
                  }
                  formData.append(element.id, values)
            }
            else return null
      })
      return formData
}

export const handleTaskAdding = async (event, dispatch) => {
      event.preventDefault();
      const formData = formDataIterator(event.target, null);
      const response = await getDataFromServer('/create', { method: 'post', body: formData });
      if (response.status === 'ok') {
            dispatch({ type: SET_MESSAGE, message: { successMessage: 'Задача успешно добавлена' } })
      } else dispatch({ type: SET_MESSAGE, message: { errorMessage: response.message.username } })
}

export const handleTaskEditing = async (event, id, dispatch, adminToken, state) => {
      event.preventDefault();
      const formData = formDataIterator(event.target, adminToken);
      const response = await getDataFromServer(`/edit/${id}`, { method: 'post', body: formData });
      if (response.status === 'ok') {
            state.text !== formData.get('text') && dispatch({ type: SET_EDITED_TASK, taskID: state.postID })
            dispatch({ type: SET_MESSAGE, message: { successMessage: 'Задача успешно Изменена' } })
      } else dispatch({ type: SET_MESSAGE, message: { errorMessage: response.message.token } })
}

export const handleAdminLogin = async (event, dispatch, history) => {
      event.preventDefault();
      const formData = formDataIterator(event.target);
      const response = await getDataFromServer('/login', { method: 'post', body: formData });
      if (response.status === 'ok') {
            dispatch({ type: SET_ADMIN, token: response.message.token })
            history.push('/react-redux-pagination')
      } else {
            dispatch({ type: SET_MESSAGE, message: { errorMessage: response.message.password } })
      }
}

export const handleLogout = (dispatch, history) => {
      dispatch({ type: SET_ADMIN, token: null })
      window.location.reload();
}