import "../styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import DailyPokemonProvider from "../context/DailyPokemon";
import UserContextProvider, { useUser } from "../context/UserContext";

const MyApp: AppType = ({ Component, pageProps } : AppProps) => {
  const { user } = useUser();
  return (
      <UserContextProvider>
        <DailyPokemonProvider>
            <Component {...pageProps} />
        </DailyPokemonProvider>
      </UserContextProvider>
  );
};

export default trpc.withTRPC(MyApp);
