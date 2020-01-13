import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { handleLogout } from '../../utils';

const Header = () => {
      const token = useSelector(state => state.adminToken)
      const dispatch = useDispatch();
      const history = useHistory();
      return (
            <div>
                  <nav className="navbar navbar-expand-sm bg-dark">
                        <ul className="navbar-nav">
                              <li className="nav-item">
                                    <Link to={'/react-redux-pagination'} className="nav-link" >Main page</Link>
                              </li>
                              <li className="nav-item">
                                    <Link to={'/react-redux-pagination/add-task'} className="nav-link" >Add task</Link>
                              </li>
                              {!token ? <li className="nav-item">
                                    <Link to={'/react-redux-pagination/login'} className="nav-link" >Log in</Link>
                              </li> :
                              <li className="nav-item">
                                    <button type="button" className="btn btn-primary" onClick={event => handleLogout(dispatch, history)}>Log out</button>
                              </li>}
                        </ul>
                  </nav>
            </div>
      );
}

export default Header;
