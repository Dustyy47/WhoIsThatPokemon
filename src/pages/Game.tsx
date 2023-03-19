import { useEffect, useRef, useState } from "react";
import Button from "../components/UI/Button";
import { Wrapper } from "../components/UI/Wrapper";
import config from "../config.json";
import { fetchPokemon, fetchRandomPokemon } from "../http/gameAPI";

type Result = "unresolved" | "correct" | "incorrect";

function getButtonClassname(
  buttonVariant: string,
  selectedVariant: string,
  activePokemon: string
) {
  if (selectedVariant === "") return "";
  if (buttonVariant == activePokemon) {
    return "bg-green-400 pointer-events-none";
  }

  if (buttonVariant === selectedVariant) {
    return "bg-red-400 pointer-events-none";
  }
  return "";
}

export function Game() {
  const [index, setIndex] = useState("001");
  const [activePokemon, setActivePokemon] = useState<string>("");
  const [randomVariants, setRandomVariants] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [step, setStep] = useState(1);

  const timerWorking = useRef(false);

  async function newRound() {
    let rnum = Math.round(Math.random() * config.POKEMONS_COUNT);
    let newIndex =
      rnum < 100
        ? "0".repeat(3 - String(rnum).length) + String(rnum)
        : String(rnum);
    setIndex(newIndex);
    setIsLoading(true);
    const name = await await fetchPokemon(rnum);
    const newVariants: string[] = [];
    for (let i = 0; i < config.VARIANTS_COUNT - 1; i++) {
      const newVariant = await fetchRandomPokemon(rnum);
      newVariants.push(newVariant);
    }
    const randomIndex = Math.floor(Math.random() * config.VARIANTS_COUNT);
    newVariants.splice(randomIndex, 0, name);
    setRandomVariants(newVariants);
    setActivePokemon(name);
    setIsLoading(false);
  }

  useEffect(() => {
    newRound();
  }, []);

  function handleChoose(variant: string) {
    if (timerWorking.current) return;
    setSelectedVariant(variant);
    timerWorking.current = true;
    setTimeout(() => {
      timerWorking.current = false;
      if (variant === activePokemon) nextRound();
      else restart();
      setSelectedVariant("");
    }, config.TIMER);
  }

  function nextRound() {
    setStep((prev) => prev + 1);
    newRound();
  }

  function restart() {
    setStep(1);
    newRound();
  }

  if (isLoading) return <Wrapper>Loading...</Wrapper>;

  return (
    <Wrapper>
      {step}
      <div className="flex justify-between items-center">
        <img
          className={"w-[33rem] " + (!selectedVariant ? "brightness-0 " : "")}
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${index}.png`}
          alt=""
        />
        <ul className="grid grid-cols-2 grid-rows-2 w-[50%] h-[20rem]">
          {randomVariants.map((variant) => (
            <li key={variant} className="w-full h-full">
              <Button
                className={getButtonClassname(
                  variant,
                  selectedVariant,
                  activePokemon
                )}
                onClick={(e) => handleChoose(variant)}
              >
                {variant}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
}
