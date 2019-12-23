import React from 'react';
import { shallow } from 'enzyme';
import FloatingAlert from '../index';

it('renders without crashing', () => {
  const mockFn = jest.fn();
  shallow(<FloatingAlert message="some message" clear={mockFn} />);
});

it('renders message', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<FloatingAlert message="some message" clear={mockFn} />);
  expect(wrapper.contains('some message'));
});
