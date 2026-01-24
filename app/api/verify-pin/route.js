import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'links.json')

const defaultData = {
    categories: {
        umum: { pin: "1234", links: [] },
        finishgood: { pin: "5678", links: [] },
        material: { pin: "9012", links: [] }
    },
    admin: { username: "admin", password: "admin123" },
    analytics: { totalViews: 0, totalClicks: 0, linkStats: {}, recentActivity: [] }
}

function ensureDataFileExists() {
    try {
        const dataDir = path.join(process.cwd(), 'data')
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2))
        }
    } catch (error) {
        console.error('Error ensuring data file exists:', error)
    }
}

function readData() {
    try {
        ensureDataFileExists()
        const data = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading data file:', error)
        return defaultData
    }
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
        console.error('Error in POST /api/verify-pin:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
            { status: 500 }
        )
    }
}
