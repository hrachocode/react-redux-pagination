import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleTaskEditing } from '../../utils';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { SET_ADMIN } from '../../store/actionTypes';

const EditTask = () => {
      const dispatch = useDispatch()
      const message = useSelector(state => state.setMessage);
      const adminToken = useSelector(state => state.adminToken)
      const {id} = useParams();
      const {state} = useLocation();
      const history = useHistory();

      useEffect(() => {
            const isAdminLogged = JSON.parse(localStorage.getItem('persist:root')).adminToken
            isAdminLogged === 'null' && dispatch({ type: SET_ADMIN, token: null }) && history.push('/react-redux-pagination')
      },[adminToken, history, dispatch])

      return (
            <div>
                  <form onSubmit={event => handleTaskEditing(event, id, dispatch, adminToken, state)}>
                        <div className="form-group">
                              <label htmlFor="status">Status</label>
                              <input type="number" id="status" pattern='^(0|10)$' className="form-control" min="0" max="10" step='10' defaultValue={state ? parseInt(state.status) : '' } />
                        </div>
                        <div className="form-group">
                              <label htmlFor="text">Content</label>
                              <textarea className="form-control" id="text" rows="3" defaultValue={state ? state.text : '' } required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                  {message && <div className={`mt-2 alert alert-${message.errorMessage ? 'warning' : 'success'}`} role="alert">
                        {message.errorMessage ? message.errorMessage : message.successMessage}
                  </div>}
            </div>
      );
}

export default EditTask;
