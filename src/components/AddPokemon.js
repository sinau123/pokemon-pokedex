/** @jsx jsx */
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { jsx } from '@emotion/react';
import { toast } from 'react-toastify';
import pokemonHelper from '@/libs/helpers/pokemon';
import MyImage from './MyImage';
import localStorageHelper, {
  localStorageKeys,
} from '@/libs/helpers/local-storage';
import { useState } from 'react';

const toastError = (message) => {
  toast.error(message, {
    toastId: 'toastAvoidsDuplicates',
  });
};
const AddPokemon = ({ pokemon, onAddSuccess }) => {
  const [pokemonNickname, setPokemonNickname] = useState('');
  const pokemonData = pokemonHelper(pokemon);

  const addPokemon = (ev) => {
    ev.preventDefault();
    if (pokemonNickname.length === 0) {
      toastError("Pokemon's nickname can't be empty");
      return;
    }

    const myPokemons = localStorageHelper.getItem(
      localStorageKeys.MY_POKEMONS,
      {}
    );
    const pokemonList = Object.entries(myPokemons);
    if (
      pokemonList.find(([_key, poke]) =>
        poke.owned.some(
          (name) => name.toLowerCase() === pokemonNickname.trim().toLowerCase()
        )
      )
    ) {
      toastError('Nickname already used!');
      return;
    }

    const owned = myPokemons[pokemon.id];
    if (owned) {
      owned.owned.push(pokemonNickname.trim());
      myPokemons[pokemon.id] = owned;
    } else {
      myPokemons[pokemon.id] = {
        ...pokemon,
        ...{ owned: [pokemonNickname.trim()] },
      };
    }

    localStorageHelper.setItem(localStorageKeys.MY_POKEMONS, myPokemons);

    toast.success('Pokemon added to "My Pokemon List"');
    onAddSuccess();
  };
  return (
    <div>
      <h1 css={tw`text-3xl font-bold`}>
        Cool! You got
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
  );
};

AddPokemon.propTypes = {
  pokemon: PropTypes.object,
  onAddSuccess: PropTypes.func,
};

export default AddPokemon;
