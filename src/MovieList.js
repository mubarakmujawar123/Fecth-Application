import React, { useState } from 'react';
import List from './List';
const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMovie = () => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/film')
      .then((response) => {
        if (!response.status.ok) {
          throw new Error('Something went wrong !!!');
        }
        return response.json();
      })
      .then((data) => {
        const transformedMovie = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });
        setMoviesData(transformedMovie);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <button onClick={fetchMovie}>Fetch data</button>
      {!isLoading && moviesData.length > 0 && (
        <List moviesData={moviesData}></List>
      )}
      {!isLoading && moviesData.length === 0 && <p>No data to show</p>}
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>{error}</p>}
    </React.Fragment>
  );
};

export default MovieList;
