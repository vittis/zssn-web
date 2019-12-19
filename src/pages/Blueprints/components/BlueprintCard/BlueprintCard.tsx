import React from 'react';
import { BlueprintRO } from '../../Blueprints';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

interface BlueprintCardProps {
  blueprint: BlueprintRO;
}

const BlueprintCard: React.FC<BlueprintCardProps> = props => {
  const { blueprint } = props;
  return (
    <Card outline>
      <CardHeader className="text-center font-weight-bold">{blueprint.name}</CardHeader>
      <CardBody>
        <div>
          Points: <span className="font-weight-bold">{blueprint.points}</span>
        </div>

        <Link to={`/blueprints/${blueprint._id}`}>
          <Button outline color="primary" className="w-100 mt-3">
            View Details
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default BlueprintCard;
