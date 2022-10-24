/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next';
import { PaperPlaneRight } from 'phosphor-react';
import { FormEvent, useCallback, useState } from 'react';
import { trpc } from '../utils/trpc';
import { pokeDto } from '../utils/pokeDto';
import { api } from '../services/api';
import type { ComparedPokemon, Pokemon } from '../@types';
import ComparisonBody from '../components/ComparisonBody';
import WinnerCard from '../components/WinnerCard';
import { User, useUser } from '../context/UserContext';
import Header from '../components/Header';
import { pokemonApi } from "../services/pokemonClient";
import { parseCookies } from 'nookies';

interface ClassicProps {
  dailyPokemon: Pokemon;
  userCookies?: User
}

const Classic: React.FC<ClassicProps> = ({dailyPokemon, userCookies}) => {
  const [ comparedPokemons, setComparedPokemons ] = useState<ComparedPokemon[]>([]);
  const [ animationFinished, setAnimationFinished ] = useState<boolean>(false);
  const [ pokeName, setPokeName ] = useState('')
  
  const pokemons = trpc.pokemon.getAllPokemons.useQuery();
  const { addComparedPokemon } = useUser();

  if(comparedPokemons.length === 0 && userCookies && userCookies?.classicPokemons.length > 0) {
    setComparedPokemons(userCookies.classicPokemons);
  }

  const updateAnimationFinished = () => setAnimationFinished(true);

  const handleSearchFirstPokemon = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if(pokeName.length > 0 ) {
      const { data } = await api.post("/pokemon/" + pokeName, {dailyPokemon})
      setComparedPokemons(oldState => [...oldState, data.compared])
      await addComparedPokemon(data.compared)
      setPokeName('')
    }
  },[dailyPokemon, addComparedPokemon, pokeName])

  const filteredPokemons = pokemons?.data?.filter((pokemon) => pokemon.name.includes(pokeName.charAt(0).toUpperCase() + pokeName.slice(1)))

  return (
    <div className="flex flex-col items-center h-screen overflow-y-scroll scrollbar scrollbar-track-zinc-700  scrollbar-thumb-yellow-500">
      <Header />
      <div>
        <motion.div className="mt-8 text-center h-full mb-24 ">
          {userCookies?.alreadyWon 
            ? (
              <a href="#winnercard" className="text-lg font-semibold">You already guessed today &apos;s Pokemon.</a>
            )
            : (
              <>
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
              </>
            )
          }
          <ComparisonBody userAlreadyWon={userCookies?.alreadyWon ? true : false} onAnimationComplete={updateAnimationFinished} comparedPokemons={comparedPokemons}/>
        </motion.div>
      </div>
      {comparedPokemons.find((compared) => compared.comparison.win) && animationFinished && (
          <WinnerCard dailyPokemon={dailyPokemon} />
      )}
    </div>
  )
};

export default Classic;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const dbPokemon = await prisma?.dailyPokemon.findFirst();
  const dbPokemon = {
    name: "charmander",
    id: "4"
  }
  const userCookies : User = {alreadyWon: false, classicPokemons: []};
  const { "pokedle.user": cookiesUser } = parseCookies(ctx);

  if(!dbPokemon) return {props: {}};
  const dailyPokemon = await pokemonApi.getPokemonByName(dbPokemon?.name).then(res => pokeDto(res));
  
  if(cookiesUser) {
    userCookies.alreadyWon = JSON.parse(cookiesUser).alreadyWon;
    await Promise.all(
      (JSON.parse(cookiesUser)["classicPokemons"] as string[]).map(async (pokemon) => {
        const { data } = await api.post("/pokemon/" + pokemon, {dailyPokemon})
        userCookies.classicPokemons.push(data.compared);
      })
    )
  }

  return {
    props: { 
      dailyPokemon,
      userCookies,
    },
  }
}
