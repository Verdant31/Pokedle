// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios';
import { pokeDto } from "../../../utils/pokeDto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { pokename } = req.query;
  if(pokename) {
    pokename = (pokename as string).charAt(0).toLowerCase() + pokename?.slice(1)
  }
  try {
    const chosenPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokename}`).then(async (res) => pokeDto(res));
    res.status(200).json({message: 'Pokemon buscado com sucesso.', chosenPokemon})
  }catch(err) {
    console.log(err);
  }
}