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
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}
