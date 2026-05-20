import { PhotoEntity } from "../../entities/photo.entity";

export interface IPhotoRepository {
    createMany(photos: { url: string; publicId: string; propertyId: string; order: number }[]): Promise<PhotoEntity[]>
    delete(photoId: string): Promise<void>
    findByPropertyId(propertyId: string): Promise<PhotoEntity[]>
    findById(photoId: string): Promise<PhotoEntity>
}