import { Pokemon } from "../@types";

export const getClues = (random: Pokemon) => {
    const nameClues = {
        firstLetter: random.name[0],
        lastLetter: random.name[random.name.length - 1],
    }
    const abilitiesClues = {
        randomAbilityOne: random.abilities[Math.floor(Math.random() * random.abilities.length)]?.name,
        randomAbilityTwo: random.abilities[Math.floor(Math.random() * random.abilities.length)]?.name,
    }
    const movesClues = {
        randomMoveOne: random.moves[Math.floor(Math.random() * random.moves.length)]?.name,
        randomMoveTwo: random.moves[Math.floor(Math.random() * random.moves.length)]?.name,
    }
    const typesClues = {
        randomType: random.types[Math.floor(Math.random() * random.types.length)]?.name,
    }
    const statsCludes = {
        hp: random.stats[0]?.baseStat,
        attack: random.stats[1]?.baseStat,
    }
    const clues = {
        nameClues,
        abilitiesClues,
        movesClues,
        typesClues,
        statsCludes
    }
    return clues;
}