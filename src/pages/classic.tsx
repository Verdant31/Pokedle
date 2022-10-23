/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import CardTitle from '../components/CardTitle';
import PokeHits from '../components/PokeHits';
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next';
import { PaperPlaneRight } from 'phosphor-react';
import { FormEvent, useCallback, useState } from 'react';
import { prisma } from "../server/db/client";
import { trpc } from '../utils/trpc';
import { pokeDto } from '../utils/pokeDto';
import { api } from '../services/api';
import type { ComparedPokemon, Pokemon } from '../@types';
import { comparePokemons } from '../utils/comparePokemons';
interface ClassicProps {
  dailyPokemon: Pokemon
}

const Classic: React.FC<ClassicProps> = ({dailyPokemon}) => {
  const [ comparedPokemons, setComparedPokemons ] = useState<ComparedPokemon[]>([])
  const [pokeName, setPokeName] = useState('')
  
  const pokemons = trpc.pokemon.getAllPokemons.useQuery();
  const filteredPokemons = pokemons?.data?.filter((pokemon) => pokemon.name.includes(pokeName.charAt(0).toUpperCase() + pokeName.slice(1)))

  const handleSearchFirstPokemon = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if(pokeName.length > 0 ) {
      const { data } = await api.get("/pokemon/" + pokeName)
      const compared : ComparedPokemon = comparePokemons(data.chosenPokemon, dailyPokemon);
      setComparedPokemons(oldState => [...oldState, compared])
      setPokeName('')
    }
  },[dailyPokemon, pokeName])

  return (
    <div>
      <motion.div className="mt-8 text-center h-full mb-24">
        <h1 className="text-xl">Guess todays Pokemon!!</h1>
        <h1>Type any Pokemon to begin.</h1>
        <form onSubmit={handleSearchFirstPokemon} className="flex relative w-[300px] mx-auto justify-center mt-8 items-center ">
          <div>
            <input value={pokeName} autoComplete='false' onChange={(e) => setPokeName(e.target.value)} list="pokemons" className="h-10 w-full p-6 bg-yellow-500 rounded-lg roudend-md pl-16 font-bold outline-none " />
            <datalist  id="pokemons" className="h-20">
              {filteredPokemons && filteredPokemons.length > 0 
                ? (
                  filteredPokemons.map(pokemon => (
                    <option  key={pokemon.name} value={pokemon.name}>{pokemon.name}</option>
                  ))
                )
                : (
                  pokemons.data?.map(pokemon => (
                    <option  key={pokemon.name} value={pokemon.name}>{pokemon.name}</option>
                  ))
                )
              }
            </datalist>
          </div>
          <img 
            src="/pokeball.png" 
            alt="pokeball" 
            className="w-8 h-8 absolute left-[16px] top-2" 
          />
          <button type="submit" className="absolute  -right-12" >
            <PaperPlaneRight  size={32} weight="fill" color="#EAB308" className="cursor-pointer hover:scale-105 transition duration-300"/>
          </button>
        </form>
          <div className="flex justify-end items-center gap-x-2 mt-8 ">
            <CardTitle>Pokemon</CardTitle>
            <CardTitle>Abilities</CardTitle>
            <CardTitle>Moves</CardTitle>
            <CardTitle>Types</CardTitle>
            <CardTitle>Weight</CardTitle>
            <CardTitle>Height</CardTitle>
            <CardTitle>Hp</CardTitle>
            <CardTitle>Attack</CardTitle>
            <CardTitle>Speed</CardTitle>
          </div>
          <div className="flex flex-col items-center mt-8">
            {comparedPokemons.length > 0 && comparedPokemons.slice(0).reverse().map((compared) => (
                <PokeHits 
                  key={compared.chosenPokemon.id} 
                  compared={compared}  
                />
            ))}
          </div>
      </motion.div>
    </div>
  )
};

export default Classic;

export const getServerSideProps: GetServerSideProps = async () => {
  const dbPokemon = await prisma.dailyPokemon.findFirst();
  const dailyPokemon : Pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${dbPokemon?.pokemonId}`).then((res) => {
    return pokeDto(res);
  });
  return {
    props: { dailyPokemon },
  }
}
