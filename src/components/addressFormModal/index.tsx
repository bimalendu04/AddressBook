import * as React from 'react';
import { Form, Input, Button, notification, Icon, Modal } from 'antd';
import Styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IAddressModel } from '../../models/AddressBook';
import { addAddress, updateAddress } from '../../actions';
import _ from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import { IType } from '../home';

const { TextArea } = Input;

export interface IAddressFormModalProps extends mapDispatchToProps, RouteComponentProps<{ id: string }> {
	addressBook: IAddressModel[];
	form: any;
	type: IType;
	isVisible: boolean;
	closeModal: () => void;
	id?: string;
}

export interface IAddressFormModalState {
}

const mapStateToProps = (state: any, ownProps: any) => {
	const { type, isVisible, closeModal, id} = ownProps;
	return { addressBook: state.addressBook };
};

export type mapDispatchToProps = {
	addAddress: (address: IAddressModel) => void;
	updateAddress: (address: IAddressModel) => void;
}

class AddressFormModal extends React.Component<IAddressFormModalProps, IAddressFormModalState> {
	constructor(props: IAddressFormModalProps) {
		super(props);
		this.state = {
		};
	}

	private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err: any, values: any) => {
			debugger;
			if (!err) {
				if (this.props.type === IType.edit) {
					values.id = this.props.id;
					this.props.updateAddress(values);
					this.showNotification('success', 'Address Book updated', '');
					// this.props.form.resetFields();
				} else {
					this.props.addAddress(values);
					this.showNotification('success', 'Address added', '');
					this.props.form.resetFields();
				}
			}
		});
	}

	private showNotification(type: any, message: string, description: string) {
		notification.open({
			message: message,
			description: description,
			type: type
		});
	}

	public render() {
		let data: IAddressModel | undefined;
		if (this.props.id) {
			data = _.filter(this.props.addressBook, { id: this.props.id })[0];
		} else {
			data = undefined;
		}
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 12 },
				xl: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
				xl: { span: 14 }
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 13,
					offset: 11,
				},
				xl: {
					span: 13,
					offset: 11,
				},
			}
		};
		return <Modal
			title={`${this.props.type} Address`}
			centered
			visible={this.props.isVisible}
			onCancel={() => this.props.closeModal()}
			footer={null}
		>
			<div className={`${Styles.formContainer}`
			}>
				<Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)}>
					<Form.Item label="First name">
						{getFieldDecorator('firstName', {
							validateTrigger: ["onChange", "onBlur"],
							initialValue: data ? data.firstName : undefined,
							rules: [
								{
									type: 'string',
									message: 'The input is not valid String!',
								},
								{
									required: true,
									message: 'Please input your first name',
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="Last name">
						{getFieldDecorator('lastName', {
							validateTrigger: ["onChange", "onBlur"],
							initialValue: data ? data.lastName : undefined,
							rules: [
								{
									type: 'string',
									message: 'The input is not valid String!',
								},
								{
									required: false,
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="E-mail">
						{getFieldDecorator('emailId', {
							validateTrigger: ["onChange", "onBlur"],
							initialValue: data ? data.emailId : undefined,
							rules: [
								{
									type: 'email',
									message: 'The input is not valid E-mail!',
								},
								{
									required: true,
									message: 'Please input your E-mail!',
								}
							]
						})(<Input />)}
					</Form.Item>
					<Form.Item label="Mobile no.">
						{getFieldDecorator('phNo', {
							validateTrigger: ["onChange", "onBlur"],
							initialValue: data ? data.phNo : undefined,
							rules: [
								{
									type: 'string',
									message: 'The input is not valid number!'
								},
								{
									required: true,
									message: 'Please input your mobile no.'
								},
								{
									len: 10,
									message: 'Please input 10 digit mobile no.'
								}
							]
						})(<Input type={'number'} />)}
					</Form.Item>
					<Form.Item label="Address">
						{getFieldDecorator('address', {
							validateTrigger: ["onChange", "onBlur"],
							initialValue: data ? data.address : undefined,
							rules: [
								{
									type: 'string',
									message: 'The input is not valid string!'
								},
								{
									required: true,
									message: 'Please input your address'
								}
							]
						})(<TextArea rows={4} />)}
					</Form.Item>
					<Form.Item {...tailFormItemLayout}>
						<Button type="primary" htmlType="submit">
							Submit
					  </Button>
					</Form.Item>
				</Form>
			</div >
		</Modal>
	}
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(AddressFormModal);

const form = connect(mapStateToProps, { addAddress, updateAddress })(WrappedRegistrationForm);

export default form;