import React from 'react';
import { Route, Link } from 'react-router-dom'

export const getDataFromServer = async (route = '', init = {}, getParams = {}) => {
      try {
            getParams = Object.entries(getParams).map(([key, val]) => `${key}=${val}`).join('&');
            route = `https://uxcandy.com/~shapoval/test-task-backend/v2${route}/?developer=hrach&${getParams}`;
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

export const Pagination = ({ totalTasksCount, currentPage = 1, sortParams = {} }) => {
      const totalPages = Math.ceil(totalTasksCount / 3);
      currentPage = parseInt(currentPage)
      const end = (currentPage + 3) <= totalPages ? currentPage + 3 : totalPages;
      const start = currentPage - 2
      return (
            <div>
                  <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end">
                              <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" to={`/page/1`} href="#">First page</Link>
                              </li>
                              <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                                    <Link className="page-link" href="#" tabIndex="-1" to={`/page/${currentPage-1}`}>Previous</Link>
                              </li>
                              {[...Array(end+1)].map((elem, key) => {
                                    
                                    if( key !== 0 && key >= start && key <= end ) {

                                          return ( 
                                                <li key={key} className={`page-item ${key === currentPage ? 'disabled' : ''}`}>
                                                      <Link to={`/page/${key}`} className="page-link">{key}</Link>
                                                </li>
                                          )
                                    }else{
                                          return false
                                    }

                              })}
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link className="page-link" to={`/page/${currentPage+1}`} href="#">Next</Link>
                              </li>
                              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <Link className="page-link" to={`/page/${totalPages}`} href="#">Last page</Link>
                              </li>
                        </ul>
                  </nav>
            </div>
      )
}