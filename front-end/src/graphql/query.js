import { gql } from 'apollo-boost';

export const GET_MOVIES = gql`
  query ($key: String, $page: Int) {
    movies(key: $key, page: $page) {
      total_pages
      results {
        id
        poster_path
        title
      }
    }
  }
`;

export const GET_MOVIE_INFO = gql`
  query ($id: String) {
    movieInfo(id: $id) {
      title
      overview
      poster_path
      genres
      release_date
      vote_average
      runtime
      production_companies
    }
  }
`;
