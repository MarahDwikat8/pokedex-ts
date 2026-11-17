import { expect } from "vitest";

export class PokeAPI{
    private static readonly baseURL="https://pokeapi.co/api/v2";
    constructor(){

    }
     async fetchLocations(pageURL?:string): Promise<ShallowLocation>{
       const url = pageURL ?? `${PokeAPI.baseURL}/location-area`
       try {
        const response= await fetch(url);
        if(!response.ok){
        throw new Error (`${response.status} ${response.statusText}`)
        }
        return (await response.json())as ShallowLocation
       } catch (error) {
        throw new Error (` Error fetching location ${(error as Error).message}`)
        
       }
     }

     async fetchLocation(locationName:string) :Promise<Location>{
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        try {
            const response= await fetch(url);
            if(!response.ok){
                throw new Error (`${response.status} ${response.statusText}`)
            }
            return await response.json() as Location;
        } catch (error) {
            throw new Error (`Error fetch location ${locationName} : ${(error as Error).message}`)
        }
     }
}

export type ShallowLocation={
count:number;
next :string|null;
previous: string|null;
results: {
    name:string;
    url:string;
}[];
}

export type Location ={
    id:number ;
    name:string;
    game_index:number;
    location:{
        name:string,
        url:string
    },
    names:{
    name:string,
    language: { name: string; url: string }; 
    }[];
    pokemon_encounters:{
        pokemon: { name: string; url: string };
    }[]


}