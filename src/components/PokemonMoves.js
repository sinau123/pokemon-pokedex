/** @jsx jsx */
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { jsx } from '@emotion/react';
import { useState } from 'react';

const PokemonMoves = ({ pokemon }) => {
  const [showAllMoves, setShowAllMoves] = useState(pokemon.moves.length < 20);
  return (
    <div
      css={[
        tw`relative max-w-[600px] mx-auto `,
        !showAllMoves ? tw`overflow-hidden max-h-[150px]` : '',
      ]}
    >
      <div css={tw`flex flex-wrap items-center -mx-2 justify-center `}>
        {pokemon.moves.map(({ move }) => (
          <div
            key={move.name}
            css={tw`p-2 border rounded-xl bg-teal-500 text-white text-sm m-0.5 italic`}
          >
            {move.name}
          </div>
        ))}
      </div>
      <div
        css={[
          tw`absolute bottom-0 left-0 w-full h-[150px] flex items-end justify-center bg-gradient-to-b from-transparent to-white`,
          showAllMoves ? tw`hidden` : '',
        ]}
      >
        <button
          css={tw`px-4 border-2 rounded-lg bg-white py-2 text-sm font-bold border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-gray-200`}
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
