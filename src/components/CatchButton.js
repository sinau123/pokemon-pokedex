/** @jsx jsx */
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { jsx } from '@emotion/react';
import throttle from 'lodash/throttle';
import Dialog from './Dialog';
import { useState } from 'react';
import pokemonHelper from '@/libs/helpers/pokemon';
import MyImage from './MyImage';

const CatchButton = ({ pokemon }) => {
  const [isCatched, setCatched] = useState(null);
  const [missedMessage, setMissedMessage] = useState(false);
  const [pokemonNickname, setPokemonNickname] = useState('');
  const messages = ["Oops you're missed!", 'Try again!!', "Don't give up!!"];

  const pokemonData = pokemonHelper(pokemon);
  const addPokemon = (ev) => {
    ev.preventDefault();
    console.log('add pokemon', pokemonNickname, pokemon);
  };
  const getProbability = () => {
    return Math.random() > 0.5 ? true : false;
  };

  const doCatch = throttle(
    () => {
      const catched = getProbability();
      setCatched(catched);
      if (!catched) {
        setMissedMessage((prevPosition) =>
          prevPosition === 2 || prevPosition === false ? 0 : prevPosition + 1
        );
      } else {
        setMissedMessage(false);
      }
    },
    500,
    { trailling: false }
  );

  return (
    <div>
      <div css={tw`relative inline-block`}>
        <button
          type="button"
          css={[
            tw`w-[250px] rounded-2xl text-xl bg-red-500 hover:bg-red-600 text-gray-100 font-bold px-4 py-2`,
            missedMessage === false ? tw`bg-blue-500 hover:bg-blue-600` : '',
          ]}
          onClick={doCatch}
        >
          {missedMessage !== false
            ? messages[missedMessage]
            : 'Click to Catch!'}
        </button>
      </div>
      {isCatched && (
        <Dialog
          show={isCatched}
          onDialogClose={() => setCatched(null)}
          styleTw={tw`z-10`}
          width={'400px'}
        >
          <div>
            <h1 css={tw`text-3xl font-bold`}>
              Cool!!! You got
              <div
                css={[
                  tw` text-2xl capitalize italic mt-4`,
                  pokemonData.color().textColor,
                ]}
              >
                {pokemon.name}
              </div>
            </h1>
            <div css={tw`flex justify-center py-4`}>
              <MyImage
                image={{ src: pokemonData.dreamworld, width: 200, height: 200 }}
              />
            </div>
            <p css={tw`font-bold mb-3`}>
              Type a name and add to &quot;My Pokemon List&quot;!
            </p>
            <form css={tw`w-[258px] text-center mx-auto`} onSubmit={addPokemon}>
              <input
                css={tw`w-full px-4 py-2 rounded-lg border-2 border-gray-500 outline-none focus:border-blue-400`}
                type="text"
                placeholder="Pokemon Nickname..."
                value={pokemonNickname}
                onChange={(ev) => setPokemonNickname(ev.target.value)}
              ></input>
              <div css={tw`my-4`}>
                <button
                  css={tw`w-full rounded-2xl text-xl bg-blue-500 hover:bg-blue-600 text-gray-100 font-bold px-4 py-2`}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
};

CatchButton.propTypes = {
  pokemon: PropTypes.object,
};

export default CatchButton;
