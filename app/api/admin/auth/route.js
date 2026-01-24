import { NextResponse } from 'next/server'
import { getData } from '../../../../lib/storage'

export async function POST(request) {
    try {
        const { username, password } = await request.json()

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username dan password harus diisi' },
                { status: 400 }
            )
        }

        const data = await getData()

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
