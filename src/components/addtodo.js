import { Box, ButtonGroup } from '@chakra-ui/react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { InputControl, SubmitButton, ResetButton } from 'formik-chakra-ui';

function AddToDo({ onAddHandler }) {
  const submitHandler = (values, { setSubmitting }) => {
    console.log('Submit', values);
    onAddHandler(values.task, setSubmitting);
  };

  const initValues = {
    task: '',
    description: '',
  };

  const validationSchema = Yup.object({
    task: Yup.string().required().min(4),
  });

  return (
    <Box p="5">
      <Formik
        initialValues={initValues}
        onSubmit={submitHandler}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Box as="form" onSubmit={handleSubmit}>
            <InputControl name="task" label="Task" />
            <InputControl name="description" label="Description" />

            <ButtonGroup>
              <SubmitButton>Add</SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </Box>
  );
}

export default AddToDo;
