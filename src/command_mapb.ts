import type { State } from "./state.js";


export async function commandMapb (state:State){
    if (state.prevLocationsURL ===null){
        console.log("you're on the first page");
        return;
    }
    
    
    const locations =await state.pokeapi.fetchLocations(
        state.prevLocationsURL ?? undefined
    )

    state.nextLocationsURL = locations.next;
    state.prevLocationsURL=locations.previous


    locations.results.forEach(item=>console.log(item.name));

}