import { IPhotoDatasurce } from "../../domain/contracts/datasources/photo.datasource.interface";
import { IPhotoRepository } from "../../domain/contracts/repositories/photo.repository.interface";
import { PhotoEntity } from "../../domain/entities/photo.entity";


export class PhotoRepository implements IPhotoRepository {

    constructor(
        private readonly photoDatasource: IPhotoDatasurce
    ) { }

    createMany(photos: { url: string; publicId: string; propertyId: string; order: number; }[]): Promise<PhotoEntity[]> {
        return this.photoDatasource.createMany(photos)
    }

    delete(photoId: string): Promise<void> {
        return this.photoDatasource.delete(photoId)
    }

    findByPropertyId(propertyId: string): Promise<PhotoEntity[]> {
        return this.photoDatasource.findByPropertyId(propertyId)
    }

    findById(photoId: string): Promise<PhotoEntity> {
        return this.photoDatasource.findById(photoId)
    }

}