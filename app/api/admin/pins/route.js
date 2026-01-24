import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'links.json')

// Default data structure
const defaultData = {
    categories: {
        umum: { pin: "1234", links: [] },
        finishgood: { pin: "5678", links: [] },
        material: { pin: "9012", links: [] }
    },
    admin: {
        username: "admin",
        password: "admin123"
    },
    analytics: {
        totalViews: 0,
        totalClicks: 0,
        linkStats: {},
        recentActivity: []
    }
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

function writeData(data) {
    try {
        ensureDataFileExists()
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('Error writing data file:', error)
        throw error
    }
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
        console.error('Error in GET /api/admin/pins:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
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
        console.error('Error in PUT /api/admin/pins:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
            { status: 500 }
        )
    }
}
