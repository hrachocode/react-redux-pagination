import React from 'react';

const Login = () => {
      return (
            <div>
                  <form>
                        <div className="form-group">
                              <label htmlFor="exampleInputUsername1">Username</label>
                              <input type="text" pattern='/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/' className="form-control" id="exampleInputUsername1" required />
                        </div>
                        <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Password</label>
                              <input type="text" className="form-control" id="exampleInputPassword1" required />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
            </div>
      );
}

export default Login;
