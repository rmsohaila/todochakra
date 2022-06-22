import React from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useSetRecoilValue,
} from 'recoil';
import {
  Box,
  Heading,
  Text,
  Flex,
  Spacer,
  Switch,
  HStack,
} from '@chakra-ui/react';
import TodoListItem from './todolistitem';
import {
  taskForEditState,
  filteredTasks,
  filterState,
  taskListStatsState,
} from 'utils/atoms';

function ToDoList() {
  const [filter, setFilter] = useRecoilState(filterState);
  const setTaskForEdit = useSetRecoilState(taskForEditState);
  const taskListStats = useRecoilValue(taskListStatsState);
  const [tasks, setTasks] = useRecoilState(filteredTasks);

  const onEditHandler = task => {
    if (!task) return;
    setTaskForEdit({ mode: 'edit', ...task });
  };
  const onDeleteHandler = task => {
    if (!task) return;
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  const showCompletedTasks = () => {
    return filter === 'all' ? setFilter('completed') : setFilter('all');

  };

  return (
    <Box as="div" p="5">
      <Flex>
        <Heading my="2">Task List</Heading>

        <Spacer />

        <HStack>
          <Box>
            {filter === 'all' && <Text>({taskListStats.totalTasks} tasks)</Text>}
            {filter === 'completed' && (
              <Text>({taskListStats.totalCompleted} completed)</Text>
            )}
          </Box>
          <Text>Show Completed Only</Text>
          <Switch id="email-alerts" onChange={showCompletedTasks} />
        </HStack>
      </Flex>

      {/* Header Row */}
      <Flex my="5" p="2" bgColor={'Background'}>
        <Box flex="1">Task Detail</Box>
        <Box width="100px">Last Modified</Box>
        <Box width="150px" pl="5">
          Actions
        </Box>
      </Flex>
      {/* Content Rows */}
      {tasks.length === 0 && <Text>No tasks</Text>}
      {tasks &&
        tasks.length > 0 &&
        tasks.map(t => {
          return (
            <TodoListItem
              key={t.id}
              task={t}
              onEdit={onEditHandler}
              onDelete={onDeleteHandler}
            />
          );
        })}
    </Box>
  );
}

export default ToDoList;
