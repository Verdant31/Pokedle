import * as React from 'react';
import { ComparedPokemon } from '../@types';
import ComparisonHeader from './ComparisonHeader';
import PokeHits from './PokeHits';

interface IComparisonBodyProps {
  comparedPokemons: ComparedPokemon[]
  onAnimationComplete: () => void;
  userAlreadyWon: boolean;
}

const ComparisonBody: React.FunctionComponent<IComparisonBodyProps> = ({
    comparedPokemons,
    onAnimationComplete,
    userAlreadyWon,
}) => {
  return (
    <>
        {comparedPokemons.length > 0 && (
            <div className="w-[300px] pb-12 overflow-x-scroll scrollbar scrollbar-track-zinc-700  scrollbar-thumb-yellow-500">
              <ComparisonHeader />
              <div className="flex w-full flex-col items-center mt-8">
                {comparedPokemons.slice(0).reverse().map((compared) => (
                  <PokeHits
                    userAlreadyWon={userAlreadyWon}
                    onAnimationComplete={onAnimationComplete}
                    key={compared.chosenPokemon.id} 
                    compared={compared}  
                  />
                ))}
              </div>
            </div>
        )}
    </>
  )
};

export default ComparisonBody;
