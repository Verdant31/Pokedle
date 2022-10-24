import { createContext, ReactNode, useContext, useState }  from 'react';
import { ComparedPokemon } from '../@types';

type User = {
    alreadyWon: boolean;
    classicPokemons: ComparedPokemon[];
}
interface UserContextProps {
    user: User | undefined;
    handleUserWin: () => void;
    handleUserComparedPokemon: (pokemon: ComparedPokemon) => void;
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

    const handleUserComparedPokemon = (compared: ComparedPokemon) => {
        setUser(oldState => ({...oldState, classicPokemons: [...oldState.classicPokemons, compared]}));
    }

    return (
        <UserContext.Provider value={{
            user,
            handleUserWin,
            handleUserComparedPokemon
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const value = useContext(UserContext)
    return value
}