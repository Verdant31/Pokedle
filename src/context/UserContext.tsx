import { createContext, ReactNode, useCallback, useContext, useState }  from 'react';
import { ComparedPokemons } from '../utils/comparePokemons';

interface UserContextProps {
    updateClassicAnswers: (newAnswer: ComparedPokemons) => void;
}
interface UserContextProvider {
    children: ReactNode
}

const UserContext = createContext({} as UserContextProps);

export default function UserContextProvider({children} : UserContextProvider) {
    const [ classicAnswers, setClassicAnswers ] = useState<ComparedPokemons[]>([])

    const updateClassicAnswers = useCallback((newAnswer: ComparedPokemons) => {
        setClassicAnswers((oldAnswers) => [...oldAnswers, newAnswer])
    }, [])

    return (
        <UserContext.Provider value={{
            updateClassicAnswers
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const value = useContext(UserContext)
    return value
}