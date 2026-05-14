import { CustomError } from "../errors/custom-errors"


interface ContactLeadEntityProps {
    id: string
    propertyId: string
    senderId: string
    message: string
    isRead: boolean
    createdAt: Date
}

export class ContactLeadEntity {
    private constructor(
        private props: ContactLeadEntityProps
    ) { }


    static fromObject(props: ContactLeadEntityProps) {
        const { createdAt, id, isRead, message, propertyId, senderId } = props

        if (!id) throw CustomError.badRequest('Missing id')
        if (!propertyId) throw CustomError.badRequest('Missing propertyId')
        if (!senderId) throw CustomError.badRequest('Missing senderId')
        if (!message) throw CustomError.badRequest('Missing message')
        if (!isRead) throw CustomError.badRequest('Missing isRead')
        if (!createdAt) throw CustomError.badRequest('Missing createdAt')

        return new ContactLeadEntity(props)
    }
}