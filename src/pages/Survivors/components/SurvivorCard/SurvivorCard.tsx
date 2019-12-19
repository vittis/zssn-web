import React from 'react';
import { SurvivorRO } from '../../Survivors';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

interface SurvivorCardProps {
  survivor: SurvivorRO;
  survivors: SurvivorRO[];
}

const SurvivorCard: React.FC<SurvivorCardProps> = props => {
  const { survivor, survivors } = props;
  return (
    <Card outline color={survivor.infected ? 'danger' : ''}>
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
              survivor.reportedBy.map(reported => {
                const reportee = survivors.find(s => s._id === reported[0]);

                return <li key={reported[0]}>{reportee ? reportee.name : '?'}</li>;
              })
            ) : (
              <li>No one!</li>
            )}
          </ul>
        </div>
        <Link to={`/survivors/${survivor._id}`}>
          <Button outline color="primary" className="w-100 mt-3">
            View Details
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SurvivorCard;
