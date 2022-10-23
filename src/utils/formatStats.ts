import type  { CommonStatsCompare, Stat } from "../@types";



export const formatStats = ( 
    dailyPokemonStats: Stat[],
    chosenPokemonStats: Stat[]   
) : CommonStatsCompare[] => {
    return chosenPokemonStats.map((chosenPokemonStat) => {
        const dailyPokemonStat = dailyPokemonStats.find((dailyPokemonStat) => dailyPokemonStat.name === chosenPokemonStat.name);
        if(dailyPokemonStat) {
            const attributes = chosenPokemonStat.baseStat;
            const message = dailyPokemonStat.baseStat - chosenPokemonStat.baseStat === 0 ? 'Equals' : dailyPokemonStat.baseStat - chosenPokemonStat.baseStat > 0 ? 'Higher' : 'Less';
            const color = dailyPokemonStat.baseStat - chosenPokemonStat.baseStat === 0 ? '#16a34a' : dailyPokemonStat.baseStat - chosenPokemonStat.baseStat > 0 ? '#d97706' : '#d97706';
            return {
                name: chosenPokemonStat.name,
                attributes,
                message,
                color
            }
        }else {
            return {
                name: "",
                attributes: 0,
                message: "",
                color: ""
            }
        }
    });
}

