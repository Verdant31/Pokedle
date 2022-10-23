import { Pokemon } from "../@types";
import { CommonMainAttributesCompare, formatMainAttributes } from "./formatMainAttributes";
import { CommonStatsCompare, formatStats } from "./formatStats";
import { CommonSecondaryAttributesCompare, formatSecondaryAttributes } from "./formatSecondaryAttributes";
import { getCommonAbilities } from "./getCommonAbilities";

type CommonAttributesOfComparedPokemon = {
    message: string,
    color: string
}

export type ComparedPokemons =  {
    [key: string]: CommonMainAttributesCompare | CommonSecondaryAttributesCompare | CommonStatsCompare[] | boolean | undefined; 
    abilities: CommonMainAttributesCompare;
    moves: CommonMainAttributesCompare;
    types: CommonMainAttributesCompare;

    stats: CommonStatsCompare[];

    height: CommonSecondaryAttributesCompare;
    weight: CommonSecondaryAttributesCompare;

    win?: boolean;
}


const isSamePokemon = (comparedPokemon: ComparedPokemons) : boolean => {
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


export const comparePokemons = (pokemon: Pokemon, dailyPokemon: Pokemon) : ComparedPokemons  => {
    const commonAbilities = getCommonAbilities(pokemon.abilities, dailyPokemon.abilities);
    const commonMoves = getCommonAbilities(pokemon.moves, dailyPokemon.moves);
    const commonTypes = getCommonAbilities(pokemon.types, dailyPokemon.types); 

    const commonAbilitiesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.abilities, commonAbilities) 
    const commonMovesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.moves, commonMoves) 
    const commonTypesFormated : CommonMainAttributesCompare = formatMainAttributes(dailyPokemon.types, commonTypes) 
    const heightCompare : CommonSecondaryAttributesCompare = formatSecondaryAttributes(dailyPokemon.height, pokemon.height) 
    const weightCompare : CommonSecondaryAttributesCompare = formatSecondaryAttributes(dailyPokemon.weight, pokemon.weight) 

    const statsCompare : CommonStatsCompare[] = formatStats(dailyPokemon.stats, pokemon.stats);
    
    const compared : ComparedPokemons = {
        abilities: commonAbilitiesFormated,
        moves: commonMovesFormated,
        types: commonTypesFormated,
        height: heightCompare,
        weight: weightCompare,
        stats: statsCompare
    }
    const win = isSamePokemon(compared);
    
    return {...compared, win }
}