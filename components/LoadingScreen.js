'use client'

import { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500) // 1.5 seconds

        return () => clearTimeout(timer)
    }, [])

    if (!isLoading) return null

    return (
        <div className={styles.loadingScreen}>
            <div className={styles.loadingContent}>
                {/* Logo/Icon */}
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>📦</span>
                    </div>
                </div>

                {/* Company Name */}
                <h1 className={styles.companyName}>Gudang Prakasa</h1>
                <p className={styles.tagline}>Logistik Indonesia</p>

                {/* Loading Spinner */}
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                </div>

                {/* Loading Text */}
                <p className={styles.loadingText}>Memuat...</p>
            </div>
        </div>
    )
}
