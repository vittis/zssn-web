import React from 'react';
import { shallow } from 'enzyme';
import Navbar from '../index';
import { MemoryRouter } from 'react-router';

it('renders without crashing', () => {
  shallow(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
});

it('renders title', () => {
  const wrapper = shallow(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );
  expect(wrapper.contains('ZSSN'));
});
