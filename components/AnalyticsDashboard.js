'use client'

import { useEffect, useState } from 'react'
import styles from './AnalyticsDashboard.module.css'

export default function AnalyticsDashboard() {
    const [analytics, setAnalytics] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
            const response = await fetch('/api/analytics')
            const data = await response.json()
            if (data.success) {
                setAnalytics(data.analytics)
            }
        } catch (error) {
            console.error('Error fetching analytics:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading analytics...</p>
            </div>
        )
    }

    if (!analytics) {
        return (
            <div className={styles.error}>
                <p>Failed to load analytics data</p>
            </div>
        )
    }

    const { totalViews, totalClicks, totalLinks, categoryStats, topLinks, recentActivity } = analytics

    return (
        <div className={styles.dashboard}>
            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.purple}`}>
                    <div className={styles.statIcon}>👁️</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalViews.toLocaleString()}</div>
                        <div className={styles.statLabel}>Total Views</div>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.pink}`}>
                    <div className={styles.statIcon}>🖱️</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalClicks.toLocaleString()}</div>
                        <div className={styles.statLabel}>Total Clicks</div>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.cyan}`}>
                    <div className={styles.statIcon}>📊</div>
                    <div className={styles.statContent}>
                        <div className={styles.statValue}>{totalLinks}</div>
                        <div className={styles.statLabel}>Active Links</div>
                    </div>
                </div>
            </div>

            {/* Category Breakdown */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>📈 Category Breakdown</h3>
                <div className={styles.categoryGrid}>
                    {Object.entries(categoryStats).map(([category, stats]) => (
                        <div key={category} className={styles.categoryCard}>
                            <div className={styles.categoryHeader}>
                                <span className={styles.categoryName}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </span>
                                <span className={styles.categoryCount}>{stats.linkCount} links</span>
                            </div>
                            <div className={styles.categoryStats}>
                                <div className={styles.categoryStat}>
                                    <span className={styles.categoryStatLabel}>Views</span>
                                    <span className={styles.categoryStatValue}>{stats.views}</span>
                                </div>
                                <div className={styles.categoryStat}>
                                    <span className={styles.categoryStatLabel}>Clicks</span>
                                    <span className={styles.categoryStatValue}>{stats.clicks}</span>
                                </div>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${(stats.views / totalViews) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Links */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>🔥 Top 5 Most Viewed Links</h3>
                <div className={styles.topLinksList}>
                    {topLinks.map((link, index) => (
                        <div key={link.id} className={styles.topLinkItem}>
                            <div className={styles.topLinkRank}>#{index + 1}</div>
                            <div className={styles.topLinkInfo}>
                                <div className={styles.topLinkTitle}>{link.title}</div>
                                <div className={styles.topLinkCategory}>{link.category}</div>
                            </div>
                            <div className={styles.topLinkStats}>
                                <span className={styles.topLinkStat}>
                                    👁️ {link.views}
                                </span>
                                <span className={styles.topLinkStat}>
                                    🖱️ {link.clicks}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>⏱️ Recent Activity</h3>
                <div className={styles.activityList}>
                    {recentActivity.map((activity, index) => (
                        <div key={index} className={styles.activityItem}>
                            <div className={styles.activityDot}></div>
                            <div className={styles.activityContent}>
                                <div className={styles.activityText}>{activity.message}</div>
                                <div className={styles.activityTime}>{activity.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
