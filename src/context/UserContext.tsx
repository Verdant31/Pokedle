import { createContext, ReactNode, useContext, useState }  from 'react';
import { ComparedPokemon } from '../@types';
import {  setCookie } from 'nookies';
import { api } from '../services/api';

export type User = {
    alreadyWon: boolean;
    classicPokemons: ComparedPokemon[];
}
interface UserContextProps {
    user: User | undefined;
    handleUserWin: () => void;
    addComparedPokemon: (pokemon: ComparedPokemon, dailyPokemonId?: number) => Promise<void>;
}
interface UserContextProvider {
    children: ReactNode
}

const UserContext = createContext({} as UserContextProps);

export default function UserContextProvider({children} : UserContextProvider) {
    const [ user, setUser ] = useState<User>({alreadyWon: false, classicPokemons: []});
    
    const handleUserWin = () => {
        setUser(oldState => ({...oldState, alreadyWon: true}))
    }

    const addComparedPokemon = async (compared: ComparedPokemon, dailyPokemonId?: number) => {
        const won = compared.comparison.win;
        setCookie(undefined, 'pokedle.user', JSON.stringify({   
            alreadyWon: won, 
            classicPokemons: [
                ...user.classicPokemons.map((pokemon) => (pokemon.chosenPokemon.name)), 
                compared.chosenPokemon.name
            ],
        }));
        setCookie(undefined, 'pokedle.pokeoftheday', JSON.stringify({ pokeOfTheDay: dailyPokemonId }));
        setUser(oldState => ({...oldState, classicPokemons: [...oldState.classicPokemons, compared]}));
        if(won) {
            await api.get('/pokemon/incrementhits')            
        }
    }
   

    return (
        <UserContext.Provider value={{
            user,
            handleUserWin,
            addComparedPokemon,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const value = useContext(UserContext)
    return value
}