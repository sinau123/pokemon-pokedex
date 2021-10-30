import client from '@/service/apollo-client';
import graphQuery from '@/service/graph-query';

const pokemons = {
  GET_LIST(payload, query = graphQuery.GET_POKEMONS) {
    return client.query({
      query,
      variables: {
        limit: payload.limit || 10,
        offset: payload.offset || 0,
      },
    });
  },
  GET_DETAIL(payload, query = graphQuery.GET_POKEMON_DETAIL) {
    if (!payload.name) {
      return new Promise((_, reject) => {
        reject(new Error(`payload 'name' can't be empty`));
      });
    }
    return client.query({
      query,
      variables: {
        name: payload.name,
      },
    });
  },
};

const service = {
  pokemons,
};
export default service;
