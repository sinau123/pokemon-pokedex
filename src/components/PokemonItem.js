import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import localStorageHelper, {
  localStorageKeys,
} from '@/libs/helpers/local-storage';
import MyImage from './MyImage';

const PokemonItem = ({ pokemon }) => {
  const myPokemons = localStorageHelper.getItem(
    localStorageKeys.MY_POKEMONS,
    {}
  );

  return (
    <Link shallow={true} href={`?name=${pokemon.name}`} passHref>
      <a data-aos="fade-up">
        <div className={cardItem}>
          <div>
            <div className={imgItem}>
              <MyImage src={pokemon.artwork}></MyImage>
              <div className={cardName}>{pokemon.name}</div>
            </div>
            <div>
              <div
                className={`text-sm px-4 py-1.5 font-bold text-left bg-white`}
              >
                Owned: <span>{myPokemons[pokemon.id]?.owned.length ?? 0}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

PokemonItem.propTypes = {
  pokemon: PropTypes.object,
};

export default PokemonItem;

const imgItem = `w-[150px] mx-auto py-2`;
const cardItem = `transform md:hover:scale-110 overflow-hidden bg-gradient-to-t from-gray-100 to-gray-300 border border-gray-200 text-center cursor-pointer rounded-md duration-300 ease-in-out`;
const cardName = `py-2 text-xl font-bold text-gray-800 capitalize italic`;
