import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
    uri: 'https://lonet-cms.kobaklab.com/graphql',
    credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            Authorization: Cookies.get('Authorization'),
            ...headers,
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})


export * as hooks from './hooks';
