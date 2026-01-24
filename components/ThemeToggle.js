'use client'

import { useState, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Get theme from localStorage or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark'
        setTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
    }

    // Prevent hydration mismatch
    if (!mounted) {
        return <div className={styles.toggleButton}></div>
    }

    return (
        <button
            onClick={toggleTheme}
            className={styles.toggleButton}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className={styles.iconWrapper}>
                {theme === 'dark' ? (
                    <span className={styles.icon}>☀️</span>
                ) : (
                    <span className={styles.icon}>🌙</span>
                )}
            </div>
        </button>
    )
}
