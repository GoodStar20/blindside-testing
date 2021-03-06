import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useParams, useHistory } from 'react-router-dom';

import Loading from '../../components/Loading';

import { GET_MOVIE_INFO } from '../../graphql/query';

import './styles.scss';

const MovieInfo = ({}) => {
  const { id } = useParams();
  const history = useHistory();

  const { loading, data } = useQuery(GET_MOVIE_INFO, { variables: { id: id } });

  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState('');

  const handleComment = (e) => {
    setIsComment(e.target.checked);
  };

  return (
    <div className="movie-info">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <i className="fas fa-arrow-circle-left back-icon" onClick={() => history.push('/movies')} />
          <div
            className="background"
            style={{
              backgroundImage: 'url("' + data.movieInfo.poster_path + '")',
            }}
          />
          <div className="info-content row">
            <div className="col-md-6 p-5">
              <img src={data.movieInfo.poster_path} className="cover-image" alt="" />
            </div>
            <div className="col-md-6 p-5">
              <div className="title">{data.movieInfo.title}</div>
              <p className="description mt-4">{data.movieInfo.overview}</p>
              <ul>
                <li>
                  <strong>Genre:</strong> {data.movieInfo.genres}
                </li>
                <li>
                  <strong>Released:</strong>
                  {data.movieInfo.release_date}
                </li>
                <li>
                  <strong>Rated:</strong> {data.movieInfo.vote_average}
                </li>
                <li>
                  <strong>Runtime:</strong> {data.movieInfo.runtime}
                </li>
                <li>
                  <strong>Production Companies:</strong> {data.movieInfo.production_companies}
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <strong>Comments:</strong>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(e) => handleComment(e)}
                        checked={isComment}
                      />
                    </div>
                  </div>
                  <textarea
                    rows="5"
                    disabled={!isComment}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Write something here"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieInfo;
