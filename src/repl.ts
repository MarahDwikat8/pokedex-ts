
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
    const args =words.slice(1);
    const command = state.commands[commandName];

    if (!command) {
      console.log("Unknown command");
      rl.prompt();
      return;
    }

    try {
      await command.callback(state,...args);
    } catch (error) {
      console.log(error);
    }

    rl.prompt();
  });
}