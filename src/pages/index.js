import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import PokemonItem from '@/components/PokemonItem';
import service from '@/service';
import { sleep } from '@/libs';
import pokemonHelper from '@/libs/helpers/pokemon';
import PageHead from '@/components/PageHead';
import PokemonDetail from '@/components/PokemonDetail';
import Loader from '@/components/Loader';

const Dialog = dynamic(() => import('@/components/Dialog'), { ssr: false });

let offset = 0;
const Home = ({ pokemon }) => {
  const router = useRouter();
  const [show, setShow] = useState(!!router.query.name);
  const [myPokemon, setPokemon] = useState(pokemon);
  const [pokemonList, setPokemonList] = useState([]);

  const handleRouteChange = useCallback(async () => {
    const name = router.query.name;
    NProgress.start();
    try {
      if (name) {
        setShow(true);
        const { data } = await service.pokemons.GET_DETAIL({ name });
        setPokemon(data.pokemon);
      } else {
        setShow(false);
        await sleep(500);
        setPokemon(null);
      }

      if (pokemonList.length === 0) {
        const { data } = await service.pokemons.GET_LIST({ limit: 20 });
        offset += 20;
        setPokemonList(data.pokemons.results);
      }
    } catch (err) {
      toast.error(err.message);
    }

    NProgress.done();
  }, [router.query.name, pokemonList]);

  useEffect(() => {
    handleRouteChange();
  }, [handleRouteChange]);

  const morePokemons = async () => {
    try {
      const { data } = await service.pokemons.GET_LIST({
        limit: 20,
        offset,
      });
      setPokemonList((pokemons) => [...pokemons, ...data.pokemons.results]);
      offset = offset + 20;
    } catch (err) {
      toast.error(err.message);
    }
  };

  let head = (
    <PageHead
      title={'Home'}
      description="Welcome to Pokemon Pokedex! See all list of available pokemons"
    />
  );
  if (myPokemon) {
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
    head = (
      <PageHead
        title={pokemonData.nameUpper}
        description={desc}
        image={pokemonData.image}
      />
    );
  }
  if (typeof window === 'undefined') {
    return <div>{head}</div>;
  }

  return (
    <div className={`mx-2 md:mx-4`} suppressHydrationWarning={true}>
      {head}

      <main>
        <h1 className="sm:text-5xl text-4xl sm:py-4 text-left mx-4 font-bold">
          Pokemon Pokedex
        </h1>
        <div>
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={pokemonList.length}
            next={morePokemons}
            hasMore={pokemonList.length % 20 === 0}
            loader={<Loader className={`h-8 w-8`}></Loader>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div style={cardList}>
              {pokemonList.map((pokemon, idx) => (
                <PokemonItem
                  key={pokemon.id}
                  pokemon={pokemon}
                  index={idx}
                ></PokemonItem>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
      <Dialog
        show={show}
        onDialogClose={() => router.push('/', null, { shallow: true })}
      >
        <PokemonDetail pokemon={myPokemon} />
      </Dialog>
    </div>
  );
};

Home.propTypes = {
  pokemons: PropTypes.array,
  pokemon: PropTypes.object,
};

export async function getServerSideProps({ query, resolvedUrl }) {
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
    props: {
      url: resolvedUrl,
    },
  };
}
export default Home;

const cardList = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
  gridGap: '1.5rem 1.3rem',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2em 1em',
  background: 'white',
  overflow: 'hidden',
};

/**
 * {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
              gridGap: '1.5rem 1.3rem',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2em 1em',
              background: 'white',
              overflow: 'hidden',
            }
 */
