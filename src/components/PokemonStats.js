import React from 'react';
import PropTypes from 'prop-types';
import pokemonHelper from '@/libs/helpers/pokemon';

const PokemonStats = ({ pokemon }) => {
  const pokemonData = pokemonHelper(pokemon);
  return (
    <div className={`max-w-[400px] mx-auto space-y-2`}>
      {pokemon.stats.map((stat) => (
        <div className={`flex items-center space-x-2`} key={stat.stat.name}>
          <div className={`font-bold w-1/2 text-right `}>{stat.stat.name}</div>
          <div className={`w-1/2 p-[1px] rounded-lg `}>
            <div className={`bg-gray-300 rounded-lg border-2 border-white`}>
              <div
                className={`text-xs text-white text-shadow font-bold text-left px-2 rounded-lg ${
                  pokemonData.color().bgColor
                }`}
                style={{ width: pokemonData.getStatPercent(stat) + '%' }}
              >
                {stat.base_stat}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

PokemonStats.propTypes = {
  pokemon: PropTypes.object,
};

export default PokemonStats;
