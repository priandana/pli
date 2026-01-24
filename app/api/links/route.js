import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'links.json')

// Default data structure
const defaultData = {
    categories: {
        umum: {
            pin: "1234",
            links: []
        },
        finishgood: {
            pin: "5678",
            links: []
        },
        material: {
            pin: "9012",
            links: []
        }
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

        // Create data directory if it doesn't exist
        if (!fs.existsSync(dataDir)) {
            console.log('Creating data directory...')
            fs.mkdirSync(dataDir, { recursive: true })
        }

        // Create links.json if it doesn't exist
        if (!fs.existsSync(dataPath)) {
            console.log('Creating links.json with default data...')
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
        // Return default data if file cannot be read
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

// GET - Fetch links by category
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
                links: data.categories[category].links
            })
        }

        // Return all categories
        return NextResponse.json({
            success: true,
            categories: data.categories
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}

// POST - Add new link
export async function POST(request) {
    try {
        const { category, title, url, description } = await request.json()

        if (!category || !title || !url) {
            return NextResponse.json(
                { success: false, message: 'Category, title, dan URL harus diisi' },
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

        const newLink = {
            id: Date.now().toString(),
            title,
            url,
            description: description || ''
        }

        data.categories[category].links.push(newLink)
        writeData(data)

        return NextResponse.json({
            success: true,
            message: 'Link berhasil ditambahkan',
            link: newLink
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}

// PUT - Update link
export async function PUT(request) {
    try {
        const body = await request.json()
        const { category, id, title, url, description } = body

        console.log('PUT request received:', { category, id, title, url, description })

        if (!category || !id) {
            console.error('Missing category or id:', { category, id })
            return NextResponse.json(
                { success: false, message: 'Category dan ID harus diisi' },
                { status: 400 }
            )
        }

        const data = readData()

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

        writeData(data)

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

        const data = readData()

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
        writeData(data)

        return NextResponse.json({
            success: true,
            message: 'Link berhasil dihapus'
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        )
    }
}
