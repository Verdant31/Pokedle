import { Pokemon } from "../@types";

export const getRandomIndex = (max: number, notThisOne?: number) : number => {
    const random = Math.floor(Math.random() * max-1) + 1;
    if (random !== notThisOne) return random;
    return getRandomIndex(max, notThisOne);
}

export const getClues = (random: Pokemon) => {
    const firstRandomAbilitieIndex = getRandomIndex(random.abilities.length);
    const secondRandomAbilitieIndex = getRandomIndex(random.abilities.length, firstRandomAbilitieIndex);
    const firstRandomMoveIndex = getRandomIndex(random.moves.length);
    const secondRandomMoveIndex = getRandomIndex(random.moves.length, firstRandomMoveIndex);

    const nameClues = {
        type: 'nameClues',
        clue: {
            firstLetter: random.name[0],
            lastLetter: random.name[random.name.length - 1],
        }

    }
    const abilitiesClues = {
        type: 'abilitiesClues',
        clue: {
            randomAbilityOne: random.abilities[firstRandomAbilitieIndex]?.name,
            randomAbilityTwo: random.abilities.length > 1 ? random.abilities[secondRandomAbilitieIndex]?.name : null,
        }
    }
    const movesClues = {
        type: 'movesClues',
        clue: {
            randomMoveOne: random.moves[firstRandomMoveIndex]?.name,
            randomMoveTwo: random.moves.length > 1 ? random.moves[secondRandomMoveIndex]?.name : null,
        }

    }
    const typesClues = {
        type: 'typesClues',
        clue: {
            randomType: random.types[Math.floor(Math.random() * random.types.length)]?.name,
        }
    }
    const statsCludes = {
        type: 'statsCludes',
        clue: {
            hp: random.stats[0]?.baseStat,
            attack: random.stats[1]?.baseStat,
        }
    }
    const clues = [
        nameClues,
        abilitiesClues,
        movesClues,
        typesClues,
        statsCludes
    ]
    return clues;
}