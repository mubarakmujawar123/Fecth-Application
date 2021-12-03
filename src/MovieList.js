import React, { useState } from 'react';
import List from './List';
const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const fetchMovie = () => {
    fetch('https://swapi.dev/api/films')
      .then((response) => {
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
      });
  };

  return (
    <React.Fragment>
      <button onClick={fetchMovie}>Fetch data</button>
      <List moviesData={moviesData}></List>
    </React.Fragment>
  );
};

export default MovieList;
