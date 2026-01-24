'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchBar from '../../components/SearchBar'
import LoadingSkeleton from '../../components/LoadingSkeleton'
import Toast from '../../components/Toast'
import styles from './category.module.css'

export default function CategoryPage({ params }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [pin, setPin] = useState('')
    const [error, setError] = useState('')
    const [links, setLinks] = useState([])
    const [filteredLinks, setFilteredLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('default')
    const [toast, setToast] = useState(null)

    const categoryInfo = {
        umum: {
            title: 'Umum',
            icon: '📋',
            description: 'Spreadsheet untuk keperluan umum',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }
    }

    const category = 'umum'
    const info = categoryInfo[category]

    useEffect(() => {
        // Check if already authenticated in session
        const auth = sessionStorage.getItem(`auth_${category}`)
        if (auth === 'true') {
            setIsAuthenticated(true)
            fetchLinks()
        }
    }, [])

    useEffect(() => {
        filterAndSortLinks()
    }, [links, searchTerm, sortBy])

    const fetchLinks = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/links?category=${category}`)
            const data = await response.json()
            if (data.success) {
                setLinks(data.links)
                // Track view analytics for each link
                data.links.forEach(link => {
                    trackAnalytics(link.id, 'view', link.title)
                })
            }
        } catch (error) {
            console.error('Error fetching links:', error)
        } finally {
            setLoading(false)
        }
    }

    const trackAnalytics = async (linkId, eventType, linkTitle) => {
        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    linkId,
                    eventType,
                    linkTitle,
                    category
                })
            })
        } catch (error) {
            console.error('Error tracking analytics:', error)
        }
    }

    const filterAndSortLinks = () => {
        let filtered = links.filter(link =>
            link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (link.description && link.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )

        // Sort links
        if (sortBy === 'alphabetical') {
            filtered.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sortBy === 'recent') {
            filtered.reverse()
        }

        setFilteredLinks(filtered)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/verify-pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, pin }),
            })

            const data = await response.json()

            if (data.success) {
                sessionStorage.setItem(`auth_${category}`, 'true')
                setIsAuthenticated(true)
                fetchLinks()
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    const handleLinkClick = (link) => {
        trackAnalytics(link.id, 'click', link.title)
    }

    const copyToClipboard = (url, title) => {
        navigator.clipboard.writeText(url)
        showToast(`Link "${title}" berhasil disalin!`, 'success')
    }

    const showToast = (message, type = 'info') => {
        setToast({ message, type })
    }

    const closeToast = () => {
        setToast(null)
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.pinCard}>
                    <Link href="/" className={styles.backButton}>
                        ← Kembali
                    </Link>

                    <div className={styles.header}>
                        <div className={styles.icon} style={{ background: info.gradient }}>
                            {info.icon}
                        </div>
                        <h1 className={styles.title}>{info.title}</h1>
                        <p className={styles.description}>{info.description}</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="pin" className={styles.label}>
                                🔒 Masukkan PIN
                            </label>
                            <input
                                type="password"
                                id="pin"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="input"
                                placeholder="Masukkan PIN kategori"
                                required
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className={styles.error}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ width: '100%' }}
                        >
                            {loading ? 'Memverifikasi...' : 'Akses Spreadsheet'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.contentHeader}>
                    <Link href="/" className={styles.backButton}>
                        ← Kembali
                    </Link>

                    <div className={styles.headerInfo}>
                        <div className={styles.icon} style={{ background: info.gradient }}>
                            {info.icon}
                        </div>
                        <div>
                            <h1 className={styles.title}>{info.title}</h1>
                            <p className={styles.description}>{info.description}</p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            sessionStorage.removeItem(`auth_${category}`)
                            setIsAuthenticated(false)
                            setPin('')
                        }}
                        className={styles.logoutButton}
                    >
                        🔒 Kunci
                    </button>
                </div>

                {/* Search and Sort Controls */}
                <div className={styles.controls}>
                    <div className={styles.searchWrapper}>
                        <SearchBar
                            placeholder="Cari spreadsheet..."
                            onSearch={setSearchTerm}
                        />
                    </div>
                    <div className={styles.sortWrapper}>
                        <label htmlFor="sort" className={styles.sortLabel}>Urutkan:</label>
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className={styles.sortSelect}
                        >
                            <option value="default">Default</option>
                            <option value="alphabetical">A-Z</option>
                            <option value="recent">Terbaru</option>
                        </select>
                    </div>
                </div>

                {/* Links Grid */}
                {loading ? (
                    <LoadingSkeleton count={3} type="card" />
                ) : (
                    <div className={styles.linksGrid}>
                        {filteredLinks.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    {searchTerm ? '🔍' : '📭'}
                                </div>
                                <p>
                                    {searchTerm
                                        ? 'Tidak ada spreadsheet yang cocok dengan pencarian'
                                        : 'Belum ada spreadsheet di kategori ini'}
                                </p>
                            </div>
                        ) : (
                            filteredLinks.map((link) => (
                                <div key={link.id} className={styles.linkCard}>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleLinkClick(link)}
                                        className={styles.linkMain}
                                    >
                                        <div className={styles.linkIcon}>📊</div>
                                        <div className={styles.linkContent}>
                                            <h3 className={styles.linkTitle}>{link.title}</h3>
                                            {link.description && (
                                                <p className={styles.linkDescription}>{link.description}</p>
                                            )}
                                            <div className={styles.linkUrl}>
                                                {new URL(link.url).hostname}
                                            </div>
                                        </div>
                                        <div className={styles.linkArrow}>→</div>
                                    </a>
                                    <button
                                        className={styles.copyButton}
                                        onClick={() => copyToClipboard(link.url, link.title)}
                                        title="Salin link"
                                    >
                                        📋
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}
        </div>
    )
}
