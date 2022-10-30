/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import { LightbulbFilament, PaperPlaneRight } from 'phosphor-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import CardTitle from '../components/CardTitle';
import Header from '../components/Header';
import { trpc } from '../utils/trpc';
import Image from 'next/image';
import { pokemonApi } from '../services/pokemonClient';
import { pokeDto } from '../utils/pokeDto';
import { getClues } from '../utils/getClues';
import { GetServerSideProps } from 'next';
import { AbilitiesClues, MovesClues, NameClues, Pokemon, StatsClues, TypesClues } from '../@types';
import Clue from '../components/Clue';
import WinnerCardFindOut from '../components/WinnerCardFindOut';


type ComparedPokemon = {
    chosenPokemonPreview: {
        name: string;
        image: string;
    }
    win: boolean;
}

export type Clue =  {
    type: string | undefined;
    clue: NameClues | AbilitiesClues | StatsClues | TypesClues |  MovesClues;
}

interface FindOutProps {
    clues: Clue[];
    randomPokemon: Pokemon;
}

const FindOut: React.FC<FindOutProps> = ({clues, randomPokemon}) => {
    const [ userWon, setUserWon ] = useState(false);
    const [ serverClues, setServerClues ] = useState<Clue[]>(clues)
    const [ pokeName, setPokeName ] = useState('')
    const [ comparedPokemons, setComparedPokemons ] = useState<ComparedPokemon[]>([]);
    const [ userClues, setUserClues ] = useState<Clue[]>([]);

    useEffect(() => {
        if(comparedPokemons.find((compared) => compared.win)) {
            setUserWon(true)
            setTimeout(() => document.getElementById('winnercardfindout')?.scrollIntoView({ behavior: 'smooth'}), 1500)
        }
    }, [comparedPokemons])
    const handleSearchFirstPokemon = useCallback(async (e: FormEvent) => {
        e.preventDefault()
        if(pokeName.length > 0 && randomPokemon) {
            const chosen = await pokemonApi.getPokemonByName(pokeName.toLocaleLowerCase()).then((res) => pokeDto(res));
            setComparedPokemons([...comparedPokemons, {
                chosenPokemonPreview: {
                    name: pokeName.toLowerCase(),
                    image: chosen.image
                },
                win: pokeName.toLowerCase() === randomPokemon.name,
            }])
            setPokeName('');
        }
    },[comparedPokemons, pokeName, randomPokemon])

    const pokemonAlreadyCompared = (pokemonName: string) => {
        return comparedPokemons.filter((compared) => (
           compared.chosenPokemonPreview.name.charAt(0).toUpperCase() + compared.chosenPokemonPreview.name.slice(1)) === pokemonName
        ).length > 0
      }

    const handleGetClue = () => {
        if(userClues.length === serverClues.length) return;
        const randomIndex = Math.floor(Math.random() * serverClues.length);
        const randomClue = serverClues[randomIndex];
        if(randomClue && !userClues.find(clue => clue.type === randomClue.type)) {
            setUserClues(oldState=> [...oldState, randomClue]);
            setServerClues(oldState => oldState.filter(clue => clue.type !== randomClue.type));
        }
    }

    const pokemons = trpc.pokemon.getAllPokemons.useQuery();
    const filteredPokemons = pokemons?.data?.filter((pokemon) => pokemon.name.includes(pokeName.charAt(0).toUpperCase() + pokeName.slice(1)) 
    && pokemonAlreadyCompared(pokemon.name) === false)
    
    const animation = {
        initial: {opacity: 0, scale: 0.5},
        transition: { delay: 0.5 },
        animate: {opacity: 1, scale: 1}
    }
    return (
        <div className="flex flex-col items-center h-screen scrollbar-track-zinc-700  scrollbar-thumb-yellow-500">
            <Header />
            <div>
                <div className="sticky text-center h-full mb-24 items-center justify-center flex flex-col -mt-[12px] ">
                    <h1 className="text-xl">Guess the Pokemon!!</h1>
                    <h1>Type any Pokemon to begin.</h1>
                    <button 
                        onClick={handleGetClue} 
                        className={`mt-2 flex justify-center items-center mx-auto gap-2 p-[12px] px-[14px] rounded-md 
                        ${clues.length === userClues.length ? "cursor-not-allowed" : ""}`}
                    >
                        <p className="text-lg font-semibold text-yellow-500 ">Get clue</p>
                        <LightbulbFilament size={24} weight="fill" color="#eab308"  />
                    </button>
                    <div className="mt-2" />
                    {userClues.length > 0 && (
                        <>
                            <span>Your clues (think wisely)...</span>
                            <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center md:mt-2 md:gap-y-0 max-w-2xl">
                                {userClues.map((clue) => (
                                    <Clue clue={clue} key={clue.type} />
                                ))}
                            </div>
                        </>
                    )}
                    <form  onSubmit={handleSearchFirstPokemon} className="flex relative w-[230px] lg:w-[490px]  justify-center mt-8 items-center ">
                        <div>
                        <input 
                            value={pokeName} 
                            autoComplete='false' 
                            onChange={(e) => setPokeName(e.target.value)} 
                            list="pokemons" 
                            className={`h-10 w-full lg:w-[380px] p-6 bg-yellow-500 rounded-lg roudend-md pl-16 font-bold outline-none`} 
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
                    <div className=" w-[300px] xsm:w-[350px] halfmd:w-[440px] sm:w-[540px] md:w-[650px] lg:w-[900px] pb-12 overflow-x-scroll scrollbar scrollbar-track-zinc-700  scrollbar-thumb-yellow-500">
                        <div className="flex w-full flex-col items-center ">
                            <div className="flex gap-x-8 mt-8 w-full justify-center">
                                <CardTitle>Pokemon</CardTitle>
                                <CardTitle>Name</CardTitle>
                            </div>
                            {comparedPokemons.slice(0).reverse().map((compared) => (
                                <div className="flex gap-x-8" key={compared.chosenPokemonPreview.name}>
                                    <motion.div {...animation} >
                                        <div className="h-24 w-24 flex items-center justify-end">
                                            <Image src={compared.chosenPokemonPreview.image} height={900} width={900} alt="Picture of chosen pokemon" />
                                        </div>
                                    </motion.div>
                                    <motion.div style={{backgroundColor: compared.win ? "#16a34a" : "#dc2626"}}   {...animation} className="w-24 h-20" >
                                        <div className={`h-20 w-24 flex items-center justify-center `}>
                                            <p className="text-white text-xs font-semibold">{compared.chosenPokemonPreview.name}</p>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {randomPokemon && userWon && (
                <WinnerCardFindOut randomPokemon={randomPokemon} />
            )}
        </div>
    );
};

export default FindOut;

export const getServerSideProps : GetServerSideProps = async () => {
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    const randomPokemon : Pokemon = await pokemonApi.getPokemonById(randomPokemonId).then((res) => pokeDto(res));
    const clues = getClues(randomPokemon)
    return {
        props: {
            clues,
            randomPokemon
        }
    }
}
