export interface IAddressModel {
    id: string;
    firstName: string;
    lastName: string;
    emailId: string;
    phNo: number;
    address: string;
}

export enum ActionTypes {
    ADD_ADDRESS = "ADD_ADDRESS",
    DELETE_ADDRESS = "DELETE_ADDRESS",
    UPDATE_ADDRESS = "UPDATE_ADDRESS"
}

export interface ISearchAddress {
    name: string;
}

export interface IDeletePayload {
    id: string;
}