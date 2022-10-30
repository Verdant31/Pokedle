

import * as React from 'react';
import type { AbilitiesClues, MovesClues, NameClues, StatsClues, TypesClues } from '../@types';
import { Clue } from '../pages/findout';

interface IClueProps {
    clue: Clue;
}

const Clue: React.FC<IClueProps> = ({clue}) => {
    switch(clue.type) {
        case 'nameClues':
            return (
                <span>
                    <span className="mx-1"><span className="font-bold">Name</span> starts with</span>
                    <span className="font-bold text-yellow-500">{(clue.clue as NameClues).firstLetter.toUpperCase()}</span>
                    <span className="mx-1">ends with</span>
                    <span className="font-bold text-yellow-500">{(clue.clue as NameClues).lastLetter.toUpperCase()}</span>
                </span> 
            )
        case 'abilitiesClues':
            return (
                <span>
                    <span className="mx-2 font-bold">Skills:</span>
                    <span className="font-bold text-yellow-500">{(clue.clue as AbilitiesClues).randomAbilityOne}</span>
                    {(clue.clue as AbilitiesClues).randomAbilityTwo && (
                        <>
                            <span className="mx-2">and</span>
                            <span className="font-bold text-yellow-500">{(clue.clue as AbilitiesClues).randomAbilityTwo}</span>
                        </>
                    )}

                </span>
            )
        case 'movesClues':
            return (
                <span>
                    <span className="mx-2 font-bold">Moves:</span>
                    <span className="font-bold text-yellow-500">{(clue.clue as MovesClues).randomMoveOne}</span>
                    {(clue.clue as MovesClues).randomMoveTwo && (
                        <>
                            <span className="mx-2">and</span>
                            <span className="font-bold text-yellow-500">{(clue.clue as MovesClues).randomMoveTwo}</span>
                        </>
                    )}
                </span>
            )
        case 'typesClues':
            return (
                <span>
                    <span className="mx-2 font-bold">Type:</span>
                    <span className="font-bold text-yellow-500 capitalize">{(clue.clue as TypesClues).randomType}-type Pokemon.</span>
                </span>
            )
        case 'statsCludes':
            return (
                <span>
                    <span className="font-bold">HP: </span>
                    <span className="font-bold text-yellow-500">{(clue.clue as StatsClues).hp}</span>
                    <span className="ml-2 font-bold">Attack: </span>
                    <span className="font-bold text-yellow-500">{(clue.clue as StatsClues).attack}</span>
                </span>
            )
        default:
            return <></>
    }
};

export default Clue;
