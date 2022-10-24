import type { AbilityResponse, MoveRsponse, Pokemon, Stat, StatRes, TypeResponse } from "../@types";

const isStats = (statsName: string) => {
    if(statsName === "hp") {
        return true
    }else if(statsName === "attack") {
        return true;
    }else if(statsName === "speed") {
        return true
    }else return false
}

const returnStats = (stat: StatRes) : Stat | false => {
    if(isStats(stat.stat.name)) {
        return {
            baseStat: stat.base_stat, effort: stat.effort, name: stat.stat.name
        }
    }else {
        return false
    }
}
import { Pokemon as TSPokemon } from 'pokenode-ts/dist/index';

export const pokeDto = (data: TSPokemon) : Pokemon => {
    return {
        abilities: data.abilities.map((ability: AbilityResponse) => ({name: ability.ability.name, url: ability.ability.url})),
        height: data.height,
        weight: data.weight,
        name: data.name,
        id: data.id,
        image: data.sprites.front_default ? data.sprites.front_default : "",
        types: data.types.map((type: TypeResponse) => ({name: type.type.name, url: type.type.url})),
        stats: data.stats.map((stats : StatRes) => isStats(stats.stat.name) ? returnStats(stats) : false).filter((stat: Stat | false) => stat !== false),
        locationAreaEncounters: data.location_area_encounters,
        moves: data.moves.map((move: MoveRsponse) => ({name: move.move.name, url: move.move.url})),
    }
}
// 