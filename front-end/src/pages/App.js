import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { Route, withRouter, Switch } from 'react-router-dom';

// Components
import Login from './Login';
import Movies from './Movies';
import MovieInfo from './MovieInfo';

import { APIURL } from '../const';

// Styles
import './App.scss';

const cache = new InMemoryCache();
const client = new ApolloClient({ cache: cache, uri: APIURL });

const App = () => {
  return (
    <div className="app">
      <ApolloProvider client={client}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/movie/info/:id" component={MovieInfo} />
        </Switch>
      </ApolloProvider>
    </div>
  );
};

export default withRouter(App);
