import React from 'react';
import { shallow } from 'enzyme';
import BlueprintDetails from '../index';
import { MemoryRouter, Route } from 'react-router';

it('renders without crashing', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/blueprints/:blueprintsId']}>
      <Route exact path="/blueprints/:blueprintsId" component={BlueprintDetails} />
    </MemoryRouter>,
  );

  expect(wrapper.length).toEqual(1);
});
