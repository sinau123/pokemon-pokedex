/** @jsx jsx */
import Link from 'next/link';
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { jsx } from '@emotion/react';
import MyImage from './MyImage';

const PokemonItem = ({ pokemon }) => {
  return (
    <Link shallow={true} href={`?name=${pokemon.name}`} passHref>
      <a data-aos="fade-up">
        <div css={cardItem}>
          <div>
            <div css={imgItem}>
              <MyImage
                image={{ src: pokemon.artwork, width: 150, height: 150 }}
              />
            </div>
            <div css={cardName}>{pokemon.name}</div>
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

const imgItem = tw`w-[150px] mx-auto md:py-6`;
const cardItem = tw`transform md:hover:scale-110 overflow-hidden bg-gradient-to-t from-gray-100 to-gray-300 border border-gray-200 text-center cursor-pointer rounded-md duration-300 ease-in-out`;
const cardName = tw`py-2 text-xl font-bold text-gray-800 capitalize italic bg-white`;
