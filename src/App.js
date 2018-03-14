// React/GraphQLセットアップ
import React from 'react';
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import Header from './Header.js';
import DiaryList from './DiaryList.js';
import Footer from './Footer.js';

// アプリ起動時にApolloClientを初期化する
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjdqt2rys72nv0147jsnzijb8' });
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const App = () => (
    // ApolloClientをReactコンポーネントにて使えるようにするProvider
    <ApolloProvider client={client}>
        <div>
            <Header />
            <DiaryList />
            <Footer />
        </div>
    </ApolloProvider>
);

export default App;