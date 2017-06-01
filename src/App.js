import 'babel-polyfill';
import React, {Component} from 'react';
import {jsonServerRestClient, simpleRestClient, Admin, Delete, Resource} from 'admin-on-rest';

import './App.css';

import authClient from './authClient';
import sagas from './sagas';
import themeReducer from './themeReducer';
import Login from './Login';
import Layout from './Layout';
import Menu from './Menu';
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

import restClient from './restClient';
import jsonRestClient from './jsonRestClient';
import fakeRestServer from './restServer';

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
