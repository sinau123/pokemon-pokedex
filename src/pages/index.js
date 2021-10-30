/** @jsx jsx */
import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import tw, { css } from 'twin.macro';
import { jsx } from '@emotion/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import PokemonItem from '@/components/PokemonItem';
import service from '@/service';
import { sleep } from '@/libs';
import pokemonHelper from '@/libs/helpers/pokemon';
import PageHead from '@/components/PageHead';
import PokemonDetail from '@/components/PokemonDetail';
import MyImage from '@/components/MyImage';
import Loader from '@/components/Loader';

const Dialog = dynamic(() => import('@/components/Dialog'), { ssr: false });

let offset = 20;
const Home = ({ pokemons, pokemon }) => {
  const router = useRouter();
  const [show, setShow] = useState(!!router.query.name);
  const [myPokemon, setPokemon] = useState(pokemon);
  const [myPokemons, setPokemons] = useState(pokemons || []);

  const handleRouteChange = useCallback(async () => {
    const name = router.query.name;
    try {
      if (name) {
        setShow(true);
        NProgress.start();
        const { data } = await service.pokemons.GET_DETAIL({ name });
        NProgress.done();
        setPokemon(data.pokemon);
      } else {
        setShow(false);
        await sleep(500);
        setPokemon(null);
      }

      if (myPokemons.length === 0) {
        NProgress.start();
        const { data } = await service.pokemons.GET_LIST({ limit: 20 });
        NProgress.done();
        setPokemons(data.pokemons.results);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }, [router.query.name, myPokemons]);

  useEffect(() => {
    handleRouteChange();
  }, [handleRouteChange]);

  const morePokemons = async () => {
    try {
      const { data } = await service.pokemons.GET_LIST({
        limit: 20,
        offset,
      });
      setPokemons((pokemons) => [...pokemons, ...data.pokemons.results]);
      offset = offset + 20;
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div css={pageWrapper}>
      <PageHead
        pageName={myPokemon ? pokemonHelper(myPokemon).nameUpper : 'Home'}
      />

      <main>
        <div css={tw`flex justify-center py-8`}>
          <MyImage image={{ src: '/assets/img/logo.png', width: 300 }} />
        </div>
        <div>
          <InfiniteScroll
            style={{ overflow: 'hidden' }}
            dataLength={myPokemons.length}
            next={morePokemons}
            hasMore={myPokemons.length % 20 === 0}
            loader={<Loader className={tw`h-8 w-8`}></Loader>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div css={cardList}>
              {myPokemons.map((pokemon, idx) => (
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
      {show && (
        <Dialog
          show={show}
          onDialogClose={() => router.push('/', null, { shallow: true })}
        >
          <PokemonDetail pokemon={myPokemon} />
        </Dialog>
      )}
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

  try {
    const { data } = await service.pokemons.GET_LIST({ limit: 20 });
    return {
      props: {
        pokemons: data.pokemons.results,
      },
    };
  } catch (err) {
    return {
      props: {
        pokemons: [],
      },
    };
  }
}
export default Home;

const pageWrapper = tw`mx-2 md:mx-4`;
const cardList = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-gap: 1.5rem 1.3rem;
  justify-content: center;
  align-items: center;
  padding: 2em 1em;
  background: white;
  overflow: hidden;
`;

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
