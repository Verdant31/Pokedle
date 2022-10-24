// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { pokeDto } from "../../../utils/pokeDto";
import { comparePokemons } from "../../../utils/comparePokemons";
import { ComparedPokemon } from "../../../@types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { pokename } = req.query;
  const { dailyPokemon } = req.body;
  if(pokename) {
    pokename = (pokename as string).charAt(0).toLowerCase() + pokename?.slice(1)
  }
  try {
    const chosenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokename}`).then(async (res) => pokeDto(res));
    const compared : ComparedPokemon = comparePokemons(chosenPokemon, dailyPokemon);
    res.status(200).json({message: 'Pokemon buscado com sucesso.', compared})
  }catch(err) {
    console.log(err);
  }
}