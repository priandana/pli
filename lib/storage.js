import { kv } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

// Check if running on Vercel
const isProduction = process.env.VERCEL === '1'
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

/**
 * Get data from storage
 * Uses Vercel KV in production, JSON file locally
 */
export async function getData() {
    try {
        if (isProduction) {
            // Use Vercel KV in production
            console.log('Reading from Vercel KV...')

            try {
                const data = await kv.get('gudang-prakasa-data')

                if (!data) {
                    console.log('No data in KV, initializing with default data')
                    // Initialize with default data if empty
                    await kv.set('gudang-prakasa-data', defaultData)
                    return defaultData
                }

                return data
            } catch (kvError) {
                console.error('Vercel KV error:', kvError.message)

                // Check if KV is not configured
                if (kvError.message.includes('KV_REST_API_URL') ||
                    kvError.message.includes('KV_REST_API_TOKEN') ||
                    kvError.message.includes('not found') ||
                    kvError.message.includes('undefined')) {
                    throw new Error(
                        'Vercel KV is not configured. Please set up Vercel KV in your Vercel dashboard: ' +
                        'https://vercel.com/docs/storage/vercel-kv/quickstart'
                    )
                }

                // For other KV errors, throw them
                throw kvError
            }
        } else {
            // Use JSON file locally
            return getLocalData()
        }
    } catch (error) {
        console.error('Error getting data:', error)
        throw error // Re-throw to let API routes handle it
    }
}

// Helper function to get data from local JSON file
function getLocalData() {
    try {
        console.log('Reading from local JSON file...')

        // Ensure directory exists
        const dataDir = path.dirname(dataPath)
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        // Read or create file
        if (!fs.existsSync(dataPath)) {
            fs.writeFileSync(dataPath, JSON.stringify(defaultData, null, 2))
            return defaultData
        }

        const fileData = fs.readFileSync(dataPath, 'utf8')
        return JSON.parse(fileData)
    } catch (error) {
        console.error('Error reading local data:', error)
        return defaultData
    }
}

/**
 * Save data to storage
 * Uses Vercel KV in production, JSON file locally
 */
export async function setData(data) {
    try {
        if (isProduction) {
            // Use Vercel KV in production
            console.log('Writing to Vercel KV...')

            try {
                await kv.set('gudang-prakasa-data', data)
            } catch (kvError) {
                console.error('Vercel KV error:', kvError.message)

                // Check if KV is not configured
                if (kvError.message.includes('KV_REST_API_URL') ||
                    kvError.message.includes('KV_REST_API_TOKEN') ||
                    kvError.message.includes('not found') ||
                    kvError.message.includes('undefined')) {
                    throw new Error(
                        'Vercel KV is not configured. Please set up Vercel KV in your Vercel dashboard: ' +
                        'https://vercel.com/docs/storage/vercel-kv/quickstart'
                    )
                }

                // For other KV errors, throw them
                throw kvError
            }
        } else {
            // Use JSON file locally
            setLocalData(data)
        }
    } catch (error) {
        console.error('Error setting data:', error)
        throw error
    }
}

// Helper function to save data to local JSON file
function setLocalData(data) {
    try {
        console.log('Writing to local JSON file...')

        // Ensure directory exists
        const dataDir = path.dirname(dataPath)
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true })
        }

        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('Error writing local data:', error)
        throw error
    }
}
