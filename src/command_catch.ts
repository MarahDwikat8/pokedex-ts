import type {State} from "./state.js";
export async function commandCatch (state:State,...args:string[]):Promise<void>{
    if (args.length !== 1) {
    throw new Error("catch requires a pokemon name");
  } 
    const name = args[0];
    console.log(`Throwing a Pokeball at ${name}...`);
    const pokemon = await state.pokeapi.fetchPokemon(name);
    const roll = Math.random() * pokemon.base_experience;
    if (roll > 50) {
    console.log(`${name} escaped!`);
    return;
  }
   console.log(`${name} was caught!`);
   console.log("You may now inspect it with the inspect command.");

   state.Pokedex[name] = pokemon;

}