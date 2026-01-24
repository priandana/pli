'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchBar from '../components/SearchBar'
import ThemeToggle from '../components/ThemeToggle'
import styles from './page.module.css'

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [linkCounts, setLinkCounts] = useState({ umum: 0, finishgood: 0, material: 0 })

    const categories = [
        {
            id: 'umum',
            title: 'Umum',
            description: 'Spreadsheet untuk keperluan umum',
            icon: '📋',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            id: 'finishgood',
            title: 'Finishgood',
            description: 'Spreadsheet untuk barang jadi',
            icon: '📦',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            id: 'material',
            title: 'Material',
            description: 'Spreadsheet untuk bahan material',
            icon: '🏗️',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ]

    useEffect(() => {
        fetchLinkCounts()
    }, [])

    const fetchLinkCounts = async () => {
        try {
            const response = await fetch('/api/links')
            const data = await response.json()
            if (data.success) {
                const counts = {
                    umum: data.categories.umum.links.length,
                    finishgood: data.categories.finishgood.links.length,
                    material: data.categories.material.links.length
                }
                setLinkCounts(counts)
            }
        } catch (error) {
            console.error('Error fetching link counts:', error)
        }
    }

    const filteredCategories = categories.filter(cat =>
        cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className={styles.main}>
            <div className="container">
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.logo}>
                            <div className={styles.logoIcon}>📊</div>
                            <h1 className={styles.title}>
                                PLI <span className="text-gradient">Bandung</span>
                            </h1>
                        </div>
                        <ThemeToggle />
                    </div>
                    <p className={styles.subtitle}>
                        Akses spreadsheet berdasarkan kategori dengan keamanan PIN
                    </p>
                </header>

                {/* Search Bar */}
                <div className={styles.searchSection}>
                    <SearchBar
                        placeholder="Cari kategori..."
                        onSearch={setSearchTerm}
                    />
                </div>

                {/* Categories Grid */}
                <div className={`grid grid-3 ${styles.categoriesGrid}`}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map((category, index) => (
                            <Link
                                href={`/${category.id}`}
                                key={category.id}
                                className={styles.categoryCard}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className={styles.cardGlow} style={{ background: category.gradient }}></div>
                                <div className={styles.cardContent}>
                                    <div className={styles.categoryIcon}>{category.icon}</div>
                                    <h2 className={styles.categoryTitle}>{category.title}</h2>
                                    <p className={styles.categoryDescription}>{category.description}</p>
                                    <div className={styles.cardFooter}>
                                        <span className={styles.accessBadge}>🔒 PIN Required</span>
                                        <span className={styles.linkCount}>{linkCounts[category.id]} links</span>
                                        <span className={styles.arrow}>→</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className={styles.noResults}>
                            <div className={styles.noResultsIcon}>🔍</div>
                            <p>Tidak ada kategori yang cocok dengan pencarian</p>
                        </div>
                    )}
                </div>

                {/* Admin Link */}
                <div className={styles.adminSection}>
                    <Link href="/admin" className={styles.adminLink}>
                        <span>⚙️</span>
                        <span>Admin Panel</span>
                    </Link>
                </div>

                {/* Footer */}
                <footer className={styles.footer}>
                    <p>© 2026 PLI Bandung. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}

