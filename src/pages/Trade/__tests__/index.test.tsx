import React from 'react';
import { shallow } from 'enzyme';
import Trade from '../index';
import { MemoryRouter, Route } from 'react-router';

it('renders without crashing', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/survivors/:survivorId/trade']}>
      <Route exact path="/survivors/:survivorId/trade" component={Trade} />
    </MemoryRouter>,
  );

  expect(wrapper.length).toEqual(1);
});
