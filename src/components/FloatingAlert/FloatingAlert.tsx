import React from 'react';
import { Alert } from 'reactstrap';
import './index.scss';

interface FloatingAlertProps {
  message: string;
  clear: () => void;
}

const FloatingAlert: React.FC<FloatingAlertProps> = props => {
  const { message, clear } = props;
  return (
    <div className="fixed-top floating-alert__container">
      <Alert className="floating-alert__alert" color="danger" isOpen={true} toggle={clear}>
        {message}
      </Alert>
    </div>
  );
};

export default FloatingAlert;
