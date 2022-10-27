import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Pokemon } from '../@types';
import { MyDate } from '../utils/diffDates';
import { trpc } from '../utils/trpc';

let countdownTimeout: NodeJS.Timeout;

interface IWinnerCardProps {
  dailyPokemon: Pokemon;
}

const WinnerCard: React.FC<IWinnerCardProps> = ({dailyPokemon}) => {
  const [ isActive, setIsActive ] = useState(false);
  const [timeUntilNextPokemon, setTimeUntilNextPokemon] = useState<MyDate>({hours: 0, minutes: 0, seconds: 0});
  const { data } = trpc.winner.getWinnerProps.useQuery({name: dailyPokemon.name})

  useEffect(() => {
    if(data && data.date) {
      setIsActive(true);
      setTimeUntilNextPokemon(data.date);
    }
  }, [data])

  useEffect(() => {
    if(data && data.date) {
      countdownTimeout = setTimeout(() => {
        if(timeUntilNextPokemon.seconds > 0) {
          setTimeUntilNextPokemon(oldState => ({...oldState, seconds: oldState.seconds - 1}));
        }else if(timeUntilNextPokemon.minutes > 0) {
          setTimeUntilNextPokemon(oldState => ({...oldState, minutes: oldState.minutes - 1, seconds: 59}));
        }else if(timeUntilNextPokemon.hours > 0) {
          setTimeUntilNextPokemon(oldState => ({...oldState, hours: oldState.hours - 1, minutes: 59, seconds: 59}));
        }
      }, 1000)
    }
  }, [isActive, timeUntilNextPokemon])


  return (
    <div className="mt-[300px] sm:mt-[500px]  mb-36 ">
      <div className="bg-yellow-500/90 mb-36 w-[300px] h-[420px] xsm:w-[400px] sm:w-[520px] sm:h-[480px] items-center flex flex-col rounded-md hover:scale-105 duration-300" id="winnercard">
        <h1 className="text-xl xsm:text-3xl sm:text-4xl text-white font-bold mt-8">Well done!</h1>
        <div className="flex items-center">
          <div className="h-32 w-32 sm:h-44 sm:w-48 relative"> 
            <Image
              src={data?.image ? data?.image : dailyPokemon.image}
              alt="Picture of chosen pokemon" 
              layout="fill" 
              objectFit="cover"
              className="rounded-full"
            />
          </div>
          <p className="w-[150px]">Today&apos;s pokemon is <span className="text-lg font-bold">{dailyPokemon.name}.</span></p>
        </div>
        <p className="mt-6 px-8 text-center xsm:text-xl">You are the {data?.dailyHitsCount}th to find the pokemon today</p>
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold xsm:text-xl">Next Pokemon in:</p>
          <p className="text-3xl font-bold mt-4">
            {(timeUntilNextPokemon.hours < 10 && timeUntilNextPokemon.hours > 0) && "0"}{Math.round(timeUntilNextPokemon.hours)}:
            {(timeUntilNextPokemon.minutes < 10 && timeUntilNextPokemon.minutes> 0) && "0"}{}{Math.round(timeUntilNextPokemon.minutes)}:
            {(timeUntilNextPokemon.seconds < 10 && timeUntilNextPokemon.seconds> 0) && "0"}{Math.round(timeUntilNextPokemon.seconds)}
          </p>
        </div>
      </div>
    </div>
  )
};

export default WinnerCard;
