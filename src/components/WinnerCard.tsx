import Image from 'next/image';
import * as React from 'react';
import { Pokemon } from '../@types';
import { trpc } from '../utils/trpc';

interface IWinnerCardProps {
  dailyPokemon: Pokemon;
}

const WinnerCard: React.FC<IWinnerCardProps> = ({dailyPokemon}) => {
  const { data : image} = trpc.pokemon.getDreamWorldImage.useQuery({name: dailyPokemon.name})
  return (
    <div className="mt-[500px] mb-36 ">
      <div className="bg-yellow-500/90 mt-44 w-[480px] h-[520px] items-center flex flex-col rounded-md hover:scale-105 duration-300" id="winnercard">
        <h1 className="text-4xl text-white font-bold mt-8">Well done!</h1>
        <div className="flex space-x-4 items-center mt-8 ">
          <Image  style={{paddingLeft: 40}} src={image ? image : dailyPokemon.image} height={200} width={200} alt="Picture of chosen pokemon" />
          <p className="w-[150px]">Today's pokemon is <span className="text-lg font-bold">{dailyPokemon.name}.</span></p>
        </div>
        <p className="mt-6">You are the 32076th to find the pokemon today</p>
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold">Next pokemon in:</p>
          <p className="text-3xl font-bold mt-2">04:02:28</p>
        </div>
      </div>
    </div>
  )
};

export default WinnerCard;
