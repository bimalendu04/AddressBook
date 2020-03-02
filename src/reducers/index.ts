import { IAddressModel, ActionTypes, ISearchAddress, IDeletePayload } from "../models/AddressBook";
import _ from 'lodash';

export interface IAction {
    type: ActionTypes,
    payload: IAddressModel | ISearchAddress | IDeletePayload
}

export interface IAddress {
    addressBook: IAddressModel[];
}

const initialState = {
    addressBook: []
};

const rootReducer = (state: IAddress = initialState, action: IAction) => {
    let payload;
    let actionPayload: IAddressModel | IDeletePayload;
    switch (action.type) {
        case 'ADD_ADDRESS':
            payload = action.payload as IAddressModel;
            let id = (state.addressBook.length + 1).toString();
            payload.id = id;
            return Object.assign({}, state, {
                addressBook: state.addressBook.concat(payload)
            });

        case 'UPDATE_ADDRESS':
            payload = JSON.parse(JSON.stringify(state.addressBook));
            // let addressToUpdate = addressBook.filter((address: IAddressModel) => address.id === action.payload.id)[0];
            actionPayload = action.payload as IAddressModel;
            let indexToUpdate = _.findIndex(payload, { id: actionPayload.id });
            payload.splice(indexToUpdate, 1, action.payload);
            return Object.assign({}, state, {
                addressBook: payload
            });

        case 'DELETE_ADDRESS':
            payload = JSON.parse(JSON.stringify(state.addressBook));
            actionPayload = action.payload as IDeletePayload;
            let addressToDelete = payload.filter((address: IAddressModel) => address.id === actionPayload.id)[0];
            payload.splice(payload.indexOf(addressToDelete), 1);
            return Object.assign({}, state, {
                addressBook: payload
            });

        default:
            return state;
    }
}

export default rootReducer