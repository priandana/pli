'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './analytics.module.css'

export default function AnalyticsPage() {
    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/analytics')
            const data = await response.json()

            if (data.success) {
                setAnalytics(data.analytics)
            } else {
                setError(data.message)
            }
        } catch (error) {
            console.error('Error fetching analytics:', error)
            setError('Gagal memuat data analytics')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingState}>
                    <div className={styles.spinner}></div>
                    <p>Memuat analytics...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.errorState}>
                    <p>⚠️ {error}</p>
                    <button onClick={fetchAnalytics} className="btn btn-primary">
                        Coba Lagi
                    </button>
                </div>
            </div>
        )
    }

    const categoryColors = {
        umum: '#667eea',
        finishgood: '#f5576c',
        material: '#4facfe'
    }

    const categoryIcons = {
        umum: '📋',
        finishgood: '📦',
        material: '🔧'
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/" className={styles.backButton}>
                    ← Kembali
                </Link>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>📊 Dashboard Analytics</h1>
                    <p className={styles.subtitle}>Monitor aktivitas dan statistik website</p>
                </div>
                <button onClick={fetchAnalytics} className={styles.refreshButton}>
                    🔄 Refresh
                </button>
            </div>

            {/* Overview Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon}>👁️</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{analytics.totalViews.toLocaleString()}</div>
                        <div className={styles.statLabel}>Total Views</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>🖱️</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{analytics.totalClicks.toLocaleString()}</div>
                        <div className={styles.statLabel}>Total Clicks</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{analytics.totalLinks}</div>
                        <div className={styles.statLabel}>Total Links</div>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon}>📈</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>
                            {analytics.totalClicks > 0
                                ? ((analytics.totalClicks / analytics.totalViews) * 100).toFixed(1)
                                : 0}%
                        </div>
                        <div className={styles.statLabel}>Click Rate</div>
                    </div>
                </div>
            </div>

            <div className={styles.contentGrid}>
                {/* Top Links */}
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>🏆 Top 5 Most Viewed Links</h2>
                    {analytics.topLinks.length === 0 ? (
                        <div className={styles.emptyState}>
                            <p>Belum ada data</p>
                        </div>
                    ) : (
                        <div className={styles.topLinksList}>
                            {analytics.topLinks.map((link, index) => (
                                <div key={link.id} className={styles.topLinkItem}>
                                    <div className={styles.topLinkRank}>#{index + 1}</div>
                                    <div className={styles.topLinkInfo}>
                                        <div className={styles.topLinkTitle}>{link.title}</div>
                                        <div className={styles.topLinkCategory}>
                                            {categoryIcons[link.category]} {link.category}
                                        </div>
                                    </div>
                                    <div className={styles.topLinkStats}>
                                        <div className={styles.topLinkStat}>
                                            <span className={styles.topLinkStatValue}>{link.views}</span>
                                            <span className={styles.topLinkStatLabel}>views</span>
                                        </div>
                                        <div className={styles.topLinkStat}>
                                            <span className={styles.topLinkStatValue}>{link.clicks}</span>
                                            <span className={styles.topLinkStatLabel}>clicks</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Category Stats */}
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>📂 Stats per Kategori</h2>
                    <div className={styles.categoryStats}>
                        {Object.entries(analytics.categoryStats).map(([catName, stats]) => (
                            <div key={catName} className={styles.categoryStatItem}>
                                <div className={styles.categoryStatHeader}>
                                    <div className={styles.categoryStatIcon}>
                                        {categoryIcons[catName]}
                                    </div>
                                    <div className={styles.categoryStatInfo}>
                                        <div className={styles.categoryStatName}>
                                            {catName.charAt(0).toUpperCase() + catName.slice(1)}
                                        </div>
                                        <div className={styles.categoryStatCount}>
                                            {stats.linkCount} links
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.categoryStatBars}>
                                    <div className={styles.statBar}>
                                        <div className={styles.statBarLabel}>
                                            <span>Views</span>
                                            <span>{stats.views}</span>
                                        </div>
                                        <div className={styles.statBarTrack}>
                                            <div
                                                className={styles.statBarFill}
                                                style={{
                                                    width: `${Math.min((stats.views / analytics.totalViews) * 100, 100)}%`,
                                                    background: categoryColors[catName]
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className={styles.statBar}>
                                        <div className={styles.statBarLabel}>
                                            <span>Clicks</span>
                                            <span>{stats.clicks}</span>
                                        </div>
                                        <div className={styles.statBarTrack}>
                                            <div
                                                className={styles.statBarFill}
                                                style={{
                                                    width: `${Math.min((stats.clicks / analytics.totalClicks) * 100, 100)}%`,
                                                    background: categoryColors[catName]
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>🕐 Recent Activity</h2>
                {analytics.recentActivity.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Belum ada aktivitas</p>
                    </div>
                ) : (
                    <div className={styles.activityList}>
                        {analytics.recentActivity.map((activity, index) => (
                            <div key={index} className={styles.activityItem}>
                                <div className={styles.activityDot}></div>
                                <div className={styles.activityContent}>
                                    <div className={styles.activityMessage}>{activity.message}</div>
                                    <div className={styles.activityTime}>{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
