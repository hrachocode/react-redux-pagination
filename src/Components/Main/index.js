import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDataFromServer, Loading, Pagination, handleSort } from '../../utils';
import { GET_TASK, SET_LOADING } from '../../store/actionTypes';

import desc from './assets/img/sort_desc.png';
import asc from './assets/img/sort_asc.png';
import editIcon from './assets/img/edit-icon.png'

const Main = ({ match }) => {

      const dispatch = useDispatch();
      const tasks = useSelector(state => state.tasks);
      const loading = useSelector(state => state.loading);
      const currentSort = useSelector(state => state.currentSort)
      const editedTasks = useSelector(state => state.editedTask)
      const adminToken = useSelector(state => state.adminToken)

      useEffect(() => {
            const getTasks = async () => {
                  dispatch({ type: SET_LOADING })

                  const response = await getDataFromServer('', {}, { ...currentSort, page: typeof match.params.id !== 'undefined' ? match.params.id : 1 });
                  if (response.status === 'ok') {
                        dispatch({ type: GET_TASK, task: response.message })
                        dispatch({ type: SET_LOADING })
                        if (currentSort) {
                              document.querySelector(`span[data-value='${currentSort.sort_field}']`)
                                    .style.backgroundImage = currentSort.sort_direction === 'asc' ? `url(${desc}` : `url(${asc}`
                        }
                  }
            }
            getTasks()
      }, [dispatch, match.params.id, currentSort])

      return (
            <div>
                  {!loading ?
                        <div>
                              <table className="table table-striped text-center table-dark mt-5">
                                    <thead>
                                          <tr>
                                                <th scope="col">
                                                      <span
                                                            data-value='username'
                                                            onClick={event => handleSort(event, dispatch, currentSort)}
                                                      >
                                                            Username
                                                      </span>
                                                </th>
                                                <th scope="col">
                                                      <span
                                                            data-value='email'
                                                            onClick={event => handleSort(event, dispatch, currentSort)}
                                                      >
                                                            Email
                                                            </span>
                                                </th>
                                                <th>
                                                      <span> Text </span>
                                                </th>
                                                <th scope="col">
                                                      <span
                                                            data-value='status'
                                                            onClick={event => handleSort(event, dispatch, currentSort)}
                                                      >
                                                            Status
                                                            </span>
                                                </th>
                                                {adminToken && <th>Edit</th>}
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {tasks.totalTasks && tasks.totalTasks.map((elem, key) => {
                                                return (
                                                      <tr key={key}>
                                                            <td>{elem.username}</td>
                                                            <td>{elem.email}</td>
                                                            <td>{elem.text}</td>
                                                            <td>
                                                                  {elem.status === 10 ? 'Выполнено' : 'Не Выполнено'}
                                                                  {editedTasks.includes(elem.id) && ' | Отредактировано Админом'}
                                                            </td>
                                                            {adminToken && <td> 
                                                                  <div>
                                                                        <Link to={
                                                                              {
                                                                                    pathname: `/react-redux-pagination/edit/${elem.id}`,
                                                                                    state: { postID: elem.id, status: elem.status, text: elem.text }
                                                                              }
                                                                              } >
                                                                              <img src={editIcon} alt='edit icon' />
                                                                        </Link>
                                                                  </div>                                          
                                                            </td>}
                                                      </tr>
                                                )
                                          })}
                                    </tbody>
                              </table>
                              <Pagination totalTasksCount={tasks.totalTasksCount} currentPage={match.params.id} />
                        </div>
                        : <Loading />}
            </div>
      );
}

export default Main;
