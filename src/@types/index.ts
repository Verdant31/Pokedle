/* eslint-disable @typescript-eslint/no-explicit-any */
export type CommonAttributesOfComparedPokemon = {
    message: string,
    color: string
}

export type CommonMainAttributesCompare = {
    attributes: Ability[] | Move[] | Type[],
    message: string
    color: string
}
export type CommonSecondaryAttributesCompare = {
    attributes: number,
    message: string,
    color: string
}
export type CommonStatsCompare  = {
    name: string;
    attributes: number,
    message: string
    color: string
}
export type Comparison = {
    [key: string]: any; 
    abilities: CommonMainAttributesCompare;
    moves: CommonMainAttributesCompare;
    types: CommonMainAttributesCompare;
    stats: CommonStatsCompare[];
    height: CommonSecondaryAttributesCompare;
    weight: CommonSecondaryAttributesCompare;

    image: string;
    win?: boolean;
}   

export type ComparedPokemon =  {
    [key: string]: any; 
    chosenPokemon: Pokemon;
    comparison: Comparison;
}

export type Pokemon = {
    name: string;
    abilities: Ability[];
    height: number;
    weight: number;
    id: number;
    locationAreaEncounters: string;
    moves: Move[];
    image: string;
    stats: Stat[] | any;
    types: Type[];
}

export type Type = {
    name: string;
    url: string
}

export type StatRes = {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}
export type Stat = {
    baseStat: number;
    effort: number;
    name: string;
}
export type Move = {
    name: string;
    url: string;
}

export type Ability = {
    name: string
    url: string
}

export type LocationArea = {
    locationArea: {
        name: string
        url: string
    }
}

export type TypeResponse = {
    slot: number;
    type: Type;
}

export type AbilityResponse = {
    ability: Ability;
}

export type MoveRsponse = {
    move: Move;
}

export type PokemonPreview = {
    name: string;
}