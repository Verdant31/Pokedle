export type CommonSecondaryAttributesCompare = {
    attributes: number,
    message: string,
    color: string
}


export const formatSecondaryAttributes = (    
    dailyPokemonAttribute: number,
    chosenPokemonAttribute: number, 
) : CommonSecondaryAttributesCompare  => {
    if(chosenPokemonAttribute > dailyPokemonAttribute) {
        return {
            attributes: chosenPokemonAttribute,
            message: "Less",
            color: "#d97706"

        }
    }else if(chosenPokemonAttribute < dailyPokemonAttribute) {
        return {
            attributes: chosenPokemonAttribute,
            message: "Higher",
            color: "#d97706"
        }
    }else  {
        return {
            attributes: chosenPokemonAttribute,
            message: "Equal",
            color: "#16a34a"
        }
    }
}

// const heightCompare : CommonHeightCompare = pokemon.height > dailyPokemon.height ? {
//     height: pokemon.height,
//     comparison: "Less",
//     color: "#d97706"
// } : pokemon.height < dailyPokemon.height ? {
//     height: pokemon.height,
//     comparison: "Higher",
//     color: "#d97706"
// } : {
//     height: pokemon.height,
//     comparison: "Equal",
//     color: "#16a34a"
// }

