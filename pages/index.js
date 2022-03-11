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
      <meta name="description" content="Like if Rick and Morty and Wikipedia had a baby" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    
    <Header />

    <Hero />

    <main className="flex flex-col items-center max-w-6xl mx-auto">
      <form className="relative flex justify-center mt-8 mb-12" onSubmit={handleOnSubmitSearch}>
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

    <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
    {results.map(result => {
      const { id, name, image, species } = result;

      return (
        <div key={id} className="relative hover:transform hover:scale-[1.03] transition ease-out duration-100">
          <div className='card absolute -inset-1.5 bg-green-400 rounded-lg blur opacity-75'>

          </div>
        <div key={id} className="relative py-4 card bg-slate-900/90 text-center ">
          <Link href="/character/[id]" as={`/character/${id}`} className="space-y-6">
            <a>
              <div className='py-8'>
                <div className="mx-auto h-40 w-40 border-2 rounded-sm border-slate-900">
              <Image src={image} alt={name} width={200} height={200} />
              </div>
              </div>
                <div className="space-y-2">
                  <div className="font-medium text-lg leading-6 space-y-1 px-2 py-4">
                    <h2 className='text-xl font-bold'>{name}</h2>
                    <p>{species}</p>
                  </div>
                </div>
            </a>
          </Link>
        </div>
        </div>
            )
    })}  
    </div>

    <button onClick={handleLoadMore} className='px-4 py-2 m-8 border-2 rounded-xl bg-white text-black hover:transform hover:scale-105 transition ease-out duration-300'>Load more</button>

  </main>
</div>
  )
}
