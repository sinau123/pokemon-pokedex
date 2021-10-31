import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import pokemonHelper from '@/libs/helpers/pokemon';
import localStorageHelper, {
  localStorageKeys,
} from '@/libs/helpers/local-storage';
import { useState } from 'react';
import MyImage from './MyImage';

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
      <h1 className={`text-3xl font-bold`}>
        Cool! You got
        <div
          className={` text-2xl capitalize italic mt-4 $pokemonData.color().textColor}`}
        >
          {pokemon.name}
        </div>
      </h1>
      <div className={`py-4 w-56 mx-auto`}>
        <MyImage src={pokemonData.dreamworld} />
      </div>
      <p className={`font-bold mb-3`}>
        Type a name and add to &quot;My Pokemon List&quot;!
      </p>
      <form className={`w-[258px] text-center mx-auto`} onSubmit={addPokemon}>
        <input
          className={`w-full px-4 py-2 rounded-lg border-2 border-gray-500 outline-none focus:border-blue-400`}
          type="text"
          placeholder="Pokemon Nickname..."
          value={pokemonNickname}
          onChange={(ev) => setPokemonNickname(ev.target.value)}
        ></input>
        <div className={`my-4`}>
          <button
            className={`w-full rounded-2xl text-xl bg-blue-500 hover:bg-blue-600 text-gray-100 font-bold px-4 py-2`}
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
