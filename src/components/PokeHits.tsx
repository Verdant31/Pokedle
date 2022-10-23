import Image from 'next/image';
import { CaretDoubleLeft, CaretDoubleRight, Equals } from 'phosphor-react';
import * as React from 'react';
import { Pokemon } from '../@types';
import { ComparedPokemons, comparePokemons } from '../utils/comparePokemons';

interface IPokeHitsProps {
    chosenPokemon: Pokemon;
    dailyPokemon: Pokemon;
}

const PokeHits: React.FunctionComponent<IPokeHitsProps> = ({chosenPokemon, dailyPokemon}) => {
    const compared : ComparedPokemons = comparePokemons(chosenPokemon, dailyPokemon);
    if(compared.win) console.log("GANHOU PORRA");
    return (
    <div className="flex justify-center  gap-x-2">
        <div className="w-28 h-28">
            <p>Pokemon</p>
            <div className="w-full h-1 bg-yellow-500 my-4"/>
            <div className="h-24 w-full flex items-center justify-center">
                <Image src={chosenPokemon.image} height={900} width={900} alt="Picture of chosen pokemon" />
            </div>
        </div>
        <div className="w-24 ">
            <p>Abilities</p>
            <div className="w-full h-1 bg-yellow-500 my-4"/>
            <div style={{backgroundColor: compared.abilities.color}} className={`h-20 w-full flex items-center justify-center `}>
                {compared.abilities.message === "None" 
                    ? <p className="text-white text-sm font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col">
                            {compared.abilities.attributes.map((ability) => (
                                <p  key={ability.name} className="text-white text-sm font-semibold " >{ability.name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
        <div className="w-24 ">
            <p>Moves</p>
            <div className="w-full h-1 bg-yellow-500 my-4"/>
            <div style={{backgroundColor: compared.moves.color}} className={`h-20  w-full flex items-center justify-center`}>
                {compared.moves.message === "None" 
                    ? <p className="text-white text-lg font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col">
                            <p className="text-white p-3 text-sm font-semibold " >{chosenPokemon.moves.length} moves ({compared.moves.attributes.length} in common)</p>
                        </div>
                    )
                }
            </div>
        </div>
        <div className="w-24 ">
            <p>Types</p>
            <div className="w-full h-1 bg-yellow-500 my-4"/>
            <div style={{backgroundColor: compared.types.color}} className={`h-20 w-full flex items-center justify-center `}>
                {compared.types.message === "None" 
                    ? <p className="text-white text-sm font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col ">
                            {compared.types.attributes.map((type) => (
                                <p  key={type.name} className=" text-white text-base font-semibold capitalize" >{type.name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
        <div className="w-24 ">
            <p>Weight</p>
            <div className="w-full h-1 bg-yellow-500 my-4"/>
            <div style={{backgroundColor: compared.weight.color}} className={`h-20 w-full flex items-center justify-center `}>
                <div className="flex flex-col space-y-2 items-center">
                    {compared.weight.message === "Less" && (<CaretDoubleLeft size={32} />)}
                    {compared.weight.message === "Higher" && (<CaretDoubleRight size={32} />)}
                    {compared.weight.message === "Equals" && (<Equals size={32} />)}
                    <p className="text-white text-sm font-semibold " >{compared.weight.attributes}kg</p>
                </div>
            </div>
        </div>
        <div className="w-24 ">
            <p>Height</p>
            <div className="w-full h-1 bg-yellow-500 my-4"/>
            <div  style={{backgroundColor: compared.height.color}} className={`h-20 w-full flex items-center justify-center `}>
                <div className="flex flex-col space-y-2">
                    {compared.height.message === "Less" && (<CaretDoubleLeft size={32} />)}
                    {compared.height.message === "Higher" && (<CaretDoubleRight size={32} />)}
                    {compared.height.message === "Equals" && (<Equals size={32} />)}
                    <p className="text-white text-sm font-semibold " >{compared.height.attributes}m</p>
                </div>
            </div>
        </div>
        {compared.stats.map((stat) => (
            <div className="w-24" key={stat.name}>
                <p className="capitalize">{stat.name}</p>
                <div className="w-full h-1 bg-yellow-500 my-4"/>
                <div  style={{backgroundColor: stat.color}} className={`h-20 w-full flex items-center justify-center `}>
                    <div className="flex flex-col space-y-2">
                        {stat.message === "Less" && (<CaretDoubleLeft size={32} />)}
                        {stat.message === "Higher" && (<CaretDoubleRight size={32} />)}
                        {stat.message === "Equals" && (<Equals size={32} />)}
                        <p className="text-white text-sm font-semibold " >{stat.attributes}</p>
                    </div>
                </div>
            </div>
        ))}
        
    </div>
  )
};

export default PokeHits;