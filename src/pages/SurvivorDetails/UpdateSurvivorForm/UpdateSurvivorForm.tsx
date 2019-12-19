import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import * as Yup from 'yup';

const UpdateSurvivorSchema = Yup.object().shape({
  name: Yup.string(),
  gender: Yup.string(),
  age: Yup.number().positive(),
  lat: Yup.number()
    .max(180)
    .min(-180),
  lon: Yup.number()
    .max(180)
    .min(-180),
});

interface UpdateSurvivorFormProps {
  onSubmit: (values: any) => void;
}

const UpdateSurvivorForm: React.FC<UpdateSurvivorFormProps> = props => {
  return (
    <Formik
      validationSchema={UpdateSurvivorSchema}
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{ name: '', gender: 'M', age: '', lat: '', lon: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const payload = { ...values };
          for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              //@ts-ignore
              if (payload[key] === '') delete payload[key];
            }
          }
          await props.onSubmit(payload);
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

export default UpdateSurvivorForm;
