import React from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from 'react-query';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import { tasksListState, statusState } from 'utils';
import { getTasks, getStatuses } from 'api';
import { AddToDo, TodoList } from 'components';

export function App() {
  const setStatuses = useSetRecoilState(statusState);
  const setTasks = useSetRecoilState(tasksListState);
  useQuery('tasks', getTasks, {
    onSuccess: res => setTasks([...res.data]),
  });
  useQuery('statuses', getStatuses, {
    onSuccess: res => setStatuses([...res.data]),
  });

  return (
    <ChakraProvider>
      <Flex alignItems="center" mt="5">
        <ColorModeSwitcher />
      </Flex>
      <AddToDo />
      <TodoList />
    </ChakraProvider>
  );
}

export default App;
