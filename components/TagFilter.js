'use client'

import { useState, useEffect } from 'react'
import styles from './TagFilter.module.css'

export default function TagFilter({ links, selectedTags, onTagsChange }) {
    const [availableTags, setAvailableTags] = useState([])

    useEffect(() => {
        // Extract all unique tags from links
        const tagsSet = new Set()
        links.forEach(link => {
            if (link.tags && Array.isArray(link.tags)) {
                link.tags.forEach(tag => tagsSet.add(tag))
            }
        })
        setAvailableTags(Array.from(tagsSet).sort())
    }, [links])

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            onTagsChange(selectedTags.filter(t => t !== tag))
        } else {
            onTagsChange([...selectedTags, tag])
        }
    }

    const clearAll = () => {
        onTagsChange([])
    }

    if (availableTags.length === 0) {
        return null
    }

    return (
        <div className={styles.tagFilter}>
            <div className={styles.header}>
                <span className={styles.label}>🏷️ Filter by Tags:</span>
                {selectedTags.length > 0 && (
                    <button onClick={clearAll} className={styles.clearButton}>
                        Clear all
                    </button>
                )}
            </div>
            <div className={styles.tagsList}>
                {availableTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`${styles.tag} ${selectedTags.includes(tag) ? styles.active : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}
