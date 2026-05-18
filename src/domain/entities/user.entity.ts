

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

    public id: string
    public name: string
    public password: string
    public email: string
    public role: Role
    public createdAt: Date
    public phone?: number | null

    private constructor( props: IUserEntityProps ) {
        this.id = props.id
        this.name = props.name
        this.password = props.password
        this.email = props.email
        this.role = props.role
        this.createdAt = props.createdAt
        this.phone = props.phone
    }

    static fromObject(props: IUserEntityProps) {
        return new UserEntity(props)
    }

    get toJson() {
        const { password, ...rest } = this
        return rest
    }
}