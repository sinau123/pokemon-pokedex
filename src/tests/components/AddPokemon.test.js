import React from 'react';
import { render, screen } from '../test-utils';
import AddPokemon from '@/components/AddPokemon';
import pokemon from '@/tests/data/pokemon';

describe('AddPokemon', () => {
  const handleOnSuccess = jest.fn();
  const wrapper = render(
    <AddPokemon pokemon={pokemon} onAddSuccess={handleOnSuccess} />
  );

  it('should render correctly', () => {
    expect(screen.getByText('Cool! You got')).toBeInTheDocument();
    expect(wrapper.container.querySelector('input')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toEqual('Add');
  });
});
