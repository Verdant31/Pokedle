import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";
import DailyPokemonProvider from "../context/DailyPokemon";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <DailyPokemonProvider>
      <div className="flex flex-col items-center max-w-6xl mx-auto">
        <Header />
        <Component {...pageProps} />
      </div>
    </DailyPokemonProvider>
  );
};

export default trpc.withTRPC(MyApp);
