/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Comparison, Pokemon, CommonAttributesOfComparedPokemon, CommonStatsCompare, ComparedPokemon, CommonMainAttributesCompare, CommonSecondaryAttributesCompare } from "../@types";
import {  formatMainAttributes } from "./formatMainAttributes";
import {  formatStats } from "./formatStats";
import { formatSecondaryAttributes } from "./formatSecondaryAttributes";
import { getCommonAbilities } from "./getCommonAbilities";

const isSamePokemon = (comparedPokemon: Comparison) : boolean => {
    let wins = 0;
    for (const key in comparedPokemon) {
        if(comparedPokemon[key] instanceof Array) {
            (comparedPokemon[key] as Array<CommonStatsCompare>).map(stat => stat.color === "#16a34a" ? true : false).every(v => v === true) && wins++;
        }else {
            (comparedPokemon[key] instanceof Object) && (comparedPokemon[key] as CommonAttributesOfComparedPokemon).color === "#16a34a" && wins++;
        }
    }
    return wins === 6 ? true : false;
}


export const comparePokemons = (pokemon: Pokemon, dailyPokemon: Pokemon) : ComparedPokemon  => {
    const commonAbilities = getCommonAbilities(pokemon.abilities, dailyPokemon.abilities);
    const commonMoves = getCommonAbilities(pokemon.moves, dailyPokemon.moves);
    const commonTypes = getCommonAbilities(pokemon.types, dailyPokemon.types); 

    const commonAbilitiesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.abilities, commonAbilities) 
    const commonMovesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.moves, commonMoves) 
    const commonTypesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.types, commonTypes) 
    const heightCompare : CommonSecondaryAttributesCompare = formatSecondaryAttributes(dailyPokemon.height, pokemon.height) 
    const weightCompare : CommonSecondaryAttributesCompare = formatSecondaryAttributes(dailyPokemon.weight, pokemon.weight) 

    const statsCompare : CommonStatsCompare[] = formatStats(dailyPokemon.stats, pokemon.stats);

    const comparison : Comparison = {
        abilities: commonAbilitiesFormated,
        moves: commonMovesFormated,
        types: commonTypesFormated,
        height: heightCompare,
        weight: weightCompare,
        stats: statsCompare,
        image: pokemon.image
    }
    const win = isSamePokemon(comparison);
    
    const compared : ComparedPokemon = {
        chosenPokemon: pokemon,
        comparison : {
            ...comparison,
            win
        }
    }
    return compared;
}