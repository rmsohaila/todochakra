import React, { useState } from 'react';
import { Text, Checkbox } from '@chakra-ui/react';

function TodoListItem({ task }) {
  const [_task, _setTask] = useState(task);

  return (
    <Checkbox
      isDisabled={_task.isComplete}
      defaultChecked={_task.isComplete}
      onChange={e =>
        e.target.checked && _setTask({ ...task, isComplete: true })
      }
    >
      <Text textDecor={_task.isComplete ? 'line-through' : ''}>
        {_task.title}
      </Text>
    </Checkbox>
  );
}

export default TodoListItem;
