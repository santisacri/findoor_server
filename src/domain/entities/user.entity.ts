


export interface IUserEntityProps {
    id: string,
    name: string,
    password: string,
    email: string,
    createdAt: Date,
    phone?: number | null,
}

export class UserEntity {
    
    private constructor(
        public id: string,
        public name: string,
        public password: string,
        public email: string,
        public createdAt: Date,
        public phone?: number | null
    ) { }

    static fromObject(props: IUserEntityProps) {
        return new UserEntity(
            props.id,
            props.name,
            props.password,
            props.email,
            props.createdAt,
            props.phone
        )
    }

    get toJson() {
        const { password, ...rest } = this
        return rest
    }
}