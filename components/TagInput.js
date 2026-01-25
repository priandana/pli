'use client'

import { useState } from 'react'
import styles from './TagInput.module.css'

export default function TagInput({ tags = [], onChange, maxTags = 5 }) {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const handleAddTag = () => {
        const trimmedValue = inputValue.trim().toLowerCase()

        // Validation
        if (!trimmedValue) {
            setError('Tag tidak boleh kosong')
            return
        }

        if (trimmedValue.length > 20) {
            setError('Tag maksimal 20 karakter')
            return
        }

        if (tags.includes(trimmedValue)) {
            setError('Tag sudah ada')
            return
        }

        if (tags.length >= maxTags) {
            setError(`Maksimal ${maxTags} tags`)
            return
        }

        // Add tag
        onChange([...tags, trimmedValue])
        setInputValue('')
        setError('')
    }

    const handleRemoveTag = (tagToRemove) => {
        onChange(tags.filter(tag => tag !== tagToRemove))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <div className={styles.tagInputContainer}>
            <div className={styles.tagsList}>
                {tags.map((tag, index) => (
                    <div key={index} className={styles.tag}>
                        <span className={styles.tagText}>{tag}</span>
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className={styles.tagRemove}
                            aria-label={`Remove ${tag}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length < maxTags ? "Tambah tag..." : `Maksimal ${maxTags} tags`}
                    className={styles.input}
                    disabled={tags.length >= maxTags}
                />
                <button
                    type="button"
                    onClick={handleAddTag}
                    className={styles.addButton}
                    disabled={tags.length >= maxTags || !inputValue.trim()}
                >
                    + Tambah
                </button>
            </div>

            {error && (
                <div className={styles.error}>
                    ⚠️ {error}
                </div>
            )}

            <div className={styles.hint}>
                {tags.length}/{maxTags} tags • Tekan Enter atau klik Tambah
            </div>
        </div>
    )
}
