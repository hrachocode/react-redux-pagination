import * as actionTypes from '../actionTypes';

const initialState = {
      tasks: {
            totalTasks: [],
            totalTasksCount: 0
      },
      loading: false
}

const tasksReducer = (state = initialState, action) => {
      switch (action.type) {
            case actionTypes.ADD_TASK:
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
            default:
                  return state
      }
}

export default tasksReducer;