import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client'


const defaultOptions: DefaultOptions = {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }


const client = new ApolloClient({
    uri: '/graph',
    cache: new InMemoryCache(),
    headers: {
        'accept': 'application/json, multipart/mixed'
    },
    defaultOptions: defaultOptions,
});

export default client