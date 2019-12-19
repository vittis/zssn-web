import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Survivors from './pages/Survivors';
import SurvivorDetails from './pages/SurvivorDetails';
import Blueprints from './pages/Blueprints';
import BlueprintsDetails from './pages/BlueprintsDetails';
import Trade from './pages/Trade';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/survivors" component={Survivors} />
      <Route exact path="/survivors/:survivorId" component={SurvivorDetails} />
      <Route exact path="/survivors/:survivorId/trade" component={Trade} />
      <Route exact path="/blueprints" component={Blueprints} />
      <Route exact path="/blueprints/:blueprintId" component={BlueprintsDetails} />

      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
