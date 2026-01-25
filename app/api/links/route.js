import { NextResponse } from 'next/server'
import { getData, setData } from '../../../lib/storage'

// GET - Fetch links by category
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
                links: data.categories[category].links
            })
        }

        // Return all categories
        return NextResponse.json({
            success: true,
            categories: data.categories
        })
    } catch (error) {
        console.error('Error in GET /api/links:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
            { status: 500 }
        )
    }
}

// POST - Add new link
export async function POST(request) {
    try {
        const { category, title, url, description, tags } = await request.json()

        if (!category || !title || !url) {
            return NextResponse.json(
                { success: false, message: 'Category, title, dan URL harus diisi' },
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

        const newLink = {
            id: Date.now().toString(),
            title,
            url,
            description: description || '',
            tags: tags || []
        }

        data.categories[category].links.push(newLink)
        await setData(data)

        return NextResponse.json({
            success: true,
            message: 'Link berhasil ditambahkan',
            link: newLink
        })
    } catch (error) {
        console.error('Error in POST /api/links:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
            { status: 500 }
        )
    }
}

// PUT - Update link
export async function PUT(request) {
    try {
        const body = await request.json()
        const { category, id, title, url, description, tags } = body

        console.log('PUT request received:', { category, id, title, url, description, tags })

        if (!category || !id) {
            console.error('Missing category or id:', { category, id })
            return NextResponse.json(
                { success: false, message: 'Category dan ID harus diisi' },
                { status: 400 }
            )
        }

        const data = await getData()

        if (!data.categories[category]) {
            console.error('Category not found:', category)
            return NextResponse.json(
                { success: false, message: 'Kategori tidak ditemukan' },
                { status: 404 }
            )
        }

        const linkIndex = data.categories[category].links.findIndex(link => link.id === id)

        if (linkIndex === -1) {
            console.error('Link not found:', { category, id })
            return NextResponse.json(
                { success: false, message: 'Link tidak ditemukan' },
                { status: 404 }
            )
        }

        // Update link fields
        if (title) data.categories[category].links[linkIndex].title = title
        if (url) data.categories[category].links[linkIndex].url = url
        if (description !== undefined) data.categories[category].links[linkIndex].description = description
        if (tags !== undefined) data.categories[category].links[linkIndex].tags = tags

        await setData(data)

        console.log('Link updated successfully:', data.categories[category].links[linkIndex])

        return NextResponse.json({
            success: true,
            message: 'Link berhasil diupdate',
            link: data.categories[category].links[linkIndex]
        })
    } catch (error) {
        console.error('Error in PUT /api/links:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
            { status: 500 }
        )
    }
}

// DELETE - Delete link
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url)
        const category = searchParams.get('category')
        const id = searchParams.get('id')

        if (!category || !id) {
            return NextResponse.json(
                { success: false, message: 'Category dan ID harus diisi' },
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

        const linkIndex = data.categories[category].links.findIndex(link => link.id === id)

        if (linkIndex === -1) {
            return NextResponse.json(
                { success: false, message: 'Link tidak ditemukan' },
                { status: 404 }
            )
        }

        data.categories[category].links.splice(linkIndex, 1)
        await setData(data)

        return NextResponse.json({
            success: true,
            message: 'Link berhasil dihapus'
        })
    } catch (error) {
        console.error('Error in DELETE /api/links:', error)
        return NextResponse.json(
            { success: false, message: `Terjadi kesalahan server: ${error.message}` },
            { status: 500 }
        )
    }
}
