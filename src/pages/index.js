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
import MyImage from '@/components/MyImage';

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

  const head = (
    <PageHead
      pageName={myPokemon ? pokemonHelper(myPokemon).nameUpper : 'Home'}
    />
  );
  if (typeof window === 'undefined') {
    return <div>{head}</div>;
  }

  return (
    <div className={`mx-2 md:mx-4`} suppressHydrationWarning={true}>
      {head}

      <main>
        <div className={`mx-auto w-[300px]`}>
          <MyImage src={'/assets/img/logo.png'} width={5} height={3} />
        </div>
        <div className="py-4">
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
    props: {},
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
