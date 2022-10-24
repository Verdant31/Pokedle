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
            <>
              <ComparisonHeader />
              <div className="flex flex-col items-center mt-8">
                {comparedPokemons.slice(0).reverse().map((compared) => (
                  <PokeHits
                  userAlreadyWon={userAlreadyWon}
                    onAnimationComplete={onAnimationComplete}
                    key={compared.chosenPokemon.id} 
                    compared={compared}  
                  />
                ))}
              </div>
            </>
        )}
    </>
  )
};

export default ComparisonBody;
