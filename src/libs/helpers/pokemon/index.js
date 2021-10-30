import startCase from 'lodash/startCase';
import pokemonTypeColor from './pokemon-type-color';

export default function pokemonHelper(pokemonData) {
  if (!pokemonData) return {};
  const id = pokemonData.id;
  return {
    id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    dreamworld: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    nameUpper: startCase(pokemonData.name),
    types: pokemonData.types.map(({ type }) => ({
      name: type.name,
      color: pokemonTypeColor[type.name],
    })),
    firstTypes: pokemonData.types[0]?.type?.name,
    color() {
      return pokemonTypeColor[this.firstTypes];
    },
    getStatPercent(stat) {
      const statPercent = (stat.base_stat / 120) * 100;
      return statPercent < 15 ? 15 : statPercent > 100 ? 100 : statPercent;
    },
  };
}
