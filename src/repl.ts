// import { stdin, stdout } from "node:process";
// import { createInterface } from "node:readline";

// export function cleanInput(input: string): string[] {
//   return input
//     .toLowerCase()
//     .trim()
//     .split(/\s+/)
//     .filter((word) => word !== "");
// }

// export function startREPL() {
//   const rl = createInterface({
//     input: stdin,
//     output: stdout,
//     prompt: "Pokedex > ",
//   });

//   rl.prompt();

//   rl.on("line", (input) => {
//    const word =cleanInput(input);
//    if(word.length===0){
//     rl.prompt();
//     return;
//    }
//    console.log(`Your command was: ${word[0]}`)
//    return rl.prompt()
//   });
// }
// import { stdin, stdout } from "node:process";
// import { createInterface } from "node:readline";
// import { getCommands } from "./commands.js";
import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word !== "");
}

export function startREPL(state:State) {
  const rl = state.rl

  const commands = state.commands

  rl.prompt();

  rl.on("line", async (input) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = commands[commandName];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      await command.callback(state);
    } catch (error) {
      console.log(error);
    }

    rl.prompt();
  });
}