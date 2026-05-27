import { CustomError } from "../errors/custom-errors";

export interface IUserEntityProps {
    id: string
    name: string
    password: string
    email: string
    createdAt: Date
    isVerified: boolean
    phone?: number | null
}

export class UserEntity {

    private constructor(
        public id: string,
        public name: string,
        public password: string,
        public email: string,
        public createdAt: Date,
        public isVerified: boolean,
        public phone?: number | null
    ) { }

    static fromObject(props: IUserEntityProps): UserEntity {
        const { id, name, password, email, createdAt, isVerified, phone } = props;

        if (!id) throw CustomError.badRequest('id is required');
        if (!name) throw CustomError.badRequest('name is required');
        if (!password) throw CustomError.badRequest('password is required');
        if (!email) throw CustomError.badRequest('email is required');
        if (!createdAt) throw CustomError.badRequest('createdAt is required');
        if (isVerified === undefined || isVerified === null) throw CustomError.badRequest('isValidated is required');

        return new UserEntity(id, name, password, email, createdAt, isVerified, phone);
    }

    get toJson() {
        const { password, ...rest } = this;
        return rest;
    }
}