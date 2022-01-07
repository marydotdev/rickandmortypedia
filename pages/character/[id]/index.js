import Head from 'next/head';
import Link from 'next/link';

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
    <div className="container">
      <Head>
        <title>{ name }</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">{ name }</h1>

        <div className="profile">
          <div className="profile-image">
            <img src={image} alt={name} />
          </div>
          <div className="profile-details">
            <h2>Character Details</h2>
            <ul>
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

        <p className="back">
          <Link href="/">
            <a>
              Back to All Characters
            </a>
          </Link>
        </p>
      </main>

    </div>
  )
}