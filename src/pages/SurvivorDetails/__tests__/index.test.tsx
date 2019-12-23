import React from 'react';
import { shallow } from 'enzyme';
import SurvivorDetails from '../index';
import { MemoryRouter, Route } from 'react-router';

it('renders without crashing', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/survivors/:survivorId']}>
      <Route exact path="/survivors/:survivorId" component={SurvivorDetails} />
    </MemoryRouter>,
  );

  expect(wrapper.length).toEqual(1);
});
