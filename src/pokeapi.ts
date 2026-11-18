import {Cache} from "./pokecache.js"
export class PokeAPI{
    private static readonly baseURL="https://pokeapi.co/api/v2";
    #cache:Cache;
    constructor(cacheInterval:number){
        this.#cache =new Cache(cacheInterval);

    }
    closeCache(){
        this.#cache.stopReapLoop();
    }

     async fetchLocations(pageURL?:string): Promise<ShallowLocation>{
       const url = pageURL ?? `${PokeAPI.baseURL}/location-area`
       //فحص 
       const cached =this.#cache.get<ShallowLocation>(url);
       if(cached !== undefined){
       // console.log(`CACHE HIT: ${url}`);
        return cached;

       }

       //console.log(`NETWORK REQUEST: ${url}`)


       try {
        //جيب
        const response= await fetch(url);
        if(!response.ok){
        throw new Error (`${response.status} ${response.statusText}`)
        }
        //خزن ورجع 
        const locations= (await response.json())as ShallowLocation
        this.#cache.add<ShallowLocation>(url,locations)
        return locations;
       } catch (error) {
        throw new Error (` Error fetching location ${(error as Error).message}`)
        
       }
     }

     async fetchLocation(locationName:string) :Promise<Location>{
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
        //افحص
         const cached =this.#cache.get<Location>(url);
         if(cached !==undefined){
            return cached;
         }
        try {
            //جيب الداتا 
            const response= await fetch(url);
            if(!response.ok){
                throw new Error (`${response.status} ${response.statusText}`)
            }
            //خزن ورجع
            const location =await response.json() as Location;
            this.#cache.add<Location>(url,location);
            return location;
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