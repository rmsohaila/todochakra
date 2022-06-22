import React, { useEffect } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { tasksListState } from './utils/atoms';
import ToDoList from './components/todolist';
import AddToDo from './components/addtodo';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { getTasks } from 'api/todo.service';
import { useQuery } from 'react-query';

export function App() {
  const setTasks = useSetRecoilState(tasksListState);
  const [data, isLoading] = useQuery('books', getTasks);
console.log(data);
  if (isLoading) {
    return 'Loading tasks...';
  }
  // useEffect(() => {
  //   getTasks().then(tasks => {
  //     setTasks([...tasks.data]);
  //   });
  // });

  return (
    <ChakraProvider>
        <Flex alignItems="center" mt="5">
          <ColorModeSwitcher />
        </Flex>
        <AddToDo />
        <ToDoList />
    </ChakraProvider>
  );
}

export default App;
