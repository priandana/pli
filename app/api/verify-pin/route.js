import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'links.json')

function readData() {
    const data = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(data)
}

export async function POST(request) {
    try {
        const { category, pin } = await request.json()

        if (!category || !pin) {
            return NextResponse.json(
                { success: false, message: 'Category dan PIN harus diisi' },
                { status: 400 }
            )
        }

        const data = readData()

        if (!data.categories[category]) {
            return NextResponse.json(
                { success: false, message: 'Kategori tidak ditemukan' },
                { status: 404 }
            )
        }

        if (data.categories[category].pin === pin) {
            return NextResponse.json({
                success: true,
                message: 'PIN benar'
            })
        } else {
            return NextResponse.json(
                { success: false, message: 'PIN salah' },
                { status: 401 }
            )
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}
