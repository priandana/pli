import { NextResponse } from 'next/server'
import { getData } from '../../../lib/storage'

export async function POST(request) {
    try {
        const { category, pin } = await request.json()

        if (!category || !pin) {
            return NextResponse.json(
                { success: false, message: 'Category dan PIN harus diisi' },
                { status: 400 }
            )
        }

        const data = await getData()

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
