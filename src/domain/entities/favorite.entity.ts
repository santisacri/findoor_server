

interface FavoriteEntityProps {
    id: string
    userId: string
    propertyId: string
    createdAt: Date
}

export class FavoriteEntity {
    private constructor(
        private props: FavoriteEntityProps
    ) { }


    static fromObject(props: FavoriteEntityProps) {
        return new FavoriteEntity(props)
    }
}