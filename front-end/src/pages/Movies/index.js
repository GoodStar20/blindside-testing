import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_MOVIES } from '../../graphql/query';

import MovieList from '../../components/List';

function useDebounce(newValue, delay) {
  const [value, setValue] = useState(newValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(newValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [newValue, delay]);

  return value;
}

const Movies = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const searchKey = useDebounce(value, 500);

  const { loading, data, refetch } = useQuery(GET_MOVIES, { variables: { key: searchKey, page } });

  useEffect(() => {
    if (!data?.movies) {
      return;
    }
    const newMovies = movies.concat(data.movies.results || []);
    setMovies(newMovies);
  }, [data]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [searchKey]);

  useEffect(() => {
    refetch();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setValue(value);
    }
  };

  const handlePaginate = useCallback(() => {
    setPage(page + 1);
  }, [setPage, page]);

  const isLastPage = data?.movies?.total_pages ? data.movies.total_pages <= page * 20 : true;

  return (
    <div className="text-center m-4">
      <h2 className="mb-5">Welcome!</h2>
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          className="form-control w-50 align-self-center"
          value={value}
          onKeyPress={(e) => handleKeyPress(e)}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Movie"
        />
      </div>
      <MovieList loading={loading} data={movies} />
      {!isLastPage && (
        <button type="button" className="btn btn-primary ms-3" onClick={handlePaginate}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Movies;
