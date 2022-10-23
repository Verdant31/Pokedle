import { AxiosResponse } from "axios";
import { AbilityResponse, MoveRsponse, Pokemon, Stat, TypeResponse } from "../@types";

export const pokeDto = (res: AxiosResponse<any, any>) : Pokemon => {
    const data = res.data;
    return {
        abilities: data.abilities.map((ability: AbilityResponse) => ({name: ability.ability.name, url: ability.ability.url})),
        height: data.height,
        weight: data.weight,
        name: data.name,
        id: data.id,
        image: data.sprites.front_default,
        types: data.types.map((type: TypeResponse) => ({name: type.type.name, url: type.type.url})),
        stats: data.stats.map((stat: Stat) => ({baseStat: stat.base_stat, effort: stat.effort, stat: {name: stat.stat.name, url: stat.stat.url}})),
        locationAreaEncounters: data.location_area_encounters,
        moves: data.moves.map((move: MoveRsponse) => ({name: move.move.name, url: move.move.url})),
    }
}