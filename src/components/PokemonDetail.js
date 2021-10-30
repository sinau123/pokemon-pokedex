/** @jsx jsx */
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { jsx } from '@emotion/react';
import pokemonHelper from '@/libs/helpers/pokemon';
import PokemonStats from '@/components/PokemonStats';
import CatchButton from './CatchButton';
import PokemonMoves from './PokemonMoves';
import Loader from './Loader';
import MyImage from './MyImage';

const PokemonDetail = ({ pokemon }) => {
  let content = (
    <div css={tw`flex items-center justify-center py-14`}>
      <Loader className={tw`w-16 h-16`}></Loader>
    </div>
  );
  if (pokemon) {
    const pokemonData = pokemonHelper(pokemon);
    content = (
      <div css={contentClass}>
        <div css={[pokemonData.color().bgGradient, tw` h-80 -mx-3 py-6`]}></div>
        <div css={detailWrapperClass}>
          <div css={pokemonImageClass}>
            <MyImage
              image={{ src: pokemonData.artwork, width: 300, height: 300 }}
            />
          </div>
          <h1 css={pokemonNameClass}>{pokemon.name}</h1>
          <div css={tw`my-5`}>
            <CatchButton pokemon={pokemon}></CatchButton>
          </div>
          <div css={sectionClass}>
            <div css={labelClass}>Type</div>
            <div css={tw`flex justify-center space-x-2`}>
              {pokemonData.types.map((type) => (
                <div css={[typeCss, type.color.bgColor]} key={type.name}>
                  {type.name}
                </div>
              ))}
            </div>
          </div>
          <div css={sectionClass}>
            <div css={labelClass}>Moves</div>
            <PokemonMoves pokemon={pokemon}></PokemonMoves>
          </div>
          <div css={sectionClass}>
            <div css={labelClass}>Stats</div>
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

const sectionClass = tw`mb-6`;
const labelClass = tw`font-bold text-xl mb-2`;
const contentClass = tw`flex-1 flex flex-col justify-between -mt-8`;
const pokemonNameClass = tw`mb-4 text-5xl text-black italic text-center font-bold capitalize`;
const detailWrapperClass = tw`flex-1 relative h-full pt-0 text-center`;
const pokemonImageClass = tw`absolute left-0 right-0 -top-80 min-h-[200px] max-w-[300px] w-full mx-auto`;
const typeCss = tw`px-2 py-1 text-white min-w-[90px] capitalize font-bold rounded-lg`;

export default PokemonDetail;
