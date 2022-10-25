import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pokemon } from '../@types';
import { trpc } from '../utils/trpc';

interface IWinnerCardProps {
  dailyPokemon: Pokemon;
}

const WinnerCard: React.FC<IWinnerCardProps> = ({dailyPokemon}) => {
  const [timeUntilNextPokemon, setTimeUntilNextPokemon] = useState();
  const { data } = trpc.winner.getWinnerProps.useQuery({name: dailyPokemon.name})

  useEffect(() => {
    if(data && data.dailyPokemon) {
      const diff =  Math.abs(new Date().getTime() - data?.dailyPokemon.lastUpdate.getTime());
      console.log(data?.dailyPokemon.lastUpdate);
      // const timer = setInterval(() => {
      // }, 1000);
  
      // setTimeUntilNextPokemon(updated)
    }
  },[])
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
          <p className="text-3xl font-bold mt-2">04:02:28</p>
        </div>
      </div>
    </div>
  )
};

export default WinnerCard;
