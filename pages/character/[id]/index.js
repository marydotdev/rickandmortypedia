import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch(`${defaultEndpoint}${id}`);
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Character({ data }) {
  const { name, id, image, gender, location, origin, species, status } = data;

  let nextCharacter = id + 1;
  let prevCharacter = id - 1;

  return (
    <div className="">
      <Head>
        <title>{ name } - Rickandmortypedia</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center border-2 border-yellow-400">
          <div className="profile-image border-2 border-blue-400">
            <Image src={image} alt={name} width={300} height={300} className='' />
          </div>
          <div className="flex items-center border-2 border-red-500">
            <ul className='flex flex-col'>
              <li>
                <strong>Name:</strong> { name }
              </li>
              <li>
                <strong>Status:</strong> { status }
              </li>
              <li>
                <strong>Gender:</strong> { gender }
              </li>
              <li>
                <strong>Species:</strong> { species }
              </li>
              <li>
                <strong>Location:</strong> { location?.name }
              </li>
              <li>
                <strong>Originally From:</strong> { origin?.name }
              </li>
            </ul>
          </div>
        </div>

        <p className="py-8 text-xl">
          <Link href="/">
            <a>
              Back to All Characters
            </a>
          </Link>
        </p>

        {/* <div className="w-full flex justify-between">
        <p className="prev">
          <Link href={`/character/${prevCharacter}`}>
            <a>
              Previous
            </a>
          </Link>
        </p>

        <p className="next">
          <Link href={`/character/${nextCharacter}`}>
            <a>
              Next
            </a>
          </Link>
        </p>
        </div> */}
      </main>
    </div>
  )
}