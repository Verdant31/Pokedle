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
