import React from 'react';
import { useRecoilState } from 'recoil';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { Text, Checkbox, Button, useToast, Box, Flex } from '@chakra-ui/react';

import { tasksListState } from 'utils';

export const TodoListItem = ({ task, onEdit, onDelete }) => {
  const toast = useToast();
  const [tasks, setTasks] = useRecoilState(tasksListState);

  const markCompleted = () => {
    setTasks(
      tasks.map(t => (t.id === task.id ? { ...t, completed: !t.completed } : t))
    );
    toast({
      title: 'Task marked as completed!',
      status: 'success',
      duration: 1000,
      isClosable: true,
    });
  };

  return (
    <Flex mb="2">
      {/* Task Title/Description */}
      <Checkbox
        verticalAlign="top"
        flex="1"
        isDisabled={task.completed}
        defaultChecked={task.completed}
        onChange={e =>
          e.target.checked && markCompleted(task.id, task.completed)
        }
      >
        <Flex
          textDecor={task.completed ? 'line-through' : ''}
          flexDirection="column"
        >
          <Box>
            <Text>{task.title}</Text>
          </Box>
          <Box>
            <Text fontSize="small" ml="2">
              {task.description}
            </Text>
          </Box>
        </Flex>
      </Checkbox>

      {/* Last Modified */}
      <Box width="100px">
        <Text fontSize="sm" ml="2">
          {task.lastModified}
        </Text>
      </Box>

      <Box width="150px" alignItems="end">
        <Button
          rounded="full"
          disabled={!!task.completed}
          colorScheme="teal"
          onClick={() => onEdit(task)}
          p="0"
        >
          <FaPencilAlt height="16px" width="16px" />
        </Button>
        <Button
          rounded="full"
          ml="2"
          disabled={task.completed}
          colorScheme="red"
          onClick={() => onDelete(task)}
          p="0"
        >
          <FaTrashAlt />
        </Button>
      </Box>
    </Flex>
  );
};
