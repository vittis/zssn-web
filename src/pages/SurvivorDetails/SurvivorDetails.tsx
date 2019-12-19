import React, { useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import useApiRequest from '../../services/api/hooks';
import { SurvivorRO } from '../Survivors/Survivors';
import { Spinner, Button, Collapse } from 'reactstrap';
import UpdateSurvivorForm from './UpdateSurvivorForm';
import api from '../../services/api';

interface SurvivorDetailsRouteParams {
  survivorId: string;
}

export interface ItemRO {
  _id: string;
  quantity: number;
  item: { _id: string; name: string; points: number };
  owner: string;
}

const SurvivorDetails: React.FC<RouteComponentProps<SurvivorDetailsRouteParams>> = props => {
  const { survivorId } = props.match.params;
  const [{ data: survivor }, refetchSurvivor] = useApiRequest<SurvivorRO | null>(
    `/survivors/${survivorId}`,
    null,
  );
  const [{ data: items }] = useApiRequest<ItemRO[] | null>(`/survivors/${survivorId}/items`, null);
  const [formOpen, setFormOpen] = useState(false);

  if (survivor === null || items === null) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }

  async function onSubmitUpdateSurvivor(payload: any) {
    try {
      await api.patch(`/survivors/${survivorId}`, payload);
      await refetchSurvivor();
      setFormOpen(false);
    } catch (err) {
      // leave treatment to global error handling
    }
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <h2>{survivor.name}</h2>
        <Button size="sm" onClick={() => setFormOpen(!formOpen)} color="primary" className="ml-2">
          Update
        </Button>
        <Link to={`/survivors/${survivorId}/trade`}>
          <Button
            disabled={survivor.infected}
            size="sm"
            onClick={() => setFormOpen(!formOpen)}
            color="primary"
            className="ml-2"
          >
            Trade
          </Button>
        </Link>
        {/* @todo */}
        {/* <Button size="sm" onClick={() => setFormOpen(!formOpen)} color="primary" className="ml-2">
          Report
        </Button> */}
      </div>
      <Collapse isOpen={formOpen}>
        <UpdateSurvivorForm onSubmit={onSubmitUpdateSurvivor} />
      </Collapse>
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
      <div className="mb-2">
        Reported by:
        <ul className="font-weight-bold mb-0">
          {survivor.reportedBy.length > 0 ? (
            survivor.reportedBy.map(reported => <li key={reported}>{reported}</li>)
          ) : (
            <li>No one!</li>
          )}
        </ul>
      </div>
      <h3>Items</h3>
      {items.length > 0 ? (
        items.map(item => (
          <li key={item._id}>
            {item.quantity} {item.item.name}{' '}
            <Link to={`/blueprints/${item.item._id}`}>(view blueprint)</Link>
          </li>
        ))
      ) : (
        <li>No items :(</li>
      )}
    </>
  );
};

export default SurvivorDetails;
