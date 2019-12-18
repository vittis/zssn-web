import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Survivors from './pages/Survivors';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/survivors" component={Survivors} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
