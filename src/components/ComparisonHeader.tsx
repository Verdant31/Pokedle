import * as React from 'react';
import CardTitle from './CardTitle';


const ComparisonHeader: React.FC = () => {
  return (
    <div className="flex gap-x-2 mt-8 w-full ">
        <CardTitle>Pokemon</CardTitle>
        <CardTitle>Abilities</CardTitle>
        <CardTitle>Moves</CardTitle>
        <CardTitle>Types</CardTitle>
        <CardTitle>Weight</CardTitle>
        <CardTitle>Height</CardTitle>
        <CardTitle>Hp</CardTitle>
        <CardTitle>Attack</CardTitle>
        <CardTitle>Speed</CardTitle>
    </div>
  )
};

export default ComparisonHeader;
