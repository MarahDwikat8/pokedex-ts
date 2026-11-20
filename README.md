# Pokedex CLI

An interactive REPL for exploring the [PokeAPI](https://pokeapi.co/), built in TypeScript.

![demo](demo.gif)

## Features

- Paginated browsing of Pokémon location areas
- Catch Pokémon with a probability weighted by their base experience
- Inspect caught Pokémon offline, from local state
- In-memory cache with automatic expiry, so repeated requests skip the network
- Strict TypeScript throughout — no `any`

## Requirements

- Node.js 22+

## Setup

```bash
git clone https://github.com/MarahDwikat8/pokedex-ts.git
cd pokedex-ts
npm install
npm run build
npm start
```

For development, `npm run dev` builds and runs in one step.

## Commands

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `help`              | List available commands              |
| `map`               | Show the next page of location areas |
| `mapb`              | Show the previous page               |
| `explore <area>`    | List Pokémon in a location area      |
| `catch <pokemon>`   | Attempt to catch a Pokémon           |
| `inspect <pokemon>` | Show details of a caught Pokémon     |
| `pokedex`           | List all caught Pokémon              |
| `exit`              | Quit the REPL                        |

## Example session

```
Pokedex > explore pastoria-city-area
Exploring pastoria-city-area...
Found Pokemon:
 - tentacool
 - magikarp
 - gyarados

Pokedex > catch magikarp
Throwing a Pokeball at magikarp...
magikarp was caught!
You may now inspect it with the inspect command.

Pokedex > inspect magikarp
Name: magikarp
Height: 9
Weight: 100
Stats:
  -hp: 20
  -attack: 10
Types:
  - water

Pokedex > pokedex
Your Pokedex:
 - magikarp
```

## Project structure

```
src/
  main.ts           entry point
  state.ts          shared state and command registry types
  repl.ts           read-eval-print loop and input parsing
  pokeapi.ts        PokeAPI client, typed responses
  pokecache.ts      in-memory cache with TTL reaping
  commands.ts       command registry
  command_*.ts      one file per command
```

Commands are registered in a lookup table rather than a switch, so adding one
means adding a file and a registry entry — the REPL itself never changes, and
`help` picks it up automatically.

## Caching

Every API response is cached under its request URL. A background timer removes
entries older than the cache interval (5 minutes by default) so memory does not
grow without bound, and the timer is cleared on exit so the process can shut
down cleanly.

Responses are cached only after a request succeeds, so a transient network
failure is never served from the cache.

## Tests

```bash
npm run test
```

Vitest covers input parsing and the cache — storage, retrieval, replacement,
key isolation, and expiry. Time-dependent assertions use `expect.poll` rather
than fixed sleeps, to avoid flaky results.

## Built with

TypeScript · Node.js · Vitest
