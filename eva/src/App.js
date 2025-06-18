import React from "react";
import { BrowserRouter } from "react-router-dom";
import Page from "./components/Page";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "aos/dist/aos.css";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from "@apollo/client";
import Routes from "./Routes";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                locations: {
                    keyArgs: false,
                    merge(existing = [], incoming) {
                        return incoming;
                    },
                }
            }
        }
    }
})

const client = new ApolloClient({
    link: new HttpLink({
        uri: 'http://localhost:8080/graphql',
    }),
    cache: cache
});

const App = () => {
  return (
      <ApolloProvider client={client}>
        <Page>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Page>
      </ApolloProvider>
  );
};

export default App;
