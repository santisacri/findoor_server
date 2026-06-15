import { NextFunction, Request, Response } from "express";
import { IUploadPhotosUseCase } from "../../application/use-cases/photo/upload-photos.use-case";
import { IDeletePhotoUseCase } from "../../application/use-cases/property/delete-photo.use-case";


interface UseCases {
    uploadPhotosUseCase: IUploadPhotosUseCase,
    deletePhotoUseCase: IDeletePhotoUseCase,
}

export class PhotoController {

    constructor(
        private readonly useCases: UseCases
    ) { }


    uploadPhotos = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const files = req.files as Express.Multer.File[]
            const photos = await this.useCases.uploadPhotosUseCase.execute(
                req.params.propertyId as string,
                req.user!.id,
                files
            )
            res.json({ photos: photos.map( photo => photo.url)})
        } catch (error) {
            next(error)
        }
    }

    deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { propertyId, photoId } = req.params
            await this.useCases.deletePhotoUseCase.execute(photoId as string, propertyId as string, req.user!.id)
            res.status(200).json({ messge: 'Photo deleted succesfully' })
        } catch (error) {
            next(error)
        }
    }

}