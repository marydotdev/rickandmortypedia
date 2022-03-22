import Link from 'next/link';
import Image from 'next/image';
import Tilt from 'react-parallax-tilt';

export default function Card({ id, name, image, species }) {
    return (
        <Link href="/character/[id]" as={`/character/${id}`}>
        <a>
        <Tilt glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="bottom" glareBorderRadius="20px">
            <div className="relative">
            {/* background glow */}
            <div className='absolute -inset-0.5 bg-gradient-to-br from-lime-300 to-cyan-500 blur' />
            
            {/* card start */}
            
            <div key={id} className="relative bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center px-4 py-8 rounded-xl">
                <div className='relative flex flex-col w-full'>
                    <Image src='/images/portal.png' alt ="portal" width={302} height={313} className="" />
                    
                    <div className='absolute w-full h-full mx-auto flex flex-col justify-center items-center'>
                        <Link href="/character/[id]" as={`/character/${id}`}>
                            <a className="flex flex-col h-full justify-center items-center">
                                <div className="relative h-40 w-40 rounded-full">
                                    <div className='relative flex flex-col rounded-full'>
                                    <div className='absolute rounded-full -inset-3.5 bg-gradient-to-br from-lime-400 to-cyan-300 blur' />
                                        <Image src={image} alt={name} width={180} height={180} className="relative rounded-full" />
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className="font-medium text-lg leading-6 space-y-1 px-2 py-4">
                        <h2 className='text-xl font-bold'>{name}</h2>
                        <p>{species}</p>
                    </div>
                </div>
            </div>
        </div>
        </Tilt>
        </a>
        </Link>
    )}