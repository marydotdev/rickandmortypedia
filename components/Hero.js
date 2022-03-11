import Image from 'next/image'

export default function Hero() {
    return (
        <div className='flex justify-center pb-6 sm:pb-12'>
            <div className='px-8'>
            <Image src="https://media0.giphy.com/media/5bd1j8br2o6AvjpeLv/giphy.gif?cid=790b761121014dcc45e0852d8809605c9ccf786c85a99e15&rid=giphy.gif&ct=s" alt="rickandmortygif" width='480' height='206' />
            </div>
        </div>
    )
}