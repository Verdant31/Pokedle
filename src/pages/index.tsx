import CardSelection from "../components/CardSelection";
import { useRouter } from "next/router";

const Home: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-2xl mt-12 ">Adivinhe pokemons de todas as gerações!</h1>
      <div className="flex flex-col mt-12 space-y-6">
        <CardSelection onClick={() => router.push('/classic')} title="Clássico" subtitle="Receba dicas a cada tentativa" />
        {/* <CardSelection onClick={onClick} title="Habilidade" subtitle="Uma habilidade, um pokemon" /> */}
        {/* <CardSelection onClick={onClick} title="Splash" subtitle="Uma parte da foto de um pokemon" /> */}
      </div>    

    </div>
  );
};

export default Home;



