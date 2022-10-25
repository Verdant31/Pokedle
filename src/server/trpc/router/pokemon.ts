import axios from "axios";
import { Pokemon } from "../../../@types";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { pokeDto } from "../../../utils/pokeDto";
import { prisma } from "../../db/client";
import { pokemonApi } from "../../../services/pokemonClient";

export const pokemon = router({
  getDailyHits: publicProcedure
    .query(async () => {
    const dailyHits = prisma.dailyHits.findFirst({where: {id: "6356ed31e23edc53d5635caf"}});
    return dailyHits;
  }),
  getAllPokemons: publicProcedure
    .query(async () => {
      const pokemons = await pokemonApi.listPokemons(0, 1000).then((res => {
        return res.results.map((pokemon) => ({
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
        }));
      }));
      return pokemons;
  }),
  getPokemon: publicProcedure
    .input(z.object({ name: z.string()}))
    .query(async ({input}) => {
      const pokemon : Pokemon = await pokemonApi.getPokemonByName(input.name).then((res) => pokeDto(res));
      return pokemon;
    }),
  getDailyPokemon: publicProcedure
    .query(async () => {
      return await prisma.dailyPokemon.findFirst({where: {id: "6356ed31e23edc53d5635caf"}});
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
