import React from 'react';
import { ChakraProvider, theme, Button } from '@chakra-ui/react';
import ToDoList from './components/todolist';
import AddToDo from './components/addtodo';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const addHandler = (t, s) => {
    console.log('Add Handler: ', t);
    setTimeout(() => s(false), 2000);
  };
  return (
    <ChakraProvider>
      <ColorModeSwitcher />
      <AddToDo onAddHandler={addHandler} />
      <ToDoList />
    </ChakraProvider>
  );
}

export default App;
