import { CustomError } from "../errors/custom-errors"

interface ContactLeadEntityProps {
    id: string
    propertyId: string
    senderId: string
    senderName: string
    message: string
    isRead: boolean
    createdAt: Date
}

export class ContactLeadEntity {
    private constructor(
        public id: string,
        public propertyId: string,
        public senderId: string,
        public senderName: string,
        public message: string,
        public isRead: boolean,
        public createdAt: Date
    ) { }

    static fromObject(props: ContactLeadEntityProps) {
        const { id, propertyId, senderId, senderName, message, isRead, createdAt } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!propertyId) throw CustomError.badRequest('Missing propertyId')
        if (!senderId) throw CustomError.badRequest('Missing senderId')
        if (!senderName) throw CustomError.badRequest('Missing senderName')
        if (!message) throw CustomError.badRequest('Missing message')
        if (isRead == null) throw CustomError.badRequest('Missing isRead')
        if (!createdAt) throw CustomError.badRequest('Missing createdAt')

        return new ContactLeadEntity(id, propertyId, senderId, senderName, message, isRead, createdAt)
    }
}