import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

type DailyPokemonContextProps = {
    dailyPokemon: string;
}

type DailyPokemonProviderProps =  { 
    children: ReactNode;
}

const DailyPokemonContext = createContext({} as DailyPokemonContextProps)

export default function DailyPokemonProvider({ children } : DailyPokemonProviderProps) {
    const [ dailyPokemon, setDailyPokemon ] = useState('');
    // const pokemon = trpc.pokemon.getDailyPokemon.useQuery();
    // useEffect(() => {
        // if(pokemon) setDailyPokemon(pokemon.data);
    // }, [])
    return (    
        <DailyPokemonContext.Provider value={{dailyPokemon}}>
            {children}
        </DailyPokemonContext.Provider>
    )
}

export function usePokemon() {
    const value = useContext(DailyPokemonContext);
    return value;
}