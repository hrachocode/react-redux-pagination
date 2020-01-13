import React from 'react';
import { handleTaskAdding } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

const AddTask = () => {
      const dispatch = useDispatch();
      const message = useSelector(state => state.setMessage);
      return (
            <div>
                  <form onSubmit={event => handleTaskAdding(event, dispatch)}>
                        <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input type="text" className="form-control" id="username"  required/>
                        </div>
                        <div className="form-group">
                              <label htmlFor="email">Email address</label>
                              <input type="email" className="form-control" id="email" aria-describedby="emailHelp"  required />
                        </div>
                        <div className="form-group">
                              <label htmlFor="text">Content</label>
                              <textarea className="form-control" id="text" rows="3" required ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  {message && <div className={`mt-2 alert alert-${ message.errorMessage ? 'warning' : 'success'}`} role="alert">
                        {message.errorMessage ? message.errorMessage : message.successMessage}
                  </div>}
            </div>
      );
}

export default AddTask;
