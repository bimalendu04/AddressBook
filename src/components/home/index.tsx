import * as React from 'react';
import { Layout, Table, Icon } from 'antd';
import Styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IAddressModel } from '../../models/AddressBook';
import history from '../../history';
import { deleteAddress } from '../../actions';

const { Content } = Layout;

export interface IHomeProps extends mapDispatchToProps {
    addressBook: IAddressModel[];
};

export interface IHomeState {

};

const mapStateToProps = (state: any) => {
    return { addressBook: state.addressBook };
};

export type mapDispatchToProps = {
    deleteAddress: (id: string) => void;
}

export interface ITableDatasource extends IAddressModel {
    key: string;
}

class HomeComponent extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        document.title = 'Home';
    }
    private onEdit(id: string) {
        history.push(`/address/edit/${id}`);
    }

    private onDelete(id: string) {
        this.props.deleteAddress(id);
    }
    public render() {
        let dataSource: ITableDatasource[] = this.props.addressBook as ITableDatasource[];
        if (this.props.addressBook && this.props.addressBook.length) {
            this.props.addressBook.forEach((address, index) => {
                dataSource[index].key = address.id;
            });
        }
        const columns = [
            {
                title: 'First Name',
                dataIndex: 'firstName',
                key: 'fName'
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lName'
            },
            {
                title: 'Email Id',
                dataIndex: 'emailId',
                key: 'emailId'
            },
            {
                title: 'Phone Number',
                dataIndex: 'phNo',
                key: 'phNo'
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address'
            },
            {
                title: 'Action',
                key: 'action',
                render: (text: any, record: any, index: number) => {
                    return <>
                        <Icon className={Styles.marginRight10} type="edit" theme="outlined" onClick={() => this.onEdit(record.id)} />
                        <Icon type="delete" theme="outlined" onClick={() => this.onDelete(record.id)} />
                    </>
                }
            }
        ];
        return (
            <Content>
                <div className={`${Styles.homeBody}`}>
                    <div className={`${Styles.title}`}>Address Book</div>
                    <Table className={`${Styles.addressTable}`} locale={{ emptyText: 'No Address Found' }} columns={columns} dataSource={this.props.addressBook} />
                </div>
            </Content>
        );
    }
}

const Home = connect(mapStateToProps, { deleteAddress })(HomeComponent);

export default Home;