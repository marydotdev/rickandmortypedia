import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    return (
        <div className="max-w-7xl mx-auto pt-8 pb-4 px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between items-center">
            <Link href="/">
            <a>
                    <Image src="/rickandmortypedialogo-white.png"
                    alt="logo"
                    width="250"
                    height="50"
                    />
                </a>
                </Link>
        
                <div>
                    {/* menu */}
                </div>
            </div>
        </div>
    )
}