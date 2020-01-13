import * as actionTypes from '../actionTypes';

const initialState = {
      tasks: {
            totalTasks: [],
            totalTasksCount: 0
      },
      loading: false,
      currentSort: null,
      adminToken: null,
      setMessage: null,
      editedTask: []
}

const tasksReducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.GET_TASK:
                  return  {
                        ...state,
                        tasks: {
                              ...state.tasks,
                              totalTasks: action.task.tasks,
                              totalTasksCount: action.task.total_task_count
                        }
                  }
            case actionTypes.SET_LOADING:
                  return {
                        ...state,
                        loading: !state.loading
                  }
            case actionTypes.SET_SORT:
                  return {
                        ...state,
                        currentSort: action.sort 
                  }
            case actionTypes.SET_ADMIN:
                  return {
                        ...state,
                        adminToken: action.token
                  }
            case actionTypes.SET_EDITED_TASK:
                  return {
                        ...state,
                        editedTask: [ ...state.editedTask, action.taskID ]
                  }
            case actionTypes.SET_MESSAGE:
                  return {
                        ...state,
                        setMessage: {
                              ...state.setMessage,
                              errorMessage: action.message.errorMessage,
                              successMessage: action.message.successMessage
                        }
                  }
            default:
                  return state
      }
}

export default tasksReducer;