import React, {useEffect, useState } from 'react';
import {Provider, useSelector} from 'react-redux';
import {Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

import { ApolloProvider } from '@apollo/client';

import { prefixes } from 'shared/constants'
import { client, hooks as apolloHooks } from 'shared/apollo';

import { store } from '../redux';

const Content = () => {
    let navigate = useNavigate();

    apolloHooks.useAuthentificationData();

    return (
        <>
            <Outlet />

            <div><Link to="/client">Клиентская часть</Link></div>
            <div><Link to="/company">Транспортная компания</Link></div>
            <div><Link to="/login">Форма логина</Link></div>
            <div><Link to="protected">Роут только для авторизованных</Link></div>

            <button onClick={() => {

                Cookies.remove('Authorization');
                client.clearStore().then(() => {
                    client.resetStore();
                    navigate('/')
                });
            }}>Разлогин</button>
        </>
    );
}

export const App = () => {
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <Content />
            </ApolloProvider>
        </Provider>
    );
}
