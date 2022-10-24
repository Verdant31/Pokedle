import "../styles/globals.css";
import type { AppProps, AppType } from "next/app";
import { trpc } from "../utils/trpc";
import UserContextProvider from "../context/UserContext";

const MyApp: AppType = ({ Component, pageProps } : AppProps) => {
  return (
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
  );
};

export default trpc.withTRPC(MyApp);
