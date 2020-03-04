import * as React from 'react';
import { Form, Input, Button, notification, Icon } from 'antd';
import Styles from './styles.module.scss';
import { connect } from 'react-redux';
import { IAddressModel } from '../../models/AddressBook';
import { addAddress, updateAddress } from '../../actions';
import _ from 'lodash';
import { RouteComponentProps } from 'react-router-dom';
import history from '../../history';

const { TextArea } = Input;

export interface IAddEditFormProps extends mapDispatchToProps, RouteComponentProps<{ id: string }> {
	addressBook: IAddressModel[];
	form: any;
}

export interface IAddEditFormState {
	id?: string;
}

const mapStateToProps = (state: any) => {
	return { addressBook: state.addressBook };
};

export type mapDispatchToProps = {
	addAddress: (address: IAddressModel) => void;
	updateAddress: (address: IAddressModel) => void;
}

class AddEditFormComponent extends React.Component<IAddEditFormProps, IAddEditFormState> {
	constructor(props: IAddEditFormProps) {
		super(props);
		this.state = {
			id: this.props.match.params.id
		};
		document.title = 'Address Book';
	}

	private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err: any, values: any) => {
			if (!err) {
				if (this.props.match.params.id) {
					values.id = this.state.id;
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

	private goToHome() {
		history.push(`/`);
	}

	public render() {
		let data: IAddressModel | undefined;
		if (this.state.id) {
			data = _.filter(this.props.addressBook, { id: this.props.match.params.id })[0];
		} else {
			data = undefined;
		}
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
				xl: { span: 4 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
				xl: { span: 8 }
			},
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 16,
					offset: 8,
				},
				xl: {
					span: 16,
					offset: 4,
				},
			}
		};
		return <div className={`${Styles.formContainer}`
		}>
			{window.location.pathname.includes(`/address/edit/${this.props.match.params.id}`) && <Icon onClick={() => this.goToHome()} className={Styles.backBtn} type="left-circle" theme="outlined" />}
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
		</div >;
	}
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(AddEditFormComponent);

const form = connect(mapStateToProps, { addAddress, updateAddress })(WrappedRegistrationForm);

export default form;