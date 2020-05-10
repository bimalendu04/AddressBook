import * as React from 'react';
import { Layout, Table, Icon, Button } from 'antd';
import Styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IAddressModel } from '../../models/AddressBook';
import { deleteAddress } from '../../actions';
import AddressFormModal from '../addressFormModal';

const { Content } = Layout;

export interface IHomeProps extends mapDispatchToProps {
    addressBook: IAddressModel[];
};

export interface IHomeState {
    isModalOpen: boolean;
    type: IType;
    selectedId: string;
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

export enum IType {
    'add' = 'Add',
    'edit' = 'Edit'
}

class HomeComponent extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        document.title = 'Home';
        this.state = {
            isModalOpen: false,
            type: IType.add,
            selectedId: ''
        }
    }
    private onEdit(id: string) {
        this.setState({
            type: IType.edit,
            selectedId: id
        }, () => this.openModal());
    }

    private onDelete(id: string) {
        this.props.deleteAddress(id);
    }

    private openModal() {
        this.setState({
            isModalOpen: true
        });
    }

    private closeModal() {
        this.setState({
            isModalOpen: false,
            selectedId: '',
            type: IType.add
        });
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
        let isDeviceMobile = document.body.clientWidth <= 414 ? true : false;

        return (
            <Content>
                <div className={`${Styles.homeBody}`}>
                    <div className={`${Styles.title}`}>Address Book{
                        !isDeviceMobile ?
                            <Button className={Styles.addBtn} type="primary" shape="circle" icon={'plus'} size={'default'} onClick={() => this.openModal()} /> :
                            ''
                    }</div>
                    <Table className={`${Styles.addressTable}`} scroll={{ x: true }} locale={{ emptyText: 'No Address Found' }} columns={columns} dataSource={this.props.addressBook} />
                    {
                        isDeviceMobile ?
                            <Button className={Styles.addBtnMobile} type="primary" shape="circle" icon={'plus'} size={'large'} onClick={() => this.openModal()} /> :
                            ''
                    }
                </div>
                <AddressFormModal id={this.state.selectedId} isVisible={this.state.isModalOpen} closeModal={() => this.closeModal()} type={this.state.type} />
            </Content>
        );
    }
}

const Home = connect(mapStateToProps, { deleteAddress })(HomeComponent);

export default Home;