// src/server/router/_app.ts
import { router } from "../trpc";

import { pokemon } from "./pokemon";

export const appRouter = router({
  pokemon,
});

// export type definition of API
export type AppRouter = typeof appRouter;
