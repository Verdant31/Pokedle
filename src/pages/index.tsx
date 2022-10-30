import CardSelection from "../components/CardSelection";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { useState } from "react";
import MyModal from "../components/HowToPlay";

const Home: React.FunctionComponent = () => {
  const [ isHtpOpen, setIsHtpOpen ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const router = useRouter();
  const handleNavigate = (route: string) => {
    setIsLoading(true);
    router.push(route);
  }

  const toggleHtpModal = () => setIsHtpOpen(!isHtpOpen);

  return (
    <div className={`relative h-screen ${isHtpOpen ? "opacity-25" : ""}`}>
      <Header />
      {isLoading 
         ? (
            <Loading text="Loading game" />
          )
         : (
          <div className="max-w-2xl m-auto">
            <h1 className="text-md  px-4 mt-8 font-semibold text-center md:text-2xl md:mt-12 md:mb-12 ">Guess pokemons from all generations!</h1>
            <div className="flex flex-col mx-6 mt-6 space-y-6  md:mx-auto ">
              <CardSelection onClick={() => handleNavigate('/classic')} title="Classic" subtitle="Get clues on each try" />
              <CardSelection onClick={() => handleNavigate('/findout')} title="Find out" subtitle="Ask for clues" />
            </div>
          </div>
         )
      }
      <div className="justify-center mt-12 flex items-center gap-y-2 flex-col absolute bottom-16 left-[50%] -translate-x-1/2">
        <a target="_blank" href="https://github.com/verdant31/pokedle" className="underline" rel="noreferrer">Github</a>
        <a onClick={toggleHtpModal} className="underline">How to play</a>
      </div>
      <MyModal toggleModal={toggleHtpModal} isOpen={isHtpOpen} />
    </div>
  );
};

export default Home;



