import { ContactLeadEntity } from "./contact-lead.entity";
import { FavoriteEntity } from "./favorite.entity";
import { PropertyEntity } from "./property.entity";


export enum Role {
    SEEKER,
    OWNER
}

interface UserEntityProps {
    id: string,
    name: string,
    email: string,
    role: Role,
    createdAt: Date,
    properties?: PropertyEntity[],
    favorites?: FavoriteEntity[],
    contactLeads?: ContactLeadEntity[],
    phone?: string,
}

export class UserEntity {

    private constructor(private props: UserEntityProps) { }

    static fromObject(props: UserEntityProps) {
        return new UserEntity(props)
    }
}