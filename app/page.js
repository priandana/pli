import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    const categories = [
        {
            id: 'umum',
            title: 'Umum',
            description: 'Spreadsheet untuk keperluan umum',
            icon: '📋',
            gradient: 'linear-gradient(135deg, #1e90ff 0%, #0066cc 100%)'
        },
        {
            id: 'finishgood',
            title: 'Finishgood',
            description: 'Spreadsheet untuk barang jadi',
            icon: '📦',
            gradient: 'linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%)'
        },
        {
            id: 'material',
            title: 'Material',
            description: 'Spreadsheet untuk bahan material',
            icon: '🏗️',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ]

    return (
        <div className={styles.main}>
            <div className="container">
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}>📊</div>
                        <h1 className={styles.title}>
                            PLI <span className="text-gradient">Bandung</span>
                        </h1>
                    </div>
                    <p className={styles.subtitle}>
                        Akses spreadsheet berdasarkan kategori dengan keamanan PIN
                    </p>
                </header>

                {/* Categories Grid */}
                <div className={`grid grid-3 ${styles.categoriesGrid}`}>
                    {categories.map((category, index) => (
                        <Link
                            href={`/${category.id}`}
                            key={category.id}
                            className={styles.categoryCard}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.cardGlow} style={{ background: category.gradient }}></div>
                            <div className={styles.cardContent}>
                                <div className={styles.categoryIcon}>{category.icon}</div>
                                <h2 className={styles.categoryTitle}>{category.title}</h2>
                                <p className={styles.categoryDescription}>{category.description}</p>
                                <div className={styles.cardFooter}>
                                    <span className={styles.accessBadge}>🔒 PIN Required</span>
                                    <span className={styles.arrow}>→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Admin Link */}
                <div className={styles.adminSection}>
                    <Link href="/admin" className={styles.adminLink}>
                        <span>⚙️</span>
                        <span>Admin Panel</span>
                    </Link>
                </div>

                {/* Footer */}
                <footer className={styles.footer}>
                    <p>© 2026 PLI Bandung. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}
