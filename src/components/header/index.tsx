import * as React from 'react';
import { Layout, Menu } from 'antd';
import Styles from './styles.module.scss';
import history from '../../history';

const { Header } = Layout;

export interface IHeaderProps {

};

export interface IHeaderState {

}

export enum HeaderOption {
    Home = 'Home',
    Add = 'Add'
};

export default class HeaderComponent extends React.Component<IHeaderProps, IHeaderState> {
    private onSelectPage(selected: any) {
        if(selected.key === HeaderOption.Home) {
            history.push(`/`);
        } else if (selected.key === HeaderOption.Add) {
            history.push(`/address/new`);
        } else {
            history.push(`/`);
        }
    }
    public render() {
        let defaultSelected = window.location.pathname === '/' ? [HeaderOption.Home] : (window.location.pathname === '/address/new' ? [HeaderOption.Add] : [HeaderOption.Home]);
        return <Header className={`${Styles.headerMain}`}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={defaultSelected}
                style={{ lineHeight: '64px' }}
                onClick={(selected) => this.onSelectPage(selected)}
            >
                <Menu.Item key={HeaderOption.Home} >Home</Menu.Item>
                <Menu.Item key={HeaderOption.Add}>Add Address</Menu.Item>
            </Menu>
        </Header>;
    }
}