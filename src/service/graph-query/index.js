import { gql } from '@apollo/client';

const GET_POKEMONS = gql`
  query pokemons($offset: Int!, $limit: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
        artwork
      }
    }
  }
`;

const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      abilities {
        ability {
          name
        }
      }
      base_experience
      height
      id
      is_default
      location_area_encounters
      moves {
        move {
          name
        }
      }
      forms {
        url
        name
      }
      sprites {
        back_default
        back_shiny_female
        back_female
        back_shiny
        front_default
        front_female
        front_shiny_female
        front_shiny
      }
      name
      order
      stats {
        base_stat
        effort
        stat {
          name
        }
      }
      types {
        type {
          name
        }
      }
      weight
      status
      message
    }
  }
`;

const graphquery = {
  GET_POKEMONS,
  GET_POKEMON_DETAIL,
};

export default graphquery;
