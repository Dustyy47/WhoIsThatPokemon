import { useEffect, useState } from "react";
import { $host } from "./http";

const POKEMONS_COUNT = 1008;
const VARIANTS_COUNT = 4;

async function fetchPokemon(num: number) {
  const data = await $host.get<{ name: string }>("pokemon/" + num);
  return data.data.name;
}

async function fetchRandomPokemon(activePokemonNumber: number) {
  let rnum;
  do {
    rnum = Math.round(Math.random() * POKEMONS_COUNT);
  } while (rnum === activePokemonNumber);
  return fetchPokemon(rnum);
}

function App() {
  const [index, setIndex] = useState("001");
  const [activePokemon, setActivePokemon] = useState<string>("");
  const [randomVariants, setRandomVariants] = useState<string[]>([]);

  useEffect(() => {
    let rnum = Math.round(Math.random() * POKEMONS_COUNT);
    let newIndex =
      rnum < 100
        ? "0".repeat(3 - String(rnum).length) + String(rnum)
        : String(rnum);
    setIndex(newIndex);
    async function foo() {
      const name = await await fetchPokemon(rnum);
      setActivePokemon(name);
      const newVariants: string[] = [];
      for (let i = 0; i < VARIANTS_COUNT - 1; i++) {
        const newVariant = await fetchRandomPokemon(rnum);
        newVariants.push(newVariant);
      }
      const randomIndex = Math.floor(Math.random() * VARIANTS_COUNT);
      newVariants.splice(randomIndex, 0, name);
      setRandomVariants(newVariants);
    }
    foo();
  }, []);

  return (
    <div className="">
      <img
        className="brightness-0"
        src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index}.png`}
        alt=""
      />
      <ul>
        {randomVariants.map((variant) => (
          <li key={variant}>{variant}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
