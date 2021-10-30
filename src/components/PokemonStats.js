/** @jsx jsx */
import PropTypes from 'prop-types';
import tw, { css } from 'twin.macro';
import { jsx } from '@emotion/react';
import pokemonHelper from '@/libs/helpers/pokemon';

const PokemonStats = ({ pokemon }) => {
  const pokemonData = pokemonHelper(pokemon);
  return (
    <div css={tw`max-w-[400px] mx-auto space-y-2`}>
      {pokemon.stats.map((stat) => (
        <div css={tw`flex items-center space-x-2`} key={stat.stat.name}>
          <div css={tw`font-bold w-1/2 text-right `}>{stat.stat.name}</div>
          <div css={[tw`w-1/2 p-[1px] rounded-lg `]}>
            <div css={tw`bg-gray-300 rounded-lg border-2 border-white`}>
              <div
                css={[
                  tw`text-xs text-white font-bold text-left px-2 rounded-lg `,
                  pokemonData.color().bgColor,
                  css`
                    width: ${pokemonData.getStatPercent(stat)}%;
                  `,
                ]}
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
