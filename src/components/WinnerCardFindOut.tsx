import Image from 'next/image';
import { Pokemon } from '../@types';

interface IWinnerCardFindOutProps {
  randomPokemon: Pokemon;
}

const WinnerCardFindOut: React.FC<IWinnerCardFindOutProps> = ({randomPokemon}) => {
  return (
    <div className="mt-[200px] sm:mt-[500px]  mb-36 ">
      <div className="bg-yellow-500/90 mb-36 w-[300px] h-[320px] xsm:w-[400px] sm:w-[520px] sm:h-[480px] items-center flex flex-col rounded-md hover:scale-105 duration-300" id="winnercardfindout">
        <h1 className="text-xl xsm:text-3xl sm:text-4xl text-white font-bold mt-8">Well done!</h1>
        <div className="flex items-center">
          <div className="h-32 w-32 sm:h-44 sm:w-48 relative"> 
            <Image
              src={randomPokemon.image}
              alt="Picture of chosen pokemon" 
              layout="fill" 
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <p className="w-[150px]">The random Pokemon was <span className="text-lg font-bold">{randomPokemon.name}.</span></p>
        </div>
        <p className="mt-6 px-8 text-center xsm:text-xl">
          To play again, 
          <button className="underline mx-1 font-bold" onClick={() => window.location.reload()}>click here</button>
          or refresh the page,
          a new Pokemon will be generated.
        </p>
      </div>
    </div>
  )
};

export default WinnerCardFindOut;
