/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next';
import { PaperPlaneRight } from 'phosphor-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { trpc } from '../utils/trpc';
import { api } from '../services/api';
import type { ComparedPokemon } from '../@types';
import ComparisonBody from '../components/ComparisonBody';
import WinnerCard from '../components/WinnerCard';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import { parseCookies } from 'nookies';
import Loading from '../components/Loading';

type UserCookies = {
  alreadyWon: boolean;
  classicPokemons: string[];
  dailyPokemonId: string
}

interface ClassicProps {
  dailyPokemonId: number;
  userCookies: UserCookies
}

const Classic: React.FC<ClassicProps> = ({dailyPokemonId, userCookies}) => {
  const [ userWon, setUserWon ] = useState(false);
  const [ comparedPokemons, setComparedPokemons ] = useState<ComparedPokemon[]>([]);
  const [ animationFinished, setAnimationFinished ] = useState<boolean>(false);
  const [ pokeName, setPokeName ] = useState('')

  const {data : dailyPokemon} = trpc.pokemon.getPokemon.useQuery({id: dailyPokemonId});
  const {data : previousCompared, isLoading } = trpc.pokemon.getPreviousData.useQuery({pokemons: userCookies.classicPokemons, dailyPokemonId});
  
  const pokemons = trpc.pokemon.getAllPokemons.useQuery();

  useEffect(() => {
    if(!isLoading && previousCompared.length > 0 && comparedPokemons.length === 0) {	
      setComparedPokemons(previousCompared)
    }
    if(comparedPokemons.find((compared) => compared.comparison.win) || userCookies.alreadyWon) {
      setUserWon(true)
    }
  }, [isLoading, previousCompared])

  const { addComparedPokemon } = useUser();
  const filteredPokemons = pokemons?.data?.filter((pokemon) => pokemon.name.includes(pokeName.charAt(0).toUpperCase() + pokeName.slice(1)))


  const updateAnimationFinished = () => {
    setAnimationFinished(true)
    if(comparedPokemons.find((compared) => compared.comparison.win) || userCookies.alreadyWon) {
      setUserWon(true)
    }
  }
  const handleSearchFirstPokemon = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    if(pokeName.length > 0 ) {
      setPokeName('')
      const { data } = await api.post("/pokemon/" + pokeName, {dailyPokemonId})
      setComparedPokemons(oldState => [...oldState, data.compared])
      await addComparedPokemon(data.compared)
    }
  },[pokeName, dailyPokemonId, addComparedPokemon])

  return (
    <div className="flex flex-col items-center h-screen  scrollbar scrollbar-track-zinc-700  scrollbar-thumb-yellow-500">
      <Header />
      <div>
        <motion.div className="sticky text-center h-full mb-24 items-center justify-center flex flex-col ">
          <h1 className="text-xl">Guess todays Pokemon!!</h1>
          <h1>Type any Pokemon to begin.</h1>
          <form onSubmit={handleSearchFirstPokemon} className="flex relative w-[230px] lg:w-[490px]  justify-center mt-8 items-center ">
            <div>
              <input 
                disabled={userWon}
                value={pokeName} 
                autoComplete='false' 
                onChange={(e) => setPokeName(e.target.value)} 
                list="pokemons" 
                className={`h-10 w-full lg:w-[380px] p-6 bg-yellow-500 rounded-lg roudend-md pl-16 font-bold outline-none
                  ${userWon ? 'cursor-not-allowed' : ''}
                `} 
              />
              <datalist id="pokemons" className="h-20">
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
              className="w-8 h-8 absolute left-[16px] lg:left-[70px] top-2" 
            />
            <button type="submit" className="absolute  -right-10 lg:-right-0" >
              <PaperPlaneRight  size={32} weight="fill" color="#EAB308" className="cursor-pointer hover:scale-105 transition duration-300"/>
            </button>
          </form>
          {isLoading
            ? (
              <Loading text="Loading old answers" />
            )
            : (
              <ComparisonBody userAlreadyWon={userCookies?.alreadyWon ? true : false} onAnimationComplete={updateAnimationFinished} comparedPokemons={comparedPokemons}/>
            )
          }
        </motion.div>
      </div>
      {(userWon || animationFinished) && (dailyPokemon) && (
          <WinnerCard dailyPokemon={dailyPokemon} />
      )}
    </div>
  )
};

export default Classic;



export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { dailyPokemonId } = await api.get("/pokemon/getdailypokemonid").then(res =>  res.data);
  let userCookies : UserCookies = {alreadyWon: false, classicPokemons: [], dailyPokemonId: ''};
  const { "pokedle.user": cookiesUser } = parseCookies(ctx);
  if(cookiesUser) {
    userCookies = JSON.parse(cookiesUser);
  }
  return {
    props: { 
      dailyPokemonId,
      userCookies,
    },
  }
}
