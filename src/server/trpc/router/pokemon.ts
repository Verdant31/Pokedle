import axios from "axios";
import { Pokemon, PokemonPreview } from "../../../@types";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { pokeDto } from "../../../utils/pokeDto";
import { api } from "../../../services/api";
import { prisma } from "../../db/client";

export const pokemon = router({
  getDailyHits: publicProcedure
    .query(async () => {
    const { dailyHits } = await api.get("/pokemon/getdailyhits").then((res) => res.data);
    return dailyHits;
  }),
  getAllPokemons: publicProcedure
    .query(async () => {
    const pokemons : PokemonPreview[] = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
      .then((res) =>  (res.data.results.map((pokemon: ResultPoke) => ({
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
      }))))
      return pokemons;
  }),
  getPokemon: publicProcedure
    .input(z.object({ name: z.string()}))
    .query(async ({input}) => {
      const pokemon : Pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input.name}`).then((res) => {
        return pokeDto(res.data);
      });
      return pokemon;
    }),
  getDailyPokemon: publicProcedure
    .query(async () => {
      return await prisma.dailyPokemon.findFirst();
     
    }),
  getDreamWorldImage: publicProcedure
    .input(z.object({ name: z.string()}))
    .query(async ({input}) => {
      const image : string = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input.name}`).then((res) => {
        return res.data.sprites.other.dream_world.front_default;
      });
      return image;
    })
});

type ResultPoke = {
  name: string;
  url: string;
}
