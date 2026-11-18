import { createInterface, type Interface } from "node:readline";
import { stdin, stdout } from "node:process";
import { getCommands } from "./commands.js";
import {PokeAPI} from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State,...args:string[]) =>Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL:string| null;
  prevLocationsURL:string |null;

};

export function initState(): State {
  const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex > ",
  });


  return {
    rl,
    commands: getCommands(),
    pokeapi:new PokeAPI(300_000),
    nextLocationsURL:null,
    prevLocationsURL:null
  };
}