
import axios from "axios";
import { Pokemon, PokemonPreview } from "../../../@types";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { pokeDto } from "../../../utils/pokeDto";
import { api } from "../../../services/api";
import { prisma } from "../../db/client";
import { DailyPokemon } from "@prisma/client";

import { format, formatDistance, formatRelative, subDays } from 'date-fns'

type WinnerProps = {
    dailyHitsCount: number;
    dailyPokemon: DailyPokemon | null;
    image: string;
}

export const winner = router({
  getWinnerProps: publicProcedure
    .input(z.object({ name: z.string()}))
    .query(async ({input}) => {
        const { dailyHits } = await api.get("/pokemon/getdailyhits").then((res) => res.data);
        const image : string = await axios.get(`https://pokeapi.co/api/v2/pokemon/${input.name}`).then((res) => {
            return res.data.sprites.other.dream_world.front_default;
        });
        const dailyPokemon = await prisma.dailyPokemon.findFirst();
        const winnerProps : WinnerProps = {
            dailyHitsCount: dailyHits.hits,
            dailyPokemon,
            image
        }
        return winnerProps;
  }),
});


