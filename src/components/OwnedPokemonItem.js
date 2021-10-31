import React from 'react';
import PropTypes from 'prop-types';
import MyImage from './MyImage';
import pokemonHelper from '@/libs/helpers/pokemon';

const OwnedPokemonItem = ({ pokemon, handleRelease }) => {
  const pokemonData = pokemonHelper(pokemon);
  const doRelease = () => {
    handleRelease(pokemon);
  };
  return (
    <div data-aos="fade-up">
      <div className={cardItem}>
        <div className={`${pokemonData.color().bgGradient}`}>
          <div
            className={`px-4 py-2 font-bold truncate text-white text-shadow-sm capitalize`}
          >
            {pokemon.name}
          </div>
          <div className={imgItem}>
            <MyImage src={pokemonData.artwork}></MyImage>
          </div>
          <div className={cardName}>
            <div title={pokemon.nickname}>{pokemon.nickname}</div>
          </div>
        </div>
        <div className="flex items-center justify-end p-2 bg-white">
          <button
            className={`text-sm rounded-md font-bold px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white transition duration-300`}
            onClick={doRelease}
            title="Release pokemon"
          >
            Release
          </button>
        </div>
      </div>
    </div>
  );
};

OwnedPokemonItem.propTypes = {
  pokemon: PropTypes.object,
  handleRelease: PropTypes.func,
};

export default OwnedPokemonItem;

const imgItem = `w-[150px] mx-auto py-2 `;
const cardItem = `relative overflow-hidden border border-gray-200 text-center rounded-md duration-300 ease-in-out`;
const cardName = `py-2 text-md font-bold text-gray-800 italic `;
