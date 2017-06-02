import 'babel-polyfill';
import {Intl} from 'intl';
import React, {Component} from 'react';
import {jsonServerRestClient, simpleRestClient, Admin, Delete, Resource} from 'admin-on-rest';

import './App.css';

import authClient from './login/authClient';
import sagas from './sagas';
import themeReducer from './layout/themeReducer';
import Login from './login/Login';
import Layout from './layout/Layout';
import Menu from './layout/Menu';
import {Dashboard} from './dashboard';
import customRoutes from './routes';
import translations from './i18n';

import {UserList, UserCreate, UserEdit, UserDelete, UserIcon} from './users';
import {VisitorList, VisitorEdit, VisitorDelete, VisitorIcon} from './visitors';
import {CommandList, CommandEdit, CommandIcon} from './commands';
import {ProductList, ProductCreate, ProductEdit, ProductIcon} from './products';
import {CategoryList, CategoryCreate, CategoryEdit, CategoryDelete, CategoryIcon} from './categories';
import {LoanOptsList, LoanOptsCreate, LoanOptsDelete, LoanOptsIcon} from './loanOpts';
import {ReviewList, ReviewEdit, ReviewIcon} from './reviews';

import restClient from './rest/restClient';
import jsonRestClient from './rest/jsonRestClient';
import fakeRestServer from './rest/restServer';

class App extends Component {
    componentWillMount() {
        //this.restoreFetch = fakeRestServer();
    }

    componentWillUnmount() {
        //this.restoreFetch();
    }

    render() {
        return (
            <Admin
                title="管理后台"
                restClient={jsonRestClient}
                //restClient={restClient}
                customReducers={{ theme: themeReducer }}
                customSagas={sagas}
                customRoutes={customRoutes}
                authClient={authClient}
                dashboard={Dashboard}
                loginPage={Login}
                appLayout={Layout}
                menu={Menu}
                locale="zh"
                messages={translations}
            >
                <Resource name="users" list={UserList} create={UserCreate} edit={UserEdit} remove={UserDelete}
                          icon={UserIcon}/>
                <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit}
                          remove={Delete}
                          icon={CategoryIcon}/>
                <Resource name="loanOpts" list={LoanOptsList} create={LoanOptsCreate} remove={LoanOptsDelete}
                          icon={LoanOptsIcon}/>

                /*                <Resource name="customers" list={VisitorList} edit={VisitorEdit} remove={VisitorDelete}
                                          icon={VisitorIcon}/>
                                <Resource name="commands" list={CommandList} edit={CommandEdit} remove={Delete} icon={CommandIcon}
                                          options={{ label: 'Orders' }}/>
                                <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} remove={Delete}
                                          icon={ProductIcon}/>
                                <Resource name="reviews" list={ReviewList} edit={ReviewEdit} icon={ReviewIcon}/>*/
            </Admin>
        );
    }
}

export default App;
