import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormGroup, Label, Input, Button, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { BlueprintRO } from '../../../Blueprints/Blueprints';

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
  blueprints: BlueprintRO[];
}

const AddSurvivorForm: React.FC<AddSurvivorFormProps> = props => {
  const { blueprints } = props;

  const [items, setItems] = useState<{ id: string; quantity: number }[]>([]);

  function addItems(id: string, quantity: number) {
    if (!quantity || quantity === 0) {
      return;
    }
    const item = items.find(i => i.id === id);
    if (!item) {
      setItems([...items, { id, quantity }]);
    } else {
      setItems(
        items.filter(i => {
          if (i.id === id) {
            i.quantity = quantity;
          }
          return i;
        }),
      );
    }
  }

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
          await props.onSubmit({ ...payload, coordinates: [lat, lon], items });
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
                <Input tag={Field} type="number" name="age" />
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
                <Input tag={Field} type="number" name="lat" />
                <ErrorMessage className="text-danger" name="lat" component="div" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label>Longitude</Label>
                <Input tag={Field} type="number" name="lon" />
                <ErrorMessage className="text-danger" name="lon" component="div" />
              </FormGroup>
            </Col>
          </Row>
          <h5>Items:</h5>
          <Row>
            {false ? (
              blueprints.map(blueprint => {
                return (
                  <Col key={blueprint._id} md={2}>
                    <FormGroup>
                      <Label>{blueprint.name}</Label>
                      <Input
                        onChange={e => addItems(blueprint._id, parseInt(e.target.value))}
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                );
              })
            ) : (
              <div className="ml-3">No blueprints found...</div>
            )}
          </Row>
          <Button
            disabled={isSubmitting}
            outline
            type="submit"
            color="primary"
            className="w-100 mt-2"
          >
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
