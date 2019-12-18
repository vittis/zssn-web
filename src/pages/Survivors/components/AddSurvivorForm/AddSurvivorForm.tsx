import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import * as Yup from 'yup';

const AddSurvivorSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  age: Yup.number()
    .positive()
    .required('Required'),
  lat: Yup.number()
    .max(180)
    .min(-180)
    .required('Required'),
  lon: Yup.number()
    .max(180)
    .min(-180)
    .required('Required'),
});

interface AddSurvivorFormProps {
  onSubmit: (values: any) => void;
}

const AddSurvivorForm: React.FC<AddSurvivorFormProps> = props => {
  return (
    <Formik
      validationSchema={AddSurvivorSchema}
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ name: '', gender: 'M', age: '', lat: '', lon: '', items: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const { lat, lon, ...payload } = values;
          await props.onSubmit({ ...payload, coordinates: [lat, lon], items: [] });
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
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
                <Label>Age</Label>
                <Input tag={Field} type="tel" name="age" />
                <ErrorMessage className="text-danger" name="age" component="div" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Gender</Label>
                <Input
                  onChange={e => setFieldValue('gender', e.target.value)}
                  component="select"
                  type="select"
                  name="gender"
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </Input>
                <ErrorMessage className="text-danger" name="gender" component="div" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Latitude</Label>
                <Input tag={Field} type="tel" name="lat" />
                <ErrorMessage className="text-danger" name="lat" component="div" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Longitude</Label>
                <Input tag={Field} type="tel" name="lon" />
                <ErrorMessage className="text-danger" name="lon" component="div" />
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

export default AddSurvivorForm;
