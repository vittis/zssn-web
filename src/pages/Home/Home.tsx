import React from 'react';
import GoogleMapReact from 'google-map-react';
import ZombieMarker from '../../components/ZombieMarker';
import { Card, CardTitle, CardText, Button, Spinner } from 'reactstrap';
import './index.scss';
import useApiRequest from '../../services/api/hooks';
import { SurvivorRO } from '../Survivors/Survivors';
import { Link } from 'react-router-dom';

interface HomeProps {
  center: { lat: number; lng: number };
  zoom: number;
}

export interface ReportsRO {
  infectedPercentage: number;
  healthyPercentage: number;
  pointsLost: number;
  averageResources: [{ [key: string]: number }];
  blueprintsFound: number;
}

const Home: React.FC<HomeProps> = props => {
  const [{ data: survivors, isLoading: survivorsLoading }] = useApiRequest<SurvivorRO[]>(
    '/survivors',
    [],
  );
  const [{ data: reports, isLoading: reportsLoading }] = useApiRequest<ReportsRO | null>(
    '/reports',
    null,
  );

  if (survivorsLoading || reportsLoading || reports === null) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner color="primary" />
      </div>
    );
  }
  return (
    <div>
      <div className="cards-container mb-3">
        {/* Population Overview Card */}
        <Card className="mr-2" body>
          <CardTitle>
            <h4>Population overview</h4>
          </CardTitle>
          <CardText>
            Total survivors: <span className="font-weight-bold">{survivors.length}</span>
          </CardText>
          <CardText>
            Percentage infected:{' '}
            <span className="font-weight-bold">
              {(reports.infectedPercentage * 100).toFixed(2)}%
            </span>
          </CardText>
          <Link className="w-100" to="/survivors">
            <Button className="w-100" color="primary">
              View survivors
            </Button>
          </Link>
        </Card>

        {/* Items Overview Card */}
        <Card className="ml-2" body>
          <CardTitle>
            <h4>Items overview</h4>
          </CardTitle>
          <CardText>
            Blueprints found: <span className="font-weight-bold">{reports.blueprintsFound}</span>
          </CardText>
          <CardText>
            Points lost to the infection:{' '}
            <span className="font-weight-bold">{reports.pointsLost}</span>
          </CardText>
          <Link className="w-100" to="/blueprints">
            <Button className="w-100" color="primary">
              View blueprints
            </Button>
          </Link>
        </Card>
      </div>

      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDpqVg06LFIIvF2jJ6BiGiFJSMZ5pvFXLI' }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
          {survivors.map(survivor => (
            <ZombieMarker
              key={survivor._id}
              name={survivor.name}
              lat={survivor.loc.coordinates[0]}
              lng={survivor.loc.coordinates[1]}
              infected={survivor.infected}
            />
          ))}
        </GoogleMapReact>
      </div>
      <div className="d-flex mt-3">
        <Button className="w-100" outline size="sm" color="primary">
          View full reports
        </Button>
      </div>
    </div>
  );
};

Home.defaultProps = {
  center: { lat: 40.73, lng: -73.93 },
  zoom: 1,
};

export default Home;
