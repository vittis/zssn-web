import React from 'react';
import { Alert } from 'reactstrap';
import './index.scss';

const FloatingAlert: React.FC = () => {
  return (
    <div className="fixed-top floating-alert__container">
      <Alert className="floating-alert__alert" color="danger" isOpen={true} toggle={() => {}}>
        Deu ruim
      </Alert>
    </div>
  );
};

export default FloatingAlert;
