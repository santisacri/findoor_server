export interface IUploadResult {
  url: string
  publicId: string
}

export interface ICloudinaryService {
    upload(buffer: Buffer, folder: string): Promise<IUploadResult>
    delete(publicId: string): Promise<void>
    deleteMany(publicIds: string[]): Promise<void>
}