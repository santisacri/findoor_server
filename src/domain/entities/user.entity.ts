

export enum Role {
    SEEKER,
    OWNER
}

export interface IUserEntityProps {
    id: string,
    name: string,
    password: string,
    email: string,
    role: Role,
    createdAt: Date,
    phone?: number | null,
}

export class UserEntity {

    private constructor(private props: IUserEntityProps) { }

    static fromObject(props: IUserEntityProps) {
        return new UserEntity(props)
    }

    get toJson() {
        const {password, ...rest} = this.props

        return rest
    }
}