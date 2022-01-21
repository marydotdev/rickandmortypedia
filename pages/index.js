import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect } from 'react'
import Header from '../components/Header';
import Hero from '../components/Hero';

const defaultEndpoint = 'https://rickandmortyapi.com/api/character/';

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint)
  const data = await res.json();
  return {
    props: {
      data
    }
  }
}

export default function Directory({ data }) {
  const { info, results: defaultResults = [] } = data;

  const [results, updateResults] = useState(defaultResults);

  const [page, updatePage] = useState({
    ...info,
    current: defaultEndpoint
  });
  const { current } = page;

  useEffect(() => {
    // Don't bother making a request if it's the default endpoint as we
    // received that on the server

    if ( current === defaultEndpoint ) return;

    // In order to use async/await, we need an async function, and you can't
    // make the `useEffect` function itself async, so we can create a new
    // function inside to do just that

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info
      });

      // If we don't have `prev` value, that means that we're on our "first page"
      // of results, so we want to replace the results and start fresh

      if ( !nextData.info?.prev ) {
        updateResults(nextData.results);
        return;
      }

      // Otherwise we want to append our results

      updateResults(prev => {
        return [
          ...prev,
          ...nextData.results
        ]
      });
    }

    request();
  }, [current]);

  function handleLoadMore() {
    updatePage(prev => {
      return {
        ...prev,
        current: page?.next
      }
    });
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const { currentTarget = {} } = e;
    const fields = Array.from(currentTarget?.elements);
    const fieldQuery = fields.find(field => field.name === 'query');

    const value = fieldQuery.value || '';
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({
      current: endpoint
    });
  }

return (
  <div className="">
    <Head>
      <title>Rickandmortypedia</title>
      <meta name="description" content="Rickandmortypedia - a Rick and Morty fan project" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <Header />

    <Hero />

    <main className="flex flex-col items-center max-w-6xl mx-auto">
      <form className="relative flex justify-center mb-8" onSubmit={handleOnSubmitSearch}>
        <input
          aria-label="Search characters" 
          name="query" 
          type="search"
          placeholder="Search characters"
          className="block w-full px-4 py-2 border rounded-md border-gray-900 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-100"
        />
          <svg
            className="absolute w-5 h-5 right-3 top-3 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
          </svg>
      </form>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    {results.map(result => {
      const { id, name, image, species } = result;

      return (
        <div key={id} className="hover:transform hover:scale-105 transition ease-out duration-300">
          <Link href="/character/[id]" as={`/character/${id}`}>
            <a>
              <Image src={image} alt={name} width={200} height={200} className='rounded-xl' />
              <h2>{name} &rarr;</h2>
              <p>{species}</p>
            </a>
          </Link>
        </div>
            )
    })}  
    </div>

    <button onClick={handleLoadMore} className='px-4 py-2 m-8 border-2 rounded-xl bg-white text-black hover:transform hover:scale-105 transition ease-out duration-300'>Load more</button>

  </main>
</div>
  )
}
