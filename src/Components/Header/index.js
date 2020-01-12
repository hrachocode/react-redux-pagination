import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
      return (
            <div>
                  <nav className="navbar navbar-expand-sm bg-dark">
                        <ul className="navbar-nav">
                              <li className="nav-item">
                                    <Link to={'/'} className="nav-link" >Main page</Link>
                              </li>
                              <li className="nav-item">
                                    <Link to={'/login'} className="nav-link" >Log in</Link>
                              </li>
                              <li className="nav-item">
                                    <Link to={'/add-task'} className="nav-link" >Add task</Link>
                              </li>
                        </ul>
                  </nav>
            </div>
      );
}

export default Header;
