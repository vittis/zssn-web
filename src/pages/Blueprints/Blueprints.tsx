import React, { useState } from 'react';
import { Spinner, Button, Collapse } from 'reactstrap';
import useApiRequest from '../../services/api/hooks';
import api from '../../services/api';
import BlueprintCard from './components/BlueprintCard';
import AddBlueprintForm from './components/AddBlueprintForm';

export interface BlueprintRO {
  _id: string;
  name: string;
  points: number;
}

const Blueprints: React.FC = () => {
  const [{ data: blueprints, isLoading }, refetch] = useApiRequest<BlueprintRO[]>(
    '/blueprints',
    [],
  );
  const [formOpen, setFormOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  async function onSubmitAddBlueprint(payload: any) {
    try {
      await api.post('/blueprints', payload);
      await refetch();
      setFormOpen(false);
    } catch (err) {
      // leave treatment to global error handling
    }
  }

  return (
    <>
      <div className="d-flex">
        <h3>Blueprints</h3>
        <Button onClick={() => setFormOpen(!formOpen)} color="primary" className="ml-2">
          Add new
        </Button>
      </div>
      <Collapse isOpen={formOpen}>
        <AddBlueprintForm onSubmit={onSubmitAddBlueprint} />
      </Collapse>
      <div className="survivor-cards-container mt-4">
        {blueprints.map(blueprint => (
          <BlueprintCard key={blueprint._id} blueprint={blueprint} />
        ))}
      </div>
    </>
  );
};

export default Blueprints;
