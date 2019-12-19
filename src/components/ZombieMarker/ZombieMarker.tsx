import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { ChildComponentProps } from 'google-map-react';

interface ZombieMarkerProps {
  infected: boolean;
  name: string;
}

type FinalProps = ZombieMarkerProps & ChildComponentProps;

const ZombieMarker: React.FC<FinalProps> = props => (
  <div>
    <FontAwesomeIcon
      className={props.infected ? 'text-danger' : 'text-black'}
      icon={faRunning}
      size="2x"
    />
    <div className="font-weight-bold">{props.name}</div>
  </div>
);

export default ZombieMarker;
