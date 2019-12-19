import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useApiRequest from '../../services/api/hooks';
import { BlueprintRO } from '../Blueprints/Blueprints';
import { Spinner } from 'reactstrap';

interface SurvivorDetailsRouteParams {
  blueprintId: string;
}

const BlueprintDetails: React.FC<RouteComponentProps<SurvivorDetailsRouteParams>> = props => {
  const { blueprintId } = props.match.params;
  const [{ data: blueprint }] = useApiRequest<BlueprintRO | null>(
    `/blueprints/${blueprintId}`,
    null,
  );

  if (blueprint === null) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }
  return (
    <>
      <h2>{blueprint.name}</h2>
      <div>Points: {blueprint.points}</div>
    </>
  );
};

export default BlueprintDetails;
