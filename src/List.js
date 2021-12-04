import React from 'react';
const List = (props) => {
  return (
    <div>
      {props.moviesData.map((movieData) => {
        console.log(movieData);
        return (
          <div key={movieData.id}>
            {movieData.id} -- {movieData.title} -- {movieData.releaseDate}--{' '}
            {movieData.openingText}
          </div>
        );
      })}
    </div>
  );
};

export default List;
