import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'links.json')

function readData() {
    const data = fs.readFileSync(dataPath, 'utf8')
    return JSON.parse(data)
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
}

// Initialize analytics structure if it doesn't exist
function ensureAnalytics(data) {
    if (!data.analytics) {
        data.analytics = {
            totalViews: 0,
            totalClicks: 0,
            linkStats: {},
            recentActivity: []
        }
    }
    return data
}

// GET - Fetch analytics data
export async function GET(request) {
    try {
        let data = readData()
        data = ensureAnalytics(data)

        // Calculate statistics
        const totalLinks = Object.values(data.categories).reduce(
            (sum, cat) => sum + cat.links.length,
            0
        )

        // Category stats
        const categoryStats = {}
        Object.entries(data.categories).forEach(([catName, catData]) => {
            const catViews = catData.links.reduce((sum, link) => {
                const linkStat = data.analytics.linkStats[link.id] || { views: 0, clicks: 0 }
                return sum + linkStat.views
            }, 0)

            const catClicks = catData.links.reduce((sum, link) => {
                const linkStat = data.analytics.linkStats[link.id] || { views: 0, clicks: 0 }
                return sum + linkStat.clicks
            }, 0)

            categoryStats[catName] = {
                linkCount: catData.links.length,
                views: catViews,
                clicks: catClicks
            }
        })

        // Top 5 most viewed links
        const allLinks = []
        Object.entries(data.categories).forEach(([catName, catData]) => {
            catData.links.forEach(link => {
                const stats = data.analytics.linkStats[link.id] || { views: 0, clicks: 0 }
                allLinks.push({
                    id: link.id,
                    title: link.title,
                    category: catName,
                    views: stats.views,
                    clicks: stats.clicks
                })
            })
        })

        const topLinks = allLinks
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)

        // Recent activity (last 10)
        const recentActivity = (data.analytics.recentActivity || []).slice(0, 10)

        return NextResponse.json({
            success: true,
            analytics: {
                totalViews: data.analytics.totalViews,
                totalClicks: data.analytics.totalClicks,
                totalLinks,
                categoryStats,
                topLinks,
                recentActivity
            }
        })
    } catch (error) {
        console.error('Analytics GET error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to fetch analytics' },
            { status: 500 }
        )
    }
}

// POST - Track analytics event
export async function POST(request) {
    try {
        const { linkId, eventType, linkTitle, category } = await request.json()

        if (!linkId || !eventType) {
            return NextResponse.json(
                { success: false, message: 'Link ID and event type are required' },
                { status: 400 }
            )
        }

        let data = readData()
        data = ensureAnalytics(data)

        // Initialize link stats if not exists
        if (!data.analytics.linkStats[linkId]) {
            data.analytics.linkStats[linkId] = {
                views: 0,
                clicks: 0,
                lastAccessed: null
            }
        }

        // Update stats
        if (eventType === 'view') {
            data.analytics.totalViews++
            data.analytics.linkStats[linkId].views++
        } else if (eventType === 'click') {
            data.analytics.totalClicks++
            data.analytics.linkStats[linkId].clicks++
        }

        data.analytics.linkStats[linkId].lastAccessed = new Date().toISOString()

        // Add to recent activity
        if (!data.analytics.recentActivity) {
            data.analytics.recentActivity = []
        }

        const activityMessage = eventType === 'view'
            ? `Link "${linkTitle}" was viewed in ${category}`
            : `Link "${linkTitle}" was clicked in ${category}`

        data.analytics.recentActivity.unshift({
            message: activityMessage,
            time: new Date().toLocaleString('id-ID'),
            timestamp: new Date().toISOString()
        })

        // Keep only last 50 activities
        if (data.analytics.recentActivity.length > 50) {
            data.analytics.recentActivity = data.analytics.recentActivity.slice(0, 50)
        }

        writeData(data)

        return NextResponse.json({
            success: true,
            message: 'Analytics tracked successfully'
        })
    } catch (error) {
        console.error('Analytics POST error:', error)
        return NextResponse.json(
            { success: false, message: 'Failed to track analytics' },
            { status: 500 }
        )
    }
}
