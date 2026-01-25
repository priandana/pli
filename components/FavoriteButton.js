'use client'

import { useState, useEffect } from 'react'
import styles from './FavoriteButton.module.css'

export default function FavoriteButton({ linkId, category, size = 'medium' }) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        // Load favorites from localStorage
        const favorites = getFavorites()
        setIsFavorite(favorites.includes(linkId))
    }, [linkId])

    const getFavorites = () => {
        if (typeof window === 'undefined') return []
        const stored = localStorage.getItem(`favorites_${category}`)
        return stored ? JSON.parse(stored) : []
    }

    const saveFavorites = (favorites) => {
        if (typeof window === 'undefined') return
        localStorage.setItem(`favorites_${category}`, JSON.stringify(favorites))
    }

    const toggleFavorite = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const favorites = getFavorites()
        let newFavorites

        if (isFavorite) {
            // Remove from favorites
            newFavorites = favorites.filter(id => id !== linkId)
        } else {
            // Add to favorites
            newFavorites = [...favorites, linkId]
        }

        saveFavorites(newFavorites)
        setIsFavorite(!isFavorite)

        // Trigger animation
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 600)
    }

    return (
        <button
            onClick={toggleFavorite}
            className={`${styles.favoriteButton} ${styles[size]} ${isFavorite ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
            title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
            {isFavorite ? '⭐' : '☆'}
        </button>
    )
}
