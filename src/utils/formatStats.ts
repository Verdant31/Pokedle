import { Ability, Move, Stat, Type } from "../@types";

export type CommonMainAttributesCompare = {
    attributes: Ability[] | Move[] | Type[],
    message: string
    color: string
}

export const formatStats = ( 
    dailyPokemon: Stat[],
    chosenPokemon: Stat[]   
) => {
    console.log(dailyPokemon);
    console.log(chosenPokemon);
}

