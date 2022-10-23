import { Pokemon } from "../@types";
import { CommonMainAttributesCompare, formatMainAttributes } from "./formatMainAttributes";
import { formatStats } from "./formatStats";
import { CommonSecondaryAttributesCompare, formatSecondaryAttributes } from "./formatSecondaryAttributes";
import { getCommonAbilities } from "./getCommonAbilities";

export type ComparedPokemons =  {
    abilities: CommonMainAttributesCompare;
    moves: CommonMainAttributesCompare;
    types: CommonMainAttributesCompare;

    height: CommonSecondaryAttributesCompare;
    weight: CommonSecondaryAttributesCompare;
}

export const comparePokemons = (pokemon: Pokemon, dailyPokemon: Pokemon) : ComparedPokemons  => {
    const commonAbilities = getCommonAbilities(pokemon.abilities, dailyPokemon.abilities);
    const commonMoves = getCommonAbilities(pokemon.moves, dailyPokemon.moves);
    const commonTypes = getCommonAbilities(pokemon.types, dailyPokemon.types); 

    const commonAbilitiesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.abilities, commonAbilities) 
    const commonMovesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.moves, commonMoves) 
    const commonTypesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.types, commonTypes) 
    const heightCompare : CommonSecondaryAttributesCompare = formatSecondaryAttributes(dailyPokemon.height, pokemon.height) 
    const weightCompare : CommonSecondaryAttributesCompare = formatSecondaryAttributes(dailyPokemon.weight, pokemon.weight) 

    const statsCompare = formatStats(dailyPokemon.stats, pokemon.stats);

    const compared : ComparedPokemons = {
        abilities: commonAbilitiesFormated,
        moves: commonMovesFormated,
        types: commonTypesFormated,
        height: heightCompare,
        weight: weightCompare,
    }
    return compared
}