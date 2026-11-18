import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  if (args.length !== 1) {// حط كل اسم الايريا
    throw new Error("explore requires a location area name");
  }

  const name = args[0];
  console.log(`Exploring ${name}...`);

  const location = await state.pokeapi.fetchLocation(name);
// بلف عليمهم كلهم وبطبع اسما البوكيمون 
  console.log("Found Pokemon:");
  for (const encounter of location.pokemon_encounters) {
    console.log(` - ${encounter.pokemon.name}`);
  }
}