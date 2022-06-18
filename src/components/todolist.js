import { Box, Stack, Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import TodoListItem from './todolistitem';
const data = [
  { id: 1, title: 'Task 1', isComplete: false },
  { id: 2, title: 'Task 2', isComplete: true },
  { id: 3, title: 'Task 3', isComplete: false },
];

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(data);
  }, []);

  return (
    <Box p="5">
      <Heading my="2">Task List</Heading>
      <Stack>
        {tasks.map(t => {
          return <TodoListItem key={t.id} task={t} />;
        })}
      </Stack>
    </Box>
  );
}

export default ToDoList;
