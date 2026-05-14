

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
        return new ContactLeadEntity(props)
    }
}