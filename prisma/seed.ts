import { prisma } from '../src/infraestructure/database/prisma'
import provincesData from './data/provinces.json'
import citiesData from './data/cities.json'


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
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())