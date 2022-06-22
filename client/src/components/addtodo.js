import React from 'react';
import { Box, ButtonGroup, useToast } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { InputControl, SubmitButton, ResetButton } from 'formik-chakra-ui';
import { taskForEditState, tasksListState } from 'utils/atoms';
import { useRecoilState } from 'recoil';

function AddToDo({ task }) {
  const toast = useToast();
  const [tasks, setTasks] = useRecoilState(tasksListState);
  const [taskForEdit, setTaskForEdit] = useRecoilState(taskForEditState);

  const submitHandler = async (values, { setSubmitting, resetForm }) => {
    if (values.mode === 'add') {
      var newTask = {
        id: tasks.length + 1,
        title: values.title,
        description: values.description,
        completed: false,
        lastModified: new Date().toISOString(),
      };
      setTasks([newTask, ...tasks]);
      toast({
        title: 'Task created.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    } else {
      const updatedTaskList = tasks.map(t => {
        if (t.id === taskForEdit.id) {
          return values;
        }
        return t;
      });
      setTasks(updatedTaskList);
      setTaskForEdit({});
      toast({
        title: 'Task updated.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }

    resetForm(initValues);
    setSubmitting(false);
  };

  // Formik initial value
  const initValues =
    Object.keys(taskForEdit).length > 0
      ? taskForEdit
      : {
          mode: 'add',
          title: 'Initial value',
          description: '',
        };
  const validationSchema = Yup.object({
    title: Yup.string().required().min(4),
  });

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
              <InputControl name="title" label="Title *" mt="2" />
              <InputControl name="description" label="Description" mt="2" />

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
}

export default AddToDo;
