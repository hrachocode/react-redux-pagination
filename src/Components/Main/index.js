import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDataFromServer, Loading, Pagination } from '../../utils';
import { ADD_TASK, SET_LOADING } from '../../store/actionTypes';

const handleSort = async (value, id, dispatch) => {
      dispatch({ type: SET_LOADING })

      const sortParams = {
            sort_field: value,
            page: id,
            sort_direction: 'asc'
      }

      const response = await getDataFromServer('', {}, sortParams)
      if (response.status === 'ok') {
            dispatch({ type: ADD_TASK, task: response.message })
            dispatch({ type: SET_LOADING })
      }
}

const Main = () => {
      let { id } = useParams();
      const dispatch = useDispatch();
      const data = useSelector(state => state.tasks.totalTasks)
      const dataLength = useSelector(state => state.tasks.totalTasksCount)
      const loading = useSelector(state => state.loading)
      useEffect(() => {
            const getTasks = async () => {
                  dispatch({ type: SET_LOADING })
                  const response = await getDataFromServer('', {}, { sort_direction: 'desc', page: id });
                  if (response.status === 'ok') {
                        dispatch({ type: ADD_TASK, task: response.message })
                        dispatch({ type: SET_LOADING })
                  }
            }
            getTasks()
      }, [dispatch, id])

      return (
            <div>
                  {!loading ?
                        <div>
                              <table className="table table-striped  table-dark mt-5">
                                    <thead>
                                          <tr>
                                                <th scope="col" data-value='id' >
                                                     <span>ID</span> 
                                                </th>
                                                <th scope="col" data-value='username'  >
                                                      <span onClick={event => handleSort(event.target.dataset.value, id, dispatch)}>Username</span>
                                                </th>
                                                <th scope="col" data-value='email'  >
                                                      <span onClick={event => handleSort(event.target.dataset.value, id, dispatch)}>Email</span>
                                                </th>
                                                <th scope="col" data-value='status'  >
                                                      <span onClick={event => handleSort(event.target.dataset.value, id, dispatch)}>Status</span>
                                                </th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {data && data.map((elem, key) => {
                                                return (
                                                      <tr key={key}>
                                                            <td>{elem.id}</td>
                                                            <td>{elem.username}</td>
                                                            <td>{elem.email}</td>
                                                            <td>{elem.status}</td>
                                                      </tr>
                                                )
                                          })}
                                    </tbody>
                              </table>
                              <Pagination totalTasksCount={dataLength} currentPage={id} />
                        </div>
                        : <Loading />}
            </div>
      );
}

export default Main;
