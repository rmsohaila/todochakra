import React from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Box,
  Heading,
  Text,
  Flex,
  Spacer,
  Switch,
  HStack,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import {
  taskForEditState,
  filteredTasks,
  filterState,
  taskListStatsState,
  statusState,
} from 'utils';
import { TodoListItem } from 'components';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import { deleteTask, markTaskAsCompleted } from 'api';

export const TodoList = () => {
  const [filter, setFilter] = useRecoilState(filterState);
  const statuses = useRecoilValue(statusState);
  const setTaskForEdit = useSetRecoilState(taskForEditState);
  const taskListStats = useRecoilValue(taskListStatsState);
  const tasks = useRecoilValue(filteredTasks);
  const isLoading = useIsFetching();

  const queryClient = useQueryClient();
  const mutateDelete = useMutation(deleteTask);
  const mutateTaskStatus = useMutation(markTaskAsCompleted);

  const toast = useToast();

  const onMarkCompleted = task => {
    mutateTaskStatus
      .mutateAsync({
        taskId: task.id,
        statusId: statuses.find(s => s.title === 'Completed').id,
      })
      .then(res => {
        toast({
          title: 'Task marked as completed!',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      });
  };

  const onEditHandler = task => {
    if (!task) return;
    setTaskForEdit({ mode: 'edit', ...task });
  };
  const onDeleteHandler = task => {
    if (!task) return;
    if (window.confirm('Are you sure to delete the task?')) {
      mutateDelete.mutateAsync(task).then(res => {
        queryClient.invalidateQueries('tasks');

        toast({
          title: 'Task Deleted.',
          status: 'success',
          duration: 1000,
          isClosable: true,
        });
      });
    }
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
            {filter === 'all' && (
              <Text>({taskListStats.totalTasks} tasks)</Text>
            )}
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

      {isLoading > 0 && <Text align="center">Working...</Text>}
      {!isLoading && tasks.length === 0 && <Text align="center">No tasks</Text>}
      {tasks &&
        tasks.length > 0 &&
        tasks.map((t, i) => {
          return (
            <TodoListItem
              key={i}
              task={t}
              onMarkCompleted={onMarkCompleted}
              onItemEdit={onEditHandler}
              onItemDelete={onDeleteHandler}
            />
          );
        })}
    </Box>
  );
};
