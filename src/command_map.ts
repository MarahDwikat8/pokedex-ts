import type {State} from "./state.js"

export async function commandMap(state :State){
    const locations = await state.pokeapi.fetchLocations(
        state.nextLocationsURL ?? undefined
    );

    state.nextLocationsURL=locations.next;
    state.prevLocationsURL=locations.previous;

    locations.results.forEach(
        item => console.log(item.name)
    )

}