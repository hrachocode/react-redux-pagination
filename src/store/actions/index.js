import * as actionTypes  from "../actionTypes";

export const addTask = task => { type: actionTypes.GET_TASK, task }
export const setLoading = () => { type: actionTypes.SET_LOADING }
export const setSort = sort => { type: actionTypes.SET_SORT, sort }
export const setAdmin = token => { type: actionTypes.SET_ADMIN, token }
export const setMessage = message => { type: actionTypes.SET_MESSAGE, message }
export const setEditedTask = taskID => { type: actionTypes.SET_EDITED_TASK, taskID }