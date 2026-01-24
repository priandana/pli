'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../umum/category.module.css'

export default function MaterialPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [pin, setPin] = useState('')
    const [error, setError] = useState('')
    const [links, setLinks] = useState([])
    const [loading, setLoading] = useState(false)

    const category = 'material'
    const info = {
        title: 'Material',
        icon: '🏗️',
        description: 'Spreadsheet untuk bahan material',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }

    useEffect(() => {
        const auth = sessionStorage.getItem(`auth_${category}`)
        if (auth === 'true') {
            setIsAuthenticated(true)
            fetchLinks()
        }
    }, [])

    const fetchLinks = async () => {
        try {
            const response = await fetch(`/api/links?category=${category}`)
            const data = await response.json()
            if (data.success) {
                setLinks(data.links)
            }
        } catch (error) {
            console.error('Error fetching links:', error)
        }
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

                <div className={styles.linksGrid}>
                    {links.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📭</div>
                            <p>Belum ada spreadsheet di kategori ini</p>
                        </div>
                    ) : (
                        links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.linkCard}
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
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
