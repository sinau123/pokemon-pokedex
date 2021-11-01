import React from 'react';
import { Enzyme } from '../test-utils';
import CatchButton from '@/components/CatchButton';
import pokemon from '@/tests/data/pokemon';

describe('CatchButton', () => {
  const wrapper = Enzyme.shallow(<CatchButton pokemon={pokemon} />);

  it('should render button correctly', () => {
    expect(wrapper.find('button').length).toEqual(1);
    expect(wrapper.find('button').text()).toEqual('Click to Catch!');
  });
});
