import Image from 'next/image';
import { MenuIcon } from '@heroicons/react/solid';

export default function Header() {
    return (
        <div className="max-w-7xl mx-auto pt-8 pb-4 px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between items-center">
                <div>
                    <Image src="/rickandmortypedialogo-white.png"
                    alt="logo"
                    width="250"
                    height="50"
                    />
                </div>
        
                <div>
                    <ul>
                        <li>Menu</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}