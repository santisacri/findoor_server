import { prisma } from '../src/infraestructure/database/prisma'
import provincesData from './data/provinces.json'
import citiesData from './data/cities.json'
import propertiesData from './data/properties.json'
import bcrypt from 'bcryptjs'
import { Currency, OperationType, PropertyEntity, PropertyType } from '../src/domain/entities/property.entity'
import { envs } from '../src/env.schema'


async function main() {
    console.log('Seeding provinces...')

    await prisma.province.createMany({
        data: provincesData.provincias.map((p: { id: string; nombre: string }) => ({
            id: parseInt(p.id),
            name: p.nombre
        })),
        skipDuplicates: true
    })

    console.log(`✓ ${provincesData.provincias.length} provinces seeded`)

    console.log('Seeding cities...')

    await prisma.city.createMany({
        data: citiesData.municipios.map((m: { id: string; nombre: string; provincia: { id: string } }) => ({
            id: parseInt(m.id),
            name: m.nombre,
            provinceId: parseInt(m.provincia.id)
        })),
        skipDuplicates: true
    })

    console.log(`✓ ${citiesData.municipios.length} cities seeded`)

    console.log('Seeding user...')

    const password = envs.PASSWORD_USER_SEED
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email: 'test@findoor.com' },
        update: {},
        create: {
            name: 'John Doe',
            email: 'test@findoor.com',
            password: passwordHash,
            isVerified: true,
        }
    })

    console.log(`✓ User seeded — email: ${user.email} / password: ${password}`)

    console.log('Seeding properties...')

    const rosario = await prisma.city.findFirst({ where: { name: { contains: 'Rosario', mode: 'insensitive' } } })
    const santaFe = await prisma.province.findFirst({ where: { name: { contains: 'Santa Fe', mode: 'insensitive' } } })

    const properties = propertiesData

    await prisma.property.deleteMany({ where: { ownerId: user.id } })

    for (const property of propertiesData) {
        await prisma.property.create({
            data: {
                ...property,
                ownerId: user.id,  // ← acá
                currency: property.currency as Currency,
                operationType: property.operationType as OperationType,
                propertyType: property.propertyType as PropertyType,
                address: {
                    create: {
                        provinceId: santaFe!.id,
                        cityId: rosario!.id,
                        neighborhood: 'Centro',
                        street: 'Córdoba',
                        streetNumber: '1234',
                    }
                }
            }
        })
    }

    console.log(`✓ ${properties.length} properties seeded`)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())