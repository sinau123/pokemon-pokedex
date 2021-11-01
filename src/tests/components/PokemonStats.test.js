import React from 'react';
import { render, screen } from '../test-utils';
import PokemonStats from '@/components/PokemonStats';
import pokemon from '@/tests/data/pokemon';

describe('PokemonStats', () => {
  render(<PokemonStats pokemon={pokemon} />);

  it('should render all stats title', () => {
    expect(screen.getByText('hp')).toBeInTheDocument();
    expect(screen.getByText('attack')).toBeInTheDocument();
    expect(screen.getByText('defense')).toBeInTheDocument();
    expect(screen.getByText('special-attack')).toBeInTheDocument();
    expect(screen.getByText('special-defense')).toBeInTheDocument();
    expect(screen.getByText('speed')).toBeInTheDocument();
  });
});
