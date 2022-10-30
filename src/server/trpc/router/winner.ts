
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { api } from "../../../services/api";
import { prisma } from "../../db/client";
import { DailyPokemon } from "@prisma/client";
import { pokemonApi } from "../../../services/pokemonClient";
import { diffDates, MyDate } from "../../../utils/diffDates";

type WinnerProps = {
    dailyHitsCount: number;
    dailyPokemon: DailyPokemon | null;
    image: string | null;
    date: MyDate | undefined;
}

export const winner = router({
  getWinnerProps: publicProcedure
    .input(z.object({ name: z.string()}))
    .query(async ({input}) => {
      const { dailyHits } = await api.get("/pokemon/getdailyhits").then((res) => res.data);
      const image = await pokemonApi.getPokemonByName(input.name).then((res) => res.sprites.front_default);
      const dailyPokemon = await prisma.dailyPokemon.findFirst();

      const lastUpdatedDate = dailyPokemon?.lastUpdate
      const newPokemonAt = lastUpdatedDate?.setDate(lastUpdatedDate.getDate() + 1);
      const now = new Date().getTime();
      const date = diffDates(newPokemonAt, now)

      const winnerProps : WinnerProps = {
          dailyHitsCount: dailyHits.hits,
          dailyPokemon,
          image,
          date
      }
      return winnerProps;
  }),
});


