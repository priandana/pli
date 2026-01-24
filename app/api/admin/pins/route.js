import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'links.json')

function readData() {
    const data = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(data)
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

// GET - Get PIN for a category
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')

        const data = readData()

        if (category) {
            if (!data.categories[category]) {
                return NextResponse.json(
                    { success: false, message: 'Kategori tidak ditemukan' },
                    { status: 404 }
                )
            }
            return NextResponse.json({
                success: true,
                pin: data.categories[category].pin
            })
        }

        // Return all PINs
        const pins = {}
        Object.keys(data.categories).forEach(cat => {
            pins[cat] = data.categories[cat].pin
        })

        return NextResponse.json({
            success: true,
            pins
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}

// PUT - Update PIN for a category
export async function PUT(request) {
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

        data.categories[category].pin = pin
        writeData(data)

        return NextResponse.json({
            success: true,
            message: 'PIN berhasil diupdate'
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}
