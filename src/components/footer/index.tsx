import * as React from 'react';
import { Layout } from 'antd';
import Styles from './styles.module.scss';

const { Footer } = Layout;

export interface IFooterProps {

};

export interface IFooterState {

}

export default class FooterComponent extends React.Component<IFooterProps, IFooterState> {
    public render() {
        return <Footer className={`${Styles.footerMain}`}>
            By Bimalendu Sarkar
            </Footer>;
    }
}