import React from 'react';
import { Jumbotron as MainJumbotron } from 'reactstrap';

const Jumbotron: React.FC = () => (
  <MainJumbotron className="shadow-sm">
    <h2>
      Welcome to the{' '}
      <span className="font-italic font-weight-bolder text-primary">
        Zombie Survival Social Network!
      </span>
    </h2>
    <p className="lead">
      The world as we know it has fallen into an apocalyptic scenario. A laboratory-made virus is
      transforming human beings and animals into zombies, hungry for fresh flesh. Your ultimate goal
      is to survive!
    </p>
    <hr className="my-2" />
    <p>
      This website was made by{' '}
      <a href="https://www.vitorbichara.com/" target="_blank" rel="noopener noreferrer">
        Vítor Bichara
      </a>{' '}
      as a tech demo.
    </p>
  </MainJumbotron>
);

export default Jumbotron;
