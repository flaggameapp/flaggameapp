import { registerPlugin } from "@capacitor/core";
import type { FlagGamePlayGamesPlugin } from "./definitions";

const FlagGamePlayGames = registerPlugin<FlagGamePlayGamesPlugin>(
  "FlagGamePlayGames"
);

export * from "./definitions";
export { FlagGamePlayGames };
