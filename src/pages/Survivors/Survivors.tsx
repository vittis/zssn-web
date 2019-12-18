import React, { useState } from 'react';
import { useApiRequest } from '../../services/api/hooks';
import { Card, CardHeader, CardBody, Button, Spinner, Collapse } from 'reactstrap';
import AddSurvivorForm from './components/AddSurvivorForm';
import './index.scss';
import api from '../../services/api';

interface SurvivorRO {
  _id: string;
  name: string;
  gender: string;
  age: number;
  loc: { coordinates: [number, number] };
  infected: boolean;
  reportedBy: string[];
}

const Survivors: React.FC = () => {
  const [survivorsReq, refetchSurvivors] = useApiRequest<SurvivorRO[]>('/survivors', []);
  const [itemsReq] = useApiRequest('/items', []);
  const [blueprintsReq] = useApiRequest('/blueprints', []);

  const [formOpen, setFormOpen] = useState(false);

  if (survivorsReq.isLoading || itemsReq.isLoading || blueprintsReq.isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  const { data: survivors } = survivorsReq;
  const { data: items } = itemsReq;
  const { data: blueprints } = blueprintsReq;

  async function onSubmitAddSurvivor(payload: any) {
    try {
      await api.post('/survivors', payload);
      await refetchSurvivors();
      setFormOpen(false);
    } catch (err) {
      // leave to global error handling
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
        <AddSurvivorForm onSubmit={onSubmitAddSurvivor} />
      </Collapse>
      <div className="survivor-cards-container mt-4">
        {survivors.map(survivor => (
          <Card outline color={survivor.infected ? 'danger' : ''} key={survivor._id}>
            <CardHeader className="text-center font-weight-bold">{survivor.name}</CardHeader>
            <CardBody>
              <div>
                Age: <span className="font-weight-bold">{survivor.age}</span>
              </div>
              <div>
                Gender: <span className="font-weight-bold">{survivor.gender}</span>
              </div>
              <div>
                Coordinates:{' '}
                <span className="font-weight-bold">
                  {survivor.loc.coordinates[0]}, {survivor.loc.coordinates[1]}
                </span>
              </div>
              <div>
                <span>
                  Status:{' '}
                  {survivor.infected ? (
                    <span className="text-danger">Infected!</span>
                  ) : (
                    <span className="text-success">Healthy</span>
                  )}
                </span>
              </div>
              <div>
                Reported by:
                <ul className="font-weight-bold mb-0">
                  {survivor.reportedBy.length > 0 ? (
                    survivor.reportedBy.map(reported => <li key={reported}>{reported}</li>)
                  ) : (
                    <li>No one!</li>
                  )}
                </ul>
              </div>
              <div>
                Items:
                <ul className="font-weight-bold mb-0">
                  {survivor.reportedBy.length > 0 ? (
                    ['someone', 'xiba'].map(reported => <li key={reported}>{reported}</li>)
                  ) : (
                    <li>No items...</li>
                  )}
                </ul>
              </div>

              <Button outline color="primary" className="w-100 mt-3 mb-2">
                Update
              </Button>
              <Button outline color="primary" className="w-100 mb-2">
                Trade
              </Button>
              <Button outline color="primary" className="w-100 mb-2">
                Report
              </Button>
              <Button outline color="danger" className="w-100">
                Delete
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Survivors;
