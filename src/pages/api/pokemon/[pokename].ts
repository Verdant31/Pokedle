// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { pokeDto } from "../../../utils/pokeDto";
import { comparePokemons } from "../../../utils/comparePokemons";
import { ComparedPokemon } from "../../../@types";
import { pokemonApi } from "../../../services/pokemonClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { pokename } = req.query;
  const { dailyPokemonId } = req.body;
  if(pokename) {
    pokename = (pokename as string).charAt(0).toLowerCase() + pokename?.slice(1)
  }
  if(!pokename) return;
  
  try {
    const dailyPokemon = await pokemonApi.getPokemonById(dailyPokemonId).then((res) => pokeDto(res))
    const chosenPokemon = await pokemonApi.getPokemonByName(pokename).then((res) => pokeDto(res))

    const compared : ComparedPokemon = comparePokemons(chosenPokemon, dailyPokemon);
    res.status(200).json({message: 'Pokemon buscado com sucesso.', compared})
  }catch(err) {
    console.log(err);
  }
}