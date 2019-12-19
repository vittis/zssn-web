import React, { useState } from 'react';
import { useApiRequest } from '../../services/api/hooks';
import { Button, Spinner, Collapse } from 'reactstrap';
import AddSurvivorForm from './components/AddSurvivorForm';
import './index.scss';
import api from '../../services/api';
import SurvivorCard from './components/SurvivorCard';
import { BlueprintRO } from '../Blueprints/Blueprints';

export interface SurvivorRO {
  _id: string;
  name: string;
  gender: string;
  age: number;
  loc: { coordinates: [number, number] };
  infected: boolean;
  reportedBy: string[];
}

const Survivors: React.FC = () => {
  const [{ data: survivors, isLoading: survivorsLoading }, refetch] = useApiRequest<SurvivorRO[]>(
    '/survivors',
    [],
  );
  const [{ data: blueprints, isLoading: blueprintsLoading }] = useApiRequest<BlueprintRO[]>(
    '/blueprints',
    [],
  );

  const [formOpen, setFormOpen] = useState(false);

  if (survivorsLoading || blueprintsLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  async function onSubmitAddSurvivor(payload: any) {
    try {
      await api.post('/survivors', payload);
      await refetch();
      setFormOpen(false);
    } catch (err) {
      // leave treatment to global error handling
    }
  }

  return (
    <>
      <div className="d-flex">
        <h3>Survivors</h3>
        <Button onClick={() => setFormOpen(!formOpen)} color="primary" className="ml-2">
          Add new
        </Button>
      </div>
      <Collapse isOpen={formOpen}>
        <AddSurvivorForm blueprints={blueprints} onSubmit={onSubmitAddSurvivor} />
      </Collapse>
      <div className="survivor-cards-container mt-4">
        {survivors.map(survivor => (
          <SurvivorCard survivors={survivors} key={survivor._id} survivor={survivor} />
        ))}
      </div>
    </>
  );
};

export default Survivors;
