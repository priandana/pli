import { NextResponse } from 'next/server'
import { getData, setData } from '../../../../lib/storage'

// GET - Get PIN for a category
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')

        const data = await getData()

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

        const data = await getData()

        if (!data.categories[category]) {
            return NextResponse.json(
                { success: false, message: 'Kategori tidak ditemukan' },
                { status: 404 }
            )
        }

        data.categories[category].pin = pin
        await setData(data)

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
