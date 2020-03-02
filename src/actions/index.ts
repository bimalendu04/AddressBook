import { ActionTypes, IAddressModel } from '../models/AddressBook';

export function addAddress(payload: IAddressModel) {
	return { type: ActionTypes.ADD_ADDRESS, payload }
};

export function deleteAddress(payload: string) {
	return { type: ActionTypes.DELETE_ADDRESS, payload }
};

export function updateAddress(payload: IAddressModel) {
	return { type: ActionTypes.UPDATE_ADDRESS, payload }
};