import Image from 'next/image'

export default function Hero() {
    return (
        <div className='flex justify-center pb-12'>
                <Image src="/rick-and-morty-front.jpeg" 
                alt="rick and morty"
                width={500}
                height={500} />
        </div>
    )
}