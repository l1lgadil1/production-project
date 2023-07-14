import {UserRole} from "entities/User/model/consts/consts";

export interface User {
    id: string;
    username: string;
    avatar?: string;
    roles?:UserRole[];
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}
