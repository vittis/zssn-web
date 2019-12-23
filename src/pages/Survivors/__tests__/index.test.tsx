import React from 'react';
import { shallow } from 'enzyme';
import Survivors from '../index';
import { SurvivorRO } from '../../Survivors/Survivors';

const props = {
  center: { lat: 40.73, lng: -73.93 },
  zoom: 1,
};

jest.mock('axios');

it('renders without crashing', () => {
  shallow(<Survivors />);
});

it('renders create blueprint form', () => {
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

  const wrapper = shallow(<Survivors />);

  expect(wrapper.find('AddSurvivorForm').length).toEqual(1);
});
