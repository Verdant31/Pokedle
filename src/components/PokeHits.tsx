import Image from 'next/image';
import { CaretDoubleLeft, CaretDoubleRight, Equals } from 'phosphor-react';
import { motion } from 'framer-motion';
import type { ComparedPokemon } from '../@types';
interface IPokeHitsProps {
    compared: ComparedPokemon;
    onAnimationComplete: () => void;
    userAlreadyWon: boolean;
}

const PokeHits: React.FunctionComponent<IPokeHitsProps> = ({compared, onAnimationComplete, userAlreadyWon}) => {
    console.log(compared.comparison.height.message);
    const animate = (transition: number) => {
        if(userAlreadyWon) {
            return;
        }
        else {
            return {
                initial: {opacity: 0, scale: 0.5},
                transition: { delay: transition },
                animate: {opacity: 1, scale: 1}
            }
        }
        
    }
    const animationCompleted = (index: number) => {
        if(compared.comparison.win) {
            if(index == 3) {
                onAnimationComplete()
                setTimeout(() => document.getElementById('winnercard')?.scrollIntoView({ behavior: 'smooth'}), 500)
                
            }   
        }
    }

    return (
    <div className="flex w-full gap-x-2">
        <motion.div  {...animate(0.2)}>
            <div className="h-24 w-24 flex items-center justify-end">
                <Image src={compared.chosenPokemon.image} height={900} width={900} alt="Picture of chosen pokemon" />
            </div>
        </motion.div>
        <motion.div  className="w-24"{...animate(1)} >
            <div style={{backgroundColor: compared.comparison.abilities.color}} className={`h-20 w-24 flex items-center justify-center `}>
                {compared.comparison.abilities.message === "None" 
                    ? <p className="text-white text-xs font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col">
                            {compared.comparison.abilities.attributes.map((ability) => (
                                <p  key={ability.name} className="text-white text-xs font-semibold " >{ability.name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </motion.div>

        <motion.div {...animate(1.5)} className="">
            <div style={{backgroundColor: compared.comparison.moves.color}} className={`h-20  w-24 flex items-center justify-center`}>
                {compared.comparison.moves.message === "None" 
                    ? <p className="text-white text-xs font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col">
                            <p className="text-white p-2 text-xs font-semibold " >{compared.chosenPokemon.moves.length} moves ({compared.comparison.moves.attributes.length} in common)</p>
                        </div>
                    )
                }
            </div>
        </motion.div>
        <motion.div {...animate(2.0)}className="w-24 ">
            <div style={{backgroundColor: compared.comparison.types.color}} className={`h-20 w-24 flex items-center justify-center `}>
                {compared.comparison.types.message === "None" 
                    ? <p className="text-white text-xs font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col ">
                            {compared.comparison.types.attributes.map((type) => (
                                <p  key={type.name} className=" text-white text-base font-semibold capitalize" >{type.name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </motion.div>
        <motion.div {...animate(2.5)} className="w-24">
            <div style={{backgroundColor: compared.comparison.weight.color}} className={`h-20 w-24 flex items-center justify-center `}>
                <div className="flex flex-col space-y-2 items-center">
                    {compared.comparison.weight.message === "Less" && (<CaretDoubleLeft size={32} />)}
                    {compared.comparison.weight.message === "Higher" && (<CaretDoubleRight size={32} />)}
                    {compared.comparison.weight.message === "Equal" && (<Equals size={32} />)}
                    <p className="text-white text-xs font-semibold " >{(compared.comparison.weight.attributes/10).toFixed(1)}kg</p>
                </div>
            </div>
        </motion.div>
        <motion.div {...animate(3)} className="w-24 ">
            <div  style={{backgroundColor: compared.comparison.height.color}} className={`h-20 w-24 flex items-center justify-center `}>
                <div className="flex flex-col space-y-2">
                    {compared.comparison.height.message === "Less" && (<CaretDoubleLeft size={32} />)}
                    {compared.comparison.height.message === "Higher" && (<CaretDoubleRight size={32} />)}
                    {compared.comparison.height.message === "Equal" && (<Equals size={32} />)}
                    <p className="text-white text-xs font-semibold " >{(compared.comparison.height.attributes/10).toFixed(1)}m</p>
                </div>
            </div>
        </motion.div>
        {compared.comparison.stats.map((stat, index) => (
            <motion.div onAnimationComplete={() => animationCompleted(index)} {...animate(3.5 + index++/1.7)} className="w-24" key={stat.name}>
                <div  style={{backgroundColor: stat.color}} className={`h-20 w-24 flex items-center justify-center `}>
                    <div className="flex flex-col space-y-2">
                        {stat.message === "Less" && (<CaretDoubleLeft size={32} />)}
                        {stat.message === "Higher" && (<CaretDoubleRight size={32} />)}
                        {stat.message === "Equal" && (<Equals size={32} />)}
                        <p className="text-white text-xs font-semibold " >{stat.attributes}</p>
                    </div>
                </div>
            </motion.div>
        ))}
        
    </div>
  )
};

export default PokeHits;
