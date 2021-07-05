import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import tasksActions from './tasks-actions.js';

const items = createReducer([], {
  [tasksActions.fetchTaskSuccess]: (_, { payload }) => payload,
  [tasksActions.addTaskSuccess]: (state, { payload }) => [...state, payload],
  [tasksActions.deleteTaskSuccess]: (state, { payload }) => [
    ...state.filter(item => item._id !== payload),
  ],

  [tasksActions.changeTaskSuccess]: (state, { payload }) => [
    ...state.map(task =>
      task._id === payload.taskId
        ? {
            ...task,
            hoursWasted: payload.hoursWasted,
            hoursWastedPerDay: [
              ...task.hoursWastedPerDay.map(item =>
                item.currentDay === payload.currentDay
                  ? { ...item, singleHoursWasted: payload.singleHoursWasted }
                  : item,
              ),
            ],
          }
        : task,
    ),
  ],
});

const loading = createReducer(false, {
  [tasksActions.fetchTaskRequest]: () => true,
  [tasksActions.fetchTaskSuccess]: () => false,
  [tasksActions.fetchTaskError]: () => false,
  [tasksActions.addTaskRequest]: () => true,
  [tasksActions.addTaskSuccess]: () => false,
  [tasksActions.addTaskError]: () => false,
  [tasksActions.deleteTaskRequest]: () => true,
  [tasksActions.deleteTaskSuccess]: () => false,
  [tasksActions.deleteTaskError]: () => false,
  [tasksActions.changeTaskRequest]: () => true,
  [tasksActions.changeTaskSuccess]: () => false,
  [tasksActions.changeTaskError]: () => false,
});

const filter = createReducer('', {
  [tasksActions.changeFilter]: (_, { payload }) => payload,
});

const currentDay = createReducer(Date.now(), {
  [tasksActions.changeCurrentDay]: (_, { payload }) => payload,
});

const handleError = (_, { payload }) => payload?.response?.data;
const clearError = () => null;

const error = createReducer(null, {
  [tasksActions.fetchTaskRequest]: clearError,
  [tasksActions.fetchTaskError]: handleError,
  [tasksActions.addTaskRequest]: clearError,
  [tasksActions.addTaskError]: handleError,
  [tasksActions.deleteTaskRequest]: clearError,
  [tasksActions.deleteTaskError]: handleError,
  [tasksActions.changeTaskRequest]: clearError,
  [tasksActions.changeTaskError]: handleError,
});

export default combineReducers({
  items,
  filter,
  currentDay,
  loading,
  error,
});
