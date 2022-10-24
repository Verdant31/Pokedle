import CardSelection from "../components/CardSelection";
import { useRouter } from "next/router";
import Header from "../components/Header";

const Home: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <div>
      <Header />
      <div className="max-w-2xl m-auto">
      <h1 className="text-2xl mt-12 text-center">Adivinhe pokemons de todas as gerações!</h1>
        <div className="flex flex-col mt-12 space-y-6">
          <CardSelection onClick={() => router.push('/classic')} title="Clássico" subtitle="Receba dicas a cada tentativa" />
          {/* <CardSelection onClick={onClick} title="Habilidade" subtitle="Uma habilidade, um pokemon" /> */}
          {/* <CardSelection onClick={onClick} title="Splash" subtitle="Uma parte da foto de um pokemon" /> */}
        </div>
      </div>


    </div>
  );
};

export default Home;



