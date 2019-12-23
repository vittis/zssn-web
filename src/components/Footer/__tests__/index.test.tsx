import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../index';

it('renders without crashing', () => {
  shallow(<Footer />);
});

it('renders content', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.contains('Vítor Bichara'));
});
