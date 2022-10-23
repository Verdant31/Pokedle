import type { Ability, CommonMainAttributesCompare, Move, Type } from "../@types";


export const formatMainAttributes = (    
    dailyPokemonAttributes: Ability[] | Move[] | Type[],
    commonMainAttributes: Ability[] | Move[] | Type[], 
) : CommonMainAttributesCompare  => {
    if(commonMainAttributes.length === 0) {
        return {
            attributes: [],
            message: "None",
            color: "#dc2626"
        }
    }else if(commonMainAttributes.length < dailyPokemonAttributes.length) {
        return {
            attributes: commonMainAttributes,
            message: "Some in common",
            color: "#d97706"
        }
    }else {
        return {
            attributes: commonMainAttributes,
            message: "All in common",
            color: "#16a34a"            
        }
    }

}

