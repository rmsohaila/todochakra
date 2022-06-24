import { api } from 'utils';

const TASK_URL = '/tasks';
export const getTasks = async () => {
  return await api.get(TASK_URL);
};

export const createTask = async task => {
  return api.post(TASK_URL, task);
};

export const updateTask = async task => {
  return api.put(`${TASK_URL}/${task.TaskId}`, task);
};

export const deleteTask = async task => {
  return api.delete(`${TASK_URL}/${task.id}`);
};

export const markTaskAsCompleted = async (obj) => {
  return api.put(`${TASK_URL}/${obj.taskId}/${obj.statusId}`)
}