import CardSelection from "../components/CardSelection";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Home: React.FunctionComponent = () => {
  const router = useRouter();
  const handleNavigate = (route: string) => {
    router.push(route);
  }
  return (
    <div>
      <Header />
        <div className="max-w-2xl m-auto">
          <h1 className="text-md  px-4 mt-8 font-semibold text-center md:text-2xl md:mt-12 md:mb-12 ">Guess pokemons from all generations!</h1>
          <div className="flex flex-col mx-6 mt-6 space-y-6  md:mx-auto ">
            <CardSelection onClick={() => handleNavigate('/classic')} title="Classic" subtitle="Get clues on each try" />
          </div>
        </div>
    </div>
  );
};

export default Home;



