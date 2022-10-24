import { createContext, ReactNode, useCallback, useContext, useState }  from 'react';

type User = {
    alreadyWon: boolean;
}
interface UserContextProps {
    user: User | undefined;
    updateUser: () => void;
}
interface UserContextProvider {
    children: ReactNode
}

const UserContext = createContext({} as UserContextProps);

export default function UserContextProvider({children} : UserContextProvider) {
    const [ user, setUser ] = useState<User>({alreadyWon: false});

    const updateUser = () => {
        setUser(oldUser => ({...oldUser, alreadyWon: true}));
    }

    return (
        <UserContext.Provider value={{
            user,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const value = useContext(UserContext)
    return value
}