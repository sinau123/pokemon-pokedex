import React from 'react';
import PropTypes from 'prop-types';
import pokemonHelper from '@/libs/helpers/pokemon';
import PokemonStats from '@/components/PokemonStats';
import CatchButton from './CatchButton';
import PokemonMoves from './PokemonMoves';
import Loader from './Loader';
import MyImage from './MyImage';

const PokemonDetail = ({ pokemon }) => {
  let content = (
    <div className={`flex items-center justify-center py-14`}>
      <Loader className={`w-16 h-16`}></Loader>
    </div>
  );
  if (pokemon) {
    const pokemonData = pokemonHelper(pokemon);
    content = (
      <div className={contentClass}>
        <div className={headerBgClass(pokemonData)}></div>
        <div className={detailWrapperClass}>
          <div className={pokemonImageClass}>
            <MyImage src={pokemonData.artwork}></MyImage>
          </div>
          <h1 className={pokemonNameClass}>{pokemon.name}</h1>
          <div className={`my-5`}>
            <CatchButton pokemon={pokemon}></CatchButton>
          </div>
          <div className={sectionClass}>
            <div className={labelClass}>Type</div>
            <div className={`flex justify-center space-x-2`}>
              {pokemonData.types.map((type) => (
                <div
                  className={[typeclassName, type.color.bgColor].join(' ')}
                  key={type.name}
                >
                  {type.name}
                </div>
              ))}
            </div>
          </div>
          <div className={sectionClass}>
            <div className={labelClass}>Moves</div>
            <PokemonMoves pokemon={pokemon}></PokemonMoves>
          </div>
          <div className={sectionClass}>
            <div className={labelClass}>Stats</div>
            <PokemonStats pokemon={pokemon}></PokemonStats>
          </div>
        </div>
      </div>
    );
  }
  return content;
};

PokemonDetail.propTypes = {
  pokemon: PropTypes.object,
};

const headerBgClass = (data) =>
  [data.color().bgGradient, `h-80 -mx-3 py-6`].join(' ');
const sectionClass = `mb-6`;
const labelClass = `font-bold text-xl mb-2`;
const contentClass = `flex-1 flex flex-col justify-between -mt-8`;
const pokemonNameClass = `mb-4 text-5xl text-black italic text-center font-bold capitalize`;
const detailWrapperClass = `flex-1 relative h-full pt-0 text-center`;
const pokemonImageClass = `absolute left-0 right-0 -top-80 min-h-[200px] max-w-[300px] w-full mx-auto`;
const typeclassName = `px-2 py-1 text-white min-w-[90px] capitalize font-bold rounded-4xl text-shadow`;

export default PokemonDetail;
