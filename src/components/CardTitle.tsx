import * as React from 'react';

interface ICartTitleProps {
    children: string;
}

const CardTitle: React.FunctionComponent<ICartTitleProps> = ({children}) => {
  return (
    <div>
        <p className="w-24">{children}</p>
        <div className="w-full h-1 bg-yellow-500 my-4"/>
    </div>
  )
};

export default CardTitle;
