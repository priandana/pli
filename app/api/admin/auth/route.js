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

export async function POST(request) {
    try {
        const { username, password } = await request.json()

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username dan password harus diisi' },
                { status: 400 }
            )
        }

        const data = readData()

        if (data.admin.username === username && data.admin.password === password) {
            return NextResponse.json({
                success: true,
                message: 'Login berhasil'
            })
        } else {
            return NextResponse.json(
                { success: false, message: 'Username atau password salah' },
                { status: 401 }
            )
        }
    } catch (error) {
        console.error('Error in POST /api/admin/auth:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
            { status: 500 }
        )
    }
}
