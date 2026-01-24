'use client'

import styles from './LoadingSkeleton.module.css'

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
    const skeletons = Array.from({ length: count }, (_, i) => i)

    if (type === 'card') {
        return (
            <div className={styles.grid}>
                {skeletons.map((i) => (
                    <div key={i} className={styles.cardSkeleton}>
                        <div className={styles.skeletonIcon}></div>
                        <div className={styles.skeletonContent}>
                            <div className={styles.skeletonTitle}></div>
                            <div className={styles.skeletonText}></div>
                            <div className={styles.skeletonText} style={{ width: '60%' }}></div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (type === 'list') {
        return (
            <div className={styles.listContainer}>
                {skeletons.map((i) => (
                    <div key={i} className={styles.listSkeleton}>
                        <div className={styles.skeletonTitle}></div>
                        <div className={styles.skeletonText}></div>
                    </div>
                ))}
            </div>
        )
    }

    return null
}
