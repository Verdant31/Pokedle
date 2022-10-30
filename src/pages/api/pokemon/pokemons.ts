// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pokeDto } from "../../../utils/pokeDto";
import { comparePokemons } from "../../../utils/comparePokemons";
import { ComparedPokemon } from "../../../@types";
import { pokemonApi } from "../../../services/pokemonClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dailyPokemonId, pokemons } = req.body;
  const comparedPokemons : ComparedPokemon[] = [];

  try {
    const dailyPokemon = await pokemonApi.getPokemonById(dailyPokemonId).then((res) => pokeDto(res))

    const myFunction = async ( ) => {
      return new Promise(async (resolve) => {
        await pokemons.forEach(async (pokemon: string) => {
          const pokemonData = await pokemonApi.getPokemonByName(pokemon).then((res) => pokeDto(res));
          const comparedPokemon = comparePokemons(pokemonData, dailyPokemon);
          comparedPokemons.push(comparedPokemon);
            if(pokemons.length === comparedPokemons.length) {
              resolve(comparedPokemons);
            }
        });
      })
    }
    if(pokemons.length > 0) {
      myFunction().then((result) => {
        res.status(200).json({message: 'Pokemon buscado com sucesso.', result})
      })
    }else {
        res.status(200).json({message: 'Pokemon buscado com sucesso.', result: []})
    }
  }catch(err) {
    console.log(err);
  }
}