import React from 'react';
import { shallow } from 'enzyme';
import ZombieMarker from '../index';

it('renders without crashing', () => {
  shallow(<ZombieMarker lat={0} lng={0} infected name="Vitor" />);
});

it('renders title', () => {
  const wrapper = shallow(<ZombieMarker lat={0} lng={0} infected name="Vitor" />);
  expect(wrapper.contains('Vitor'));
});
