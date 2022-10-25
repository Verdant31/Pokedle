import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';


const Header: React.FC = () => {
    const router = useRouter();
    return (
        <div className="inset gap-y-4 flex-col flex w-full justify-center items-center pt-6 ">
            <Image  src="/bg-4.png" alt="Picture of the author" height={90} width={110} />
            <Image
                onClick={() => router.push('/')}
                className="cursor-pointer"
                src="/logo.png" 
                height={70}
                width={160}
                alt="Pictures of bulbassaur, squirtle, charmandar and pikachu"
            />
        </div>
    )
};

export default Header;
