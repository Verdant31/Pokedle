import type { Ability, Move, Type } from "../@types";

export const getCommonAbilities = (
    firstPokemonAbilities: Ability[] | Move[] | Type[], 
    secondPokemonAbilities: Ability[] | Move[] | Type[]
) => {
    const firstAbilities = firstPokemonAbilities.map((ability) => ability.name);
    const secondAbilities = secondPokemonAbilities.map((ability) => ability.name);
    const abilities = firstAbilities.filter((ability) => secondAbilities.includes(ability));

    const commonAbilities = firstPokemonAbilities.filter((ability) => abilities.includes(ability.name));
    return commonAbilities;
}