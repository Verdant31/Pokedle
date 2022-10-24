import Image from 'next/image';
import { CaretDoubleLeft, CaretDoubleRight, Equals } from 'phosphor-react';
import { motion } from 'framer-motion';
import type { ComparedPokemon } from '../@types';
import { useUser } from '../context/UserContext';
interface IPokeHitsProps {
    compared: ComparedPokemon;
}

const PokeHits: React.FunctionComponent<IPokeHitsProps> = ({compared}) => {
    const { updateUser } = useUser();
    const animate = (transition: number) => ({
        initial: {opacity: 0, scale: 0.5},
        transition: { delay: transition },
        animate: {opacity: 1, scale: 1}
    })
    const animationCompleted = (index: number) => {
        if(compared.comparison.win) {
            updateUser()
            if(index == 2) {
                document.getElementById('winnercard')?.scrollIntoView({ behavior: 'smooth'})
            }   
        }
    }

    return (
    <div className="flex justify-center relative gap-x-2">
        <motion.div className="w-28" {...animate(0.3)}>
            <div className="h-24 w-full flex items-center justify-end">
                <Image src={compared.chosenPokemon.image} height={900} width={900} alt="Picture of chosen pokemon" />
            </div>
        </motion.div>
        <motion.div  className="w-24"{...animate(0.5)} >
            <div style={{backgroundColor: compared.comparison.abilities.color}} className={`h-20 w-full flex items-center justify-center `}>
                {compared.comparison.abilities.message === "None" 
                    ? <p className="text-white text-sm font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col">
                            {compared.comparison.abilities.attributes.map((ability) => (
                                <p  key={ability.name} className="text-white text-sm font-semibold " >{ability.name}</p>
                            ))}
                        </div>
                    )
                }
            </div>
        </motion.div>

        <motion.div {...animate(0.7)} className="w-24 ">
            <div style={{backgroundColor: compared.comparison.moves.color}} className={`h-20  w-full flex items-center justify-center`}>
                {compared.comparison.moves.message === "None" 
                    ? <p className="text-white text-sm font-semibold">None in common</p>
                    : (
                        <div className="flex flex-col">
                            <p className="text-white p-2 text-sm font-semibold " >{compared.chosenPokemon.moves.length} moves ({compared.comparison.moves.attributes.length} in common)</p>
                        </div>
                    )
                }
            </div>
        </motion.div>
        <motion.div {...animate(0.9)}className="w-24 ">
            <div style={{backgroundColor: compared.comparison.types.color}} className={`h-20 w-full flex items-center justify-center `}>
                {compared.comparison.types.message === "None" 
                    ? <p className="text-white text-sm font-semibold">None in common</p>
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
        <motion.div {...animate(1.1)} className="w-24 ">
            <div style={{backgroundColor: compared.comparison.weight.color}} className={`h-20 w-full flex items-center justify-center `}>
                <div className="flex flex-col space-y-2 items-center">
                    {compared.comparison.weight.message === "Less" && (<CaretDoubleLeft size={32} />)}
                    {compared.comparison.weight.message === "Higher" && (<CaretDoubleRight size={32} />)}
                    {compared.comparison.weight.message === "Equals" && (<Equals size={32} />)}
                    <p className="text-white text-sm font-semibold " >{compared.comparison.weight.attributes}kg</p>
                </div>
            </div>
        </motion.div>
        <motion.div {...animate(1.3)} className="w-24 ">
            <div  style={{backgroundColor: compared.comparison.height.color}} className={`h-20 w-full flex items-center justify-center `}>
                <div className="flex flex-col space-y-2">
                    {compared.comparison.height.message === "Less" && (<CaretDoubleLeft size={32} />)}
                    {compared.comparison.height.message === "Higher" && (<CaretDoubleRight size={32} />)}
                    {compared.comparison.height.message === "Equals" && (<Equals size={32} />)}
                    <p className="text-white text-sm font-semibold " >{compared.comparison.height.attributes}m</p>
                </div>
            </div>
        </motion.div>
        {compared.comparison.stats.map((stat, index) => (
            <motion.div onAnimationComplete={() => animationCompleted(index)} {...animate(1.5 + index++/4)} className="w-24" key={stat.name}>
                <div  style={{backgroundColor: stat.color}} className={`h-20 w-full flex items-center justify-center `}>
                    <div className="flex flex-col space-y-2">
                        {stat.message === "Less" && (<CaretDoubleLeft size={32} />)}
                        {stat.message === "Higher" && (<CaretDoubleRight size={32} />)}
                        {stat.message === "Equals" && (<Equals size={32} />)}
                        <p className="text-white text-sm font-semibold " >{stat.attributes}</p>
                    </div>
                </div>
            </motion.div>
        ))}
        
    </div>
  )
};

export default PokeHits;
