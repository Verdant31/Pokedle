import CardSelection from "../components/CardSelection";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { useState } from "react";

const Home: React.FunctionComponent = () => {
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const handleNavigate = (route: string) => {
    setIsLoading(true);
    router.push(route);
  }
  return (
    <div>
      <Header />
      {isLoading 
        ? (
          <div className="max-w-2xl m-auto">
            <h1 className="text-center mt-12 text-4xl">Loading...</h1>
          </div>
        )
        : (
          <div className="max-w-2xl m-auto">
            <h1 className="text-xl px-4 mt-6 text-center">Adivinhe pokemons de todas as gerações!</h1>
            <div className="flex flex-col mx-4 mt-6 space-y-6">
              <CardSelection onClick={() => handleNavigate('/classic')} title="Clássico" subtitle="Receba dicas a cada tentativa" />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Home;



