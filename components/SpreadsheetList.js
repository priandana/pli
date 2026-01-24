import styles from './SpreadsheetList.module.css'

export default function SpreadsheetList({ sheets }) {
    return (
        <div className={styles.grid}>
            {sheets.map((sheet, index) => (
                <a
                    key={index}
                    href={sheet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.card}
                >
                    <div className={styles.iconContainer}>
                        <span className={styles.icon}>📊</span>
                    </div>
                    <div className={styles.content}>
                        <h4 className={styles.title}>{sheet.name}</h4>
                        {sheet.description && (
                            <p className={styles.description}>{sheet.description}</p>
                        )}
                    </div>
                    <div className={styles.arrow}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M7 4L13 10L7 16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </a>
            ))}
        </div>
    )
}
