import React from 'react';
import { useRecoilState } from 'recoil';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import {
  Text,
  Checkbox,
  Button,
  useToast,
  Box,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';

import { tasksListState } from 'utils';
import DeleteConfirmation from './deleteConfirmation';

export const TodoListItem = ({
  task,
  onMarkCompleted,
  onItemEdit,
  onItemDelete,
}) => {
  const toast = useToast();
  const [tasks, setTasks] = useRecoilState(tasksListState);

  const markCompleted = () => {
    setTasks(
      tasks.map(t => {
        if (t.id === task.id) {
          onMarkCompleted(t);
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );

    
  };

  // const onDelete = task => {
  //   return <DeleteConfirmation
  //     title="Are you sure"
  //     content={'Do you want to remove task' + task.title}
  //     onCloseHandler={ v => console.log('from alert dialog: ', v)}
  //   />
  // };

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
          onClick={() => onItemEdit(task)}
          p="0"
        >
          <FaPencilAlt height="16px" width="16px" />
        </Button>
        <Button
          rounded="full"
          ml="2"
          disabled={task.completed}
          colorScheme="red"
          onClick={() => onItemDelete(task)}
          p="0"
        >
          <FaTrashAlt />
        </Button>
      </Box>
    </Flex>
  );
};
