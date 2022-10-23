import * as React from 'react';

interface ICartTitleProps {
    children: string;
}

const CartTitle: React.FunctionComponent<ICartTitleProps> = ({children}) => {
  return (
    <div className="w-24 ">
        <p className="">{children}</p>
        <div className="w-full h-1 bg-yellow-500 my-4"/>
    </div>
  )
};

export default CartTitle;
