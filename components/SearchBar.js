'use client'

import { useState, useEffect } from 'react'
import styles from './SearchBar.module.css'

export default function SearchBar({ placeholder = "Search...", onSearch, debounceMs = 300 }) {
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm)
        }, debounceMs)

        return () => clearTimeout(timer)
    }, [searchTerm, debounceMs, onSearch])

    const handleClear = () => {
        setSearchTerm('')
        onSearch('')
    }

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <input
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <button
                    className={styles.clearButton}
                    onClick={handleClear}
                    aria-label="Clear search"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M12 4L4 12M4 4l8 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            )}
        </div>
    )
}
