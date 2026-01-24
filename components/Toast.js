'use client'

import { useEffect } from 'react'
import styles from './Toast.module.css'

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose()
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [duration, onClose])

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    }

    return (
        <div className={`${styles.toast} ${styles[type]} ${styles.slideIn}`}>
            <div className={styles.toastIcon}>{icons[type]}</div>
            <div className={styles.toastMessage}>{message}</div>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                ✕
            </button>
            {duration > 0 && (
                <div
                    className={styles.progressBar}
                    style={{ animationDuration: `${duration}ms` }}
                ></div>
            )}
        </div>
    )
}
