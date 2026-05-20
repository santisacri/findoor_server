import { v2 as cloudinary } from 'cloudinary'
import { envs } from '../../env.schema';
import { ICloudinaryService, IUploadResult } from '../../domain/contracts/services/cloudinary.service.interface';

cloudinary.config({
    cloud_name: envs.CLOUDINARY_CLOUD_NAME,
    api_key: envs.CLOUDINARY_API_KEY,
    api_secret: envs.CLOUDINARY_API_SECRET,
})

export class CloudinaryService implements ICloudinaryService {
    async upload(buffer: Buffer, folder: string): Promise<IUploadResult> {
        return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder, resource_type: 'image' },
                (error, result) => {
                    if (error || !result) return reject(error)
                    resolve({ url: result.secure_url, publicId: result.public_id })
                }
            ).end(buffer)
        })
    }

    async delete(publicId: string): Promise<void> {
        await cloudinary.uploader.destroy(publicId)
    }

    async deleteMany(publicIds: string[]): Promise<void> {
        await Promise.all(publicIds.map(id => this.delete(id)))
    }
}