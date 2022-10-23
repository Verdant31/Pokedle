export type Pokemon = {
    name: string;
    abilities: Ability[];
    height: number;
    weight: number;
    id: number;
    locationAreaEncounters: string;
    moves: Move[];
    image: string;
    stats: Stat[];
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