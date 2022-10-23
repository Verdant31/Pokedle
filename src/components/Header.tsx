import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';


const Header: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex mt-12 w-full gap-x-12 justify-center items-center self-center ">
            <Image src="/bg-1.png" height={120} width={160} alt="Pictures of bulbassaur, squirtle, charmandar and pikachu"/>
            <Image 
                onClick={() => router.push('/')}
                className="cursor-pointer"
                src="/logo.png" 
                height={90} 
                width={250} 
                alt="Pictures of bulbassaur, squirtle, charmandar and pikachu"
            />
            <Image src="/bg-2.png" height={120} width={180} alt="Pictures of bulbassaur, squirtle, charmandar and pikachu"/>
        </div>
    )
};

export default Header;
