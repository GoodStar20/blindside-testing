const GraphQL = require("graphql");
const axios = require("axios");

const { GraphQLList, GraphQLString, GraphQLInt } = GraphQL;

const Movies = require("../types/Movies");
const { redis, RedisKey } = require("../../lib/redis");

module.exports = {
  movies() {
    return {
      type: Movies.MovieListResponse,
      args: {
        key: { type: GraphQLString },
        page: { type: GraphQLInt },
      },
      async resolve(parentValue, args) {
        let URI = `${process.env.API_URL}movie/popular?api_key=${process.env.API_KEY}&page=${args.page}&language=en-US`;

        if (args.key !== "") {
          URI = `${process.env.API_URL}search/movie?api_key=${process.env.API_KEY}&query=${args.key}&page=${args.page}&language=en-US`;
        }

        let data = {
          results: [],
          total_pages: 0,
        };
        try {
          const key = `${RedisKey.MOVIES}:${URI}`;
          const cached = await redis.get(key);

          if (!cached) {
            data = await axios.get(URI).then((res) => res.data);
            redis.set(key, JSON.stringify(data), "ex", 3600);
          } else {
            data = JSON.parse(cached);
          }
        } catch (err) {
          console.log("fetch movie error", err);
        }

        const { total_pages, results } = data;

        return { total_pages, results };
      },
    };
  },

  movieInfo() {
    return {
      type: Movies.MovieInfoType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        const URI = `${process.env.API_URL}movie/${args.id}?api_key=${process.env.API_KEY}&language=en-US`;
        return axios.get(URI).then((res) => {
          const movie = res.data;
          movie.genres = movie.genres.map((g) => g.name).join(", ");
          movie.poster_path = `${process.env.IMAGE_URL}${movie.poster_path}`;
          movie.production_companies = movie.production_companies
            .map((g) => g.name)
            .join(", ");
          movie.runtime += " min.";
          return movie;
        });
      },
    };
  },
};
