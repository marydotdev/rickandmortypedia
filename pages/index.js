import Head from 'next/head'
import { useState, useEffect } from 'react'
import Card from '../components/Card';
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

    if ( current === defaultEndpoint ) return;

    async function request() {
      const res = await fetch(current)
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info
      });

      if ( !nextData.info?.prev ) {
        updateResults(nextData.results);
        return;
      }

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
  <>
    <Head>
      <title>Rickandmortypedia</title>
      <meta name="description" content="Like if Rick and Morty and Wikipedia had a baby" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col items-center max-w-6xl mx-auto">
      <Hero />

      {/* Search Bar */}
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
      {/* Character Grid */}
      <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
        {results.map(result => {
        const { id, name, image, species } = result;

        return (
            <Card key={id} {...result} />
            )
          })}  
      </div>
      
      {/* Load More Characters */}
      <button onClick={handleLoadMore} className='px-4 py-2 m-8 border-2 rounded-xl bg-white text-black hover:transform hover:scale-105 transition ease-out duration-300'>Load more</button>
    </main>
  </>
  )
}
