/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { PaperPlaneRight } from 'phosphor-react';
import { FormEvent, useRef } from 'react';

const Classic: React.FC = () => {
  const pokeName = useRef<HTMLInputElement>(null)

  const handleSearchFirstPokemon = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div>
      <motion.div className="mt-8 text-center">
      <h1 className="text-xl">Adivinhe qual é o Pokémon de hoje!</h1>
      <h1>Comece pesquisando por qualquer Pokémon para começar.</h1>
      <form onSubmit={handleSearchFirstPokemon} className="flex relative w-full justify-center mt-8 items-center gap-4">
        <input ref={pokeName} className="h-10 w-[60%] p-6 bg-yellow-500 rounded-lg roudend-md pl-16 font-bold outline-none " />
        <img 
          src="/pokeball.png" 
          alt="pokeball" 
          className="w-8 h-8 absolute left-[86px] top-2" 
        />
        <button type="submit">
          <PaperPlaneRight  size={32} weight="fill" color="#EAB308" className="cursor-pointer hover:scale-105 transition duration-300"/>
        </button>
      </form>

    </motion.div>
    </div>
  )
};

export default Classic;
