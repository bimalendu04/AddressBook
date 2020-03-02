import * as React from 'react';
import history from '../../history';
import { Router, Route, Switch, Link } from 'react-router-dom';
import Home from '../home';
import Styles from './styles.module.scss';
import { Layout } from 'antd';
import HeaderComponent from '../header';
import Sider from '../sider';
import FooterComponent from '../footer';
import Add from '../addEditAddress';

export interface IAppProps {

};

export interface IAppState {

};

export default class App extends React.Component<IAppProps, IAppState> {
    public render() {
        return <div className={Styles.mainContainer}>
            <Layout className={`${Styles.mainLayout}`}>
                <HeaderComponent />
                <Layout>
                    {/* <Sider /> */}
                    <Router history={history}>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/home" exact component={Home} />
                            <Route path="/address/new" exact component={Add} />
                            <Route path="/address/edit/:id" exact component={Add} />
                        </Switch>
                    </Router>
                </Layout>
                <FooterComponent />
            </Layout>
        </div>;
    }
}