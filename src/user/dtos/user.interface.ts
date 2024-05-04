export const basicUserInfoSelectQuery = {
    _id: 1, 
    firstName: 1, 
    lastName: 1,
    phoneNumber: 1,
    avatar: 1 
}

export interface IBasicUserInfo {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
}