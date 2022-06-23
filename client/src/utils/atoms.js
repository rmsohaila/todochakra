import { atom, selector } from 'recoil';

export const statusState = atom({
  key: 'statuses',
  default: [],
});

export const filterState = atom({
  key: 'filter',
  default: 'all',
});

export const tasksListState = atom({
  key: 'tasksList',
  default: [],
});

export const filteredTasks = selector({
  key: 'completedTasksOnly',
  get: ({ get }) => {
    const tasks = get(tasksListState);
    const filter = get(filterState);
    if (filter === 'all') return tasks;
    else return tasks.filter(t => t.completed);
  },
});

export const taskListStatsState = selector({
  key: 'taskListStatsState',
  get: ({ get }) => {
    const todoList = get(tasksListState);
    const totalTasks = todoList.length;
    const totalCompleted = todoList.filter(t => t.completed).length;

    return {
      totalTasks,
      totalCompleted,
    };
  },
});

export const taskForEditState = atom({
  key: 'taskForEdit',
  default: {},
});
