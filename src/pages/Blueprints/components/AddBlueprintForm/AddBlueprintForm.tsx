import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import * as Yup from 'yup';

const AddBlueprintSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  points: Yup.number()
    .positive()
    .required('Required'),
});

interface AddBlueprintFormProps {
  onSubmit: (values: any) => void;
}

const AddBlueprintForm: React.FC<AddBlueprintFormProps> = props => {
  return (
    <Formik
      validationSchema={AddBlueprintSchema}
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ name: '', points: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          await props.onSubmit(values);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label>Name</Label>
                <Input tag={Field} name="name" />
                <ErrorMessage className="text-danger" name="name" component="div" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Points</Label>
                <Input tag={Field} type="tel" name="points" />
                <ErrorMessage className="text-danger" name="points" component="div" />
              </FormGroup>
            </Col>
          </Row>
          <Button disabled={isSubmitting} outline type="submit" color="primary" className="w-100">
            Submit
          </Button>
          {isSubmitting && (
            <div className="d-flex w-100 justify-content-center my-2">
              <Spinner color="primary" />
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddBlueprintForm;
