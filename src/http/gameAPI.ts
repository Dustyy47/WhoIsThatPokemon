import { $host } from ".";
import config from "../config.json";

export async function fetchPokemon(num: number) {
  const data = await $host.get<{ name: string }>("pokemon/" + num);
  return data.data.name;
}

export async function fetchRandomPokemon(activePokemonNumber: number) {
  let rnum;
  do {
    rnum = Math.round(Math.random() * config.POKEMONS_COUNT);
  } while (rnum === activePokemonNumber);
  return fetchPokemon(rnum);
}
