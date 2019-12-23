import React from 'react';
import { shallow } from 'enzyme';
import Jumbotron from '../index';

it('renders without crashing', () => {
  shallow(<Jumbotron />);
});

it('renders content', () => {
  const wrapper = shallow(<Jumbotron />);
  expect(wrapper.contains('Zombie Survival Social Network!'));
});
