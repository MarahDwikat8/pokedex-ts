import type {State} from "./state.js"

export async function commandPokedex(state:State):Promise <void>{
const names =Object.keys(state.Pokedex);
  if (names.length === 0) {
    console.log("Your Pokedex is empty. Go catch some pokemon!");
    return;
  }
  //بلف عليهم بجيبالاسماء
    console.log("Your Pokedex:");
    for (const name of names) {
    console.log(` - ${name}`);
  }
}

