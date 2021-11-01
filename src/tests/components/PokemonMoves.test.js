import React from 'react';
import { render, screen } from '../test-utils';
import PokemonMoves from '@/components/PokemonMoves';
import pokemon from '@/tests/data/pokemon';

describe('PokemonMoves', () => {
  render(<PokemonMoves pokemon={pokemon} />);

  it('should render all moves', () => {
    expect(screen.getByText('razor-wind')).toBeInTheDocument();
    expect(screen.getByText('gust')).toBeInTheDocument();
  });
});
