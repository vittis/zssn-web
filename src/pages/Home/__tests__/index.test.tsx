import React from 'react';
import { shallow } from 'enzyme';
import Home from '../index';
import { SurvivorRO } from '../../Survivors/Survivors';

const props = {
  center: { lat: 40.73, lng: -73.93 },
  zoom: 1,
};

jest.mock('axios');

it('renders without crashing', () => {
  shallow(<Home center={props.center} zoom={props.zoom} />);
});

it('initializes in loading state', () => {
  const data: SurvivorRO[] = [
    {
      _id: 'id',
      age: 25,
      gender: 'M',
      infected: false,
      loc: { coordinates: [0, 0] },
      name: 'Vitor',
      reportedBy: [],
    },
    {
      _id: 'id',
      age: 25,
      gender: 'M',
      infected: false,
      loc: { coordinates: [0, 0] },
      name: 'Joao',
      reportedBy: [],
    },
    {
      _id: 'id',
      age: 25,
      gender: 'M',
      infected: false,
      loc: { coordinates: [0, 0] },
      name: 'Pedro',
      reportedBy: [],
    },
  ];

  const wrapper = shallow(<Home center={props.center} zoom={props.zoom} />);

  expect(wrapper.find('Spinner').length).toEqual(1);
});
