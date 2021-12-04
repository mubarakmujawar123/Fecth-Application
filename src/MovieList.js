import React, { useState, useEffect, useCallback } from 'react';
import List from './List';
const MovieList = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMovie = useCallback(() => {
    setIsLoading(true);
    fetch('https://swapi.dev/api/films')
      .then((response) => {
        if (!response.ok) {
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
  });

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  const addMovie = (event) => {
    event.preventDefault();
  };

  let content = <p>Found no Movie</p>;
  if (moviesData.length > 0) {
    content = <List moviesData={moviesData}></List>;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      qweqweqw
      <form onSubmit={addMovie}>
        <lable>Title</lable>
        <input name="title" />
        <lable>Release Date</lable>
        <input name="releaseDate" />
        <lable>Opening Text</lable>
        <input name="openingText" />
        <input type="Submit" value="Add Movie" />
      </form>
      <button onClick={fetchMovie}>Fetch data</button>
      {content}
    </React.Fragment>
  );
};

export default MovieList;
