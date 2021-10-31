import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import pokemonHelper from '@/libs/helpers/pokemon';

const PokemonMoves = ({ pokemon }) => {
  const [showAllMoves, setShowAllMoves] = useState(pokemon.moves.length < 20);
  const pokemonData = pokemonHelper(pokemon);
  return (
    <div
      className={`relative max-w-[600px] mx-auto ${
        !showAllMoves ? `overflow-hidden max-h-[150px]` : ''
      }`}
    >
      <div className={`flex flex-wrap items-center -mx-2 justify-center `}>
        {pokemon.moves.map(({ move }) => (
          <div
            key={move.name}
            className={`p-2 border rounded-xl text-white text-sm m-0.5 italic ${
              pokemonData.color().bgColor
            }`}
          >
            {move.name}
          </div>
        ))}
      </div>
      <div
        className={`absolute bottom-0 left-0 w-full h-[150px] flex items-end justify-center bg-gradient-to-b from-transparent to-white ${
          showAllMoves ? `hidden` : ''
        }`}
      >
        <button
          className={`px-4 border-2 rounded-lg bg-white py-2 text-sm font-bold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-gray-200`}
          onClick={() => setShowAllMoves(true)}
        >
          Show All
        </button>
      </div>
    </div>
  );
};

PokemonMoves.propTypes = {
  pokemon: PropTypes.object,
};

export default PokemonMoves;
