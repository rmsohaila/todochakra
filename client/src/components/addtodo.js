import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMutation, useQueryClient, useIsMutating } from 'react-query';
import {
  InputControl,
  SubmitButton,
  ResetButton,
  SelectControl,
} from 'formik-chakra-ui';
import { Box, ButtonGroup, Flex, Text, useToast } from '@chakra-ui/react';

import { taskForEditState, tasksListState } from 'utils';
import { createTask, updateTask } from 'api';
import { statusState } from './../utils/atoms';

export const AddToDo = () => {
  const toast = useToast();
  const [defaultStatusId, setDefaultStatusId] = React.useState('');
  const statuses = useRecoilValue(statusState);
  const [tasks, setTasks] = useRecoilState(tasksListState);
  const [taskForEdit, setTaskForEdit] = useRecoilState(taskForEditState);

  const queryClient = useQueryClient();
  const isMutating = useIsMutating();

  const createMutation = useMutation(createTask, response => {
    queryClient.invalidateQueries('tasks');
    //
  });
  const updateMutation = useMutation(updateTask, response => {
    queryClient.invalidateQueries('tasks');
  });
  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    if (values.mode === 'add') {
      var newTask = {
        Title: values.title,
        Description: values.description,
        StatusId: values.status,
      };
      setTasks([newTask, ...tasks]);

      await createMutation.mutateAsync(newTask);
      toast({
        title: 'Task created.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    } else {
      const updateTask = {
        TaskId: taskForEdit.id,
        Title: values.title,
        Description: values.description,
        StatusId: values.status,
      };
      await updateMutation.mutateAsync(updateTask);
      setTaskForEdit({});
      toast({
        title: 'Task updated.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }

    queryClient.invalidateQueries('tasks');
    resetForm(initValues);
    setSubmitting(false);
  };

  React.useEffect(
    () => setDefaultStatusId(statuses.find(s => s.title === 'New')?.id),
    [statuses]
  );

  // Formik initial value
  const initValues =
    Object.keys(taskForEdit).length > 0
      ? { ...taskForEdit, status: taskForEdit.status.id }
      : {
          mode: 'add',
          title: '',
          description: '',
          status: defaultStatusId,
        };

  const validationSchema = Yup.object({
    title: Yup.string().required().min(4),
    status: Yup.string().required().min(10),
  });

  if (isMutating)
    return (
      <Flex>
        <Text>Saving your changes...</Text>
      </Flex>
    );

  return (
    <Box p="5">
      <Formik
        enableReinitialize={true}
        initialValues={initValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Box as="form" onSubmit={handleSubmit}>
              <SelectControl name="status">
                <option value="">--SELECT--</option>
                {statuses &&
                  statuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.title}
                    </option>
                  ))}
              </SelectControl>
              <InputControl
                name="title"
                label="Title *"
                inputProps={{ placeholder: 'Enter task title...' }}
                mt="2"
              />
              <InputControl
                name="description"
                label="Description"
                inputProps={{ placeholder: 'Task Description...' }}
                mt="2"
              />

              <ButtonGroup mt="5">
                <SubmitButton>
                  {initValues.mode === 'add' ? 'Add' : 'Update'}
                </SubmitButton>
                <ResetButton>Reset</ResetButton>
              </ButtonGroup>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};
