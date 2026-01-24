'use client'

import { useState } from 'react'
import styles from './PinProtectedSection.module.css'

export default function PinProtectedSection({
    title,
    correctPin,
    children,
    category
}) {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [pin, setPin] = useState('')
    const [error, setError] = useState('')
    const [isShaking, setIsShaking] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (pin === correctPin) {
            setIsUnlocked(true)
            setError('')
        } else {
            setError('PIN salah! Silakan coba lagi.')
            setIsShaking(true)
            setTimeout(() => setIsShaking(false), 500)
            setPin('')
        }
    }

    const handleLock = () => {
        setIsUnlocked(false)
        setPin('')
        setError('')
    }

    if (isUnlocked) {
        return (
            <div className={styles.unlockedSection}>
                <div className={styles.header}>
                    <h3 className={styles.title}>
                        <span className={styles.icon}>🔓</span>
                        {title}
                    </h3>
                    <button onClick={handleLock} className={styles.lockButton}>
                        <span className={styles.lockIcon}>🔒</span>
                        Kunci
                    </button>
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.lockedSection}>
            <div className={styles.lockCard + (isShaking ? ' ' + styles.shake : '')}>
                <div className={styles.lockIcon}>🔒</div>
                <h3 className={styles.lockTitle}>{title}</h3>
                <p className={styles.lockDescription}>
                    Masukkan PIN untuk mengakses {category}
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Masukkan PIN"
                        className={styles.input}
                        maxLength="6"
                        autoFocus
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.submitButton}>
                        Buka Akses
                    </button>
                </form>
            </div>
        </div>
    )
}
