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
    <div className="mt-[500px] mb-36 ">
      <div className="bg-yellow-500/90 mt-44 w-[480px] h-[520px] items-center flex flex-col rounded-md hover:scale-105 duration-300" id="winnercard">
        <h1 className="text-4xl text-white font-bold mt-8">Well done!</h1>
        <div className="flex space-x-4 items-center mt-8 ">
          <Image  style={{paddingLeft: 40}} src={data?.image ? data?.image : dailyPokemon.image} height={200} width={200} alt="Picture of chosen pokemon" />
          <p className="w-[150px]">Today&apos;s pokemon is <span className="text-lg font-bold">{dailyPokemon.name}.</span></p>
        </div>
        <p className="mt-6">You are the {data?.dailyHitsCount}th to find the pokemon today</p>
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold">Next pokemon in:</p>
          <p className="text-3xl font-bold mt-2">
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
