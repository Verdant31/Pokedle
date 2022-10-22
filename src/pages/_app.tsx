import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Header from "../components/Header";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col items-center max-w-6xl mx-auto">
      <Header />
      <Component {...pageProps} />
    </div>
  );
};

export default trpc.withTRPC(MyApp);
