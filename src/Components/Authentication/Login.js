import React from 'react';
import { handleAdminLogin } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = () => {
      const dispatch = useDispatch();
      const message = useSelector(state => state.setMessage);
      const history = useHistory();
      return (
            <div>
                  <form onSubmit={event => handleAdminLogin(event, dispatch, history)}>
                        <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input type="text" className="form-control" id="username" required />
                        </div>
                        <div className="form-group">
                              <label htmlFor="password">Password</label>
                              <input type="password" className="form-control" id="password" required />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  {message && <div className={`mt-2 alert alert-${ message.errorMessage ? 'warning' : 'success'}`} role="alert">
                        {message.errorMessage}
                  </div>}
            </div>
      );
}

export default Login;
