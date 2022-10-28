import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useWindowSize } from '../hooks/useWindowSize';


const Header: React.FC = () => {
    const router = useRouter();
    const { width } = useWindowSize();
    if(!width) return null;
    return (
        <div className="inset gap-y-4 flex-col flex w-full justify-center items-center pt-6  ">
            {width < 400 
                ? (
                    <div className="flex">
                        <Image  
                            src="/bg-4.png" 
                            alt="Picture of the author" 
                            height={90} 
                            width={70} 
                        />
                        <Image
                            onClick={() => router.push('/')}
                            className="cursor-pointer"
                            src="/logo.png" 
                            height={70}
                            width={190}
                            alt="Pictures of bulbassaur, squirtle, charmandar and pikachu"
                        />
                    </div>
                )
                : (
                    <div className="flex items-center gap-x-4 md:gap-x-16">
                        <div className="h-24 w-24 md:h-44 md:w-44 relative"> 
                            <Image
                                src="/bg-3.png" 
                                alt="Picture of the author"
                                layout="fill" 
                                objectFit="contain" 
                            />
                        </div>
                        <div className="h-24 w-44 relative md:h-44 md:w-60"> 
                            <Image
                                onClick={() => router.push('/')}
                                className="cursor-pointer"
                                src="/logo.png" 
                                alt="Pictures of bulbassaur, squirtle, charmandar and pikachu"
                                layout="fill" 
                                objectFit="contain" 
                            />
                        </div>
                        <div className="h-24 w-24 md:h-44 md:w-44 relative"> 
                            <Image
                                src="/bg-4.png" 
                                alt="Picture of the author" 
                                layout="fill" 
                                objectFit="contain" 
                            />
                        </div>
                    </div>
                )
            }
        
        </div>
    )
};

export default Header;
