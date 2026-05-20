import multer from 'multer'

export const uploadMiddleware = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_, file, cb) => {
        const allowed = ['image/jpeg', 'image/png', 'image/webp']
        allowed.includes(file.mimetype)
            ? cb(null, true)
            : cb(new Error('Formato no permitido'))
    }
})