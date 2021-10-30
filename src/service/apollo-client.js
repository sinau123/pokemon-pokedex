import { ApolloClient, InMemoryCache } from '@apollo/client';
import query from '@/service/graph-query';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache(),
});

export { query };
export default client;
