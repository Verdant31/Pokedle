/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next';
import { PaperPlaneRight } from 'phosphor-react';
import { FormEvent, useCallback, useState } from 'react';
import { prisma } from "../server/db/client";
import { trpc } from '../utils/trpc';
import { pokeDto } from '../utils/pokeDto';
import { api } from '../services/api';
import type { ComparedPokemon, Pokemon } from '../@types';
import ComparisonBody from '../components/ComparisonBody';
import WinnerCard from '../components/WinnerCard';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import { pokemonApi } from "../services/pokemonClient";

interface ClassicProps {
  dailyPokemon: Pokemon
}

const Classic: React.FC<ClassicProps> = ({dailyPokemon}) => {
  const { user, handleUserComparedPokemon } = useUser();
  const [ comparedPokemons, setComparedPokemons ] = useState<ComparedPokemon[]>([])
  const [pokeName, setPokeName] = useState('')
  
  const pokemons = trpc.pokemon.getAllPokemons.useQuery();
  const filteredPokemons = pokemons?.data?.filter((pokemon) => pokemon.name.includes(pokeName.charAt(0).toUpperCase() + pokeName.slice(1)))

  const handleSearchFirstPokemon = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if(pokeName.length > 0 ) {
      const { data } = await api.post("/pokemon/" + pokeName, {dailyPokemon})
      setComparedPokemons(oldState => [...oldState, data.compared])
      handleUserComparedPokemon(data.compared)
      setPokeName('')
    }
  },[dailyPokemon, handleUserComparedPokemon, pokeName])

  return (
    <div className="flex flex-col items-center h-screen overflow-y-scroll scrollbar scrollbar-track-zinc-700  scrollbar-thumb-yellow-500">
      <Header />
      <div>
        <motion.div className="mt-8 text-center h-full mb-24 ">
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
          <ComparisonBody comparedPokemons={comparedPokemons}/>
        </motion.div>
      </div>
      {user?.alreadyWon && (
          <WinnerCard dailyPokemon={dailyPokemon} />
        )}
    </div>
  )
};

export default Classic;

export const getServerSideProps: GetServerSideProps = async () => {
  // const dbPokemon = await prisma.dailyPokemon.findFirst();
  const dbPokemon = {
    name: "charmander",
    id: "4"
  }
  if(!dbPokemon) return {props: {}};
  const dailyPokemon = await pokemonApi.getPokemonByName(dbPokemon?.name).then(res => pokeDto(res))
  return {
    props: { dailyPokemon },
  }
}
