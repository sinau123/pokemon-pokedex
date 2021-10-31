import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import service from '@/service';
import pokemonHelper from '@/libs/helpers/pokemon';
import PageHead from '@/components/PageHead';
import PokemonDetail from '@/components/PokemonDetail';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

const Pokemon = ({ pokemon }) => {
  const [myPokemon] = useState(pokemon);

  const pokemonData = pokemonHelper(myPokemon);
  let types = pokemonData.types.map((type) => type.name);

  if (types.length > 2) {
    types = [
      ...[
        types.slice(0, types.length - 2).join(', '),
        ...[types[types.length - 1]],
      ],
    ].join(' and ');
  }

  types = types.join(' and ');
  const desc = `${pokemonData.nameUpper} has ${types} type`;
  const head = (
    <PageHead
      title={pokemonData.nameUpper}
      description={desc}
      image={pokemonData.image}
    />
  );

  if (typeof window === 'undefined') {
    return <div>{head}</div>;
  }

  return (
    <div className={`mx-2 md:mx-4`} suppressHydrationWarning={true}>
      {head}

      <main>
        <div className="pb-14 sm:pt-4 text-left text-2xl">
          <Link href="/">
            <a title="Back to home">
              <FontAwesomeIcon icon={faChevronCircleLeft} /> <span>Back</span>
            </a>
          </Link>
        </div>
        <PokemonDetail pokemon={myPokemon} />
      </main>
    </div>
  );
};

Pokemon.propTypes = {
  pokemons: PropTypes.array,
  pokemon: PropTypes.object,
};

export async function getServerSideProps({ query }) {
  const name = query.name;
  if (name) {
    try {
      const { data } = await service.pokemons.GET_DETAIL({ name });

      return {
        props: {
          pokemon: data.pokemon,
        },
      };
    } catch (err) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
export default Pokemon;
