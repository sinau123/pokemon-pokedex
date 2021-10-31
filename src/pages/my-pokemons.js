import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import OwnedPokemonItem from '@/components/OwnedPokemonItem';
import PageHead from '@/components/PageHead';
import localStorageHelper, {
  localStorageKeys,
} from '@/libs/helpers/local-storage';

export const MyPokemons = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const myPokemons = localStorageHelper.getItem(
      localStorageKeys.MY_POKEMONS,
      {}
    );
    const allList = getCatched(myPokemons);
    setPokemonList(allList);
  }, []);

  useEffect(() => {
    const results = pokemonList.filter((pokemon) => {
      const queryLower = query.toLowerCase();
      return (
        pokemon.name.toLowerCase().includes(queryLower) ||
        pokemon.nickname.toLowerCase().includes(queryLower)
      );
    });
    setResults(results);
  }, [pokemonList, query]);

  const getCatched = (list) => {
    return Object.entries(list)
      .map(([_id, pokemon]) =>
        pokemon.owned.map((owned) => {
          return { ...{ nickname: owned }, ...pokemon };
        })
      )
      .flat();
  };

  const toastSucessRelease = (msg) => {
    toast.success(msg, { toastId: 'release' });
  };

  const handleRelease = (pokemon) => {
    const myPokemons = localStorageHelper.getItem(
      localStorageKeys.MY_POKEMONS,
      {}
    );

    const releasedPokemonKind = myPokemons[pokemon.id];
    if (!releasedPokemonKind) {
      toastSucessRelease('Pokemon has been released');
      setPokemonList(getCatched(myPokemons));
      return;
    }

    let owned = releasedPokemonKind.owned;
    if (owned.length > 0) {
      owned = owned.filter((name) => name !== pokemon.nickname);
      myPokemons[pokemon.id].owned = owned;
    }

    if (owned.length === 0) {
      delete myPokemons[pokemon.id];
    }

    setPokemonList(getCatched(myPokemons));
    localStorageHelper.setItem(localStorageKeys.MY_POKEMONS, myPokemons);
    toastSucessRelease('Pokemon has been released');
  };

  let head = (
    <PageHead
      title={'Owned Pokemons List'}
      description="List of all owned pokemons"
    />
  );
  if (typeof window === 'undefined') {
    return <div>{head}</div>;
  }

  return (
    <div className={`mx-2 md:mx-4`} suppressHydrationWarning={true}>
      {head}
      <main className="mx-4 ">
        <h1 className="sm:text-5xl text-4xl sm:py-4 text-left font-bold">
          My Pokemons List
        </h1>
        <div>
          <div className="py-4 text-left flex flex-col space-y-2 sm:space-x-2 sm:space-y-0 sm:flex-row sm:items-center">
            <label className="cursor-pointer font-bold" htmlFor="PokemonSearch">
              Search
            </label>
            <div className="relative w-full max-w-96">
              <input
                id="PokemonSearch"
                className={`text-sm w-full px-4 py-2 pr-7 rounded-lg border-2 border-gray-500 outline-none focus:border-blue-400`}
                type="text"
                placeholder="type pokemon name or nickname..."
                value={query}
                onChange={(ev) => setQuery(ev.target.value)}
              ></input>
              <FontAwesomeIcon
                className="absolute right-3 top-3 text-gray-500"
                icon={faSearch}
              />
            </div>
          </div>
          {results.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
              style={cardList}
            >
              {results.map((pokemon, idx) => (
                <OwnedPokemonItem
                  key={`${pokemon.id}-${pokemon.nickname}`}
                  pokemon={pokemon}
                  index={idx}
                  handleRelease={handleRelease}
                ></OwnedPokemonItem>
              ))}
            </div>
          ) : query.length > 0 ? (
            <div className={noData}>Sorry, Pokemon not found</div>
          ) : (
            <div className={noData}>
              You have no pokemon yet, <br />
              try to catch them first!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const cardList = {
  gridGap: '1.5rem 1.3rem',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'white',
  overflow: 'hidden',
};

const noData = 'text-center font-bold italic text-2xl py-20';

export default MyPokemons;
