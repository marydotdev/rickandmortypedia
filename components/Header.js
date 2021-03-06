import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
    return (
        <div className="max-w-7xl mx-auto py-8 px-2 sm:px-4 lg:px-8">
            <div className="w-full flex justify-between items-center">
                <Link href="/">
                    <a>
                        <Image src="/rickandmortypedialogo-white.png"
                        alt="logo"
                        width="250"
                        height="50"
                        />
                    </a>
                </Link>
            </div>
        </div>
    )
}