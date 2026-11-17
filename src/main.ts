// // function main() {
// //   console.log("Hello, world!");
// // }

// // main();

import { startREPL } from "./repl.js";
import { initState } from "./state.js";

// function main() {
//   startREPL();
// }

// main();

function main() {
  const state = initState();   
  startREPL(state);            
}

main()