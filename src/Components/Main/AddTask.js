import React from 'react';
import { useHistory } from "react-router-dom";
import { getDataFromServer } from '../../utils';

const handleTaskAdding = async (event, history) => {
      event.preventDefault();
      const form = new FormData();
      Object.values(event.target.elements).forEach(element=> {
            const values = element.value || element.textContent !== 'Submit';
            return values && element.hasAttribute('id') ? form.append(element.id, values) : null
      })
      const init = {
            method: 'post',
            body: form
      }
      const response = await getDataFromServer('/create', init);
      if(response.status === 'ok') {
            history.push('/');
      } else console.log(response)
}

const AddTask = () => {
      const history = useHistory();
      return (
            <div>
                  <form onSubmit={event => handleTaskAdding(event, history)}>
                        <div className="form-group">
                              <label htmlFor="username">Username</label>
                              <input type="text" className="form-control" id="username" defaultValue='hrachocode'  required/>
                        </div>
                        <div className="form-group">
                              <label htmlFor="email">Email address</label>
                              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue='hracho94@gmail.com'  required />
                        </div>
                        <div className="form-group">
                              <label htmlFor="text">Content</label>
                              <textarea className="form-control" id="text" rows="3" required defaultValue='test task'></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
            </div>
      );
}

export default AddTask;
