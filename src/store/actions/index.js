import * as actionTypes  from "../actionTypes";

export const addTask = (task) => { type: actionTypes.ADD_TASK, task }
export const setLoading = () => { type: actionTypes.SET_LOADING }