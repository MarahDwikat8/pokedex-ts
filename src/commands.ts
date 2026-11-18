import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import {commandMap} from "./command_map.js";
import {commandMapb} from "./command_mapb.js";
import type { CLICommand } from "./state.js";   // ← كانت "./command.js"
export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
      map: {
      name: "map",
      description: "Displays the next 20 location areas",
      callback: commandMap,
    },
      mapb: {
      name: "mapb",
      description: "Displays the previous 20 location areas",
      callback: commandMapb,
    },
    explore: {
       name: "explore <location_name>",
       description: "Lists the Pokemon in a location area",
       callback: commandExplore,
},

  };
}