import axios from "axios";
import { ComparedPokemon, Pokemon } from "../../../@types";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { pokeDto } from "../../../utils/pokeDto";
import { prisma } from "../../db/client";
import { pokemonApi } from "../../../services/pokemonClient";
import { api } from "../../../services/api";

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
    .input(z.object({ id: z.number()}))
    .query(async ({input}) => {
      const pokemon : Pokemon = await pokemonApi.getPokemonById(input.id).then((res) => pokeDto(res));
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
    }),
  getPreviousData: publicProcedure
  .input(z.object({ pokemons: z.array(z.string()), dailyPokemonId: z.number()}))
  .query(async ({input}) => {
      const comparedPokemons =  await api.post("/pokemon/pokemons", {
        dailyPokemonId: input.dailyPokemonId, 
        pokemons: input.pokemons
      }).then((res) => {
        return res.data.result
      });
      return comparedPokemons;
  }),
  getRandomPokemon: publicProcedure
    .query(async () => {
      const randomPokemonId = Math.floor(Math.random() * 898) + 1;
      const pokemon : Pokemon = await pokemonApi.getPokemonById(randomPokemonId).then((res) => pokeDto(res));
      return pokemon;
    })
});
