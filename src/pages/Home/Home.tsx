import React from 'react';
import GoogleMapReact from 'google-map-react';
import ZombieMarker from '../../components/ZombieMarker';
import { Card, CardTitle, CardText, Button } from 'reactstrap';
import './index.scss';

interface HomeProps {
  center: { lat: number; lng: number };
  zoom: number;
}

const Home: React.FC<HomeProps> = props => {
  return (
    <div>
      <div className="cards-container mb-3">
        <Card className="mr-2" body>
          <CardTitle>
            <h4>Population overview</h4>
          </CardTitle>
          <CardText>
            Total survivors: <span className="font-weight-bold">25</span>
          </CardText>
          <CardText>
            Percentage infected: <span className="font-weight-bold">10%</span>
          </CardText>
          <Button color="primary">View survivors</Button>
        </Card>
        <Card className="ml-2" body>
          <CardTitle>
            <h4>Items overview</h4>
          </CardTitle>
          <CardText>
            Blueprints found: <span className="font-weight-bold">4</span>
          </CardText>
          <CardText>
            Points lost to the infection: <span className="font-weight-bold">255</span>
          </CardText>
          <Button color="primary">View blueprints</Button>
        </Card>
      </div>

      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDpqVg06LFIIvF2jJ6BiGiFJSMZ5pvFXLI' }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
          <ZombieMarker lat={40.73} lng={-73.93} infected={false} name="Vitu" />
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
