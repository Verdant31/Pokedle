// src/server/router/_app.ts
import { router } from "../trpc";

import { pokemon } from "./pokemon";
import { winner } from "./winner";

export const appRouter = router({
  pokemon,
  winner,
});

// export type definition of API
export type AppRouter = typeof appRouter;
