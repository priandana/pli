'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '../../components/ThemeToggle'
import styles from './admin.module.css'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Admin state
    const [activeTab, setActiveTab] = useState('umum')
    const [links, setLinks] = useState({ umum: [], finishgood: [], material: [] })
    const [pins, setPins] = useState({ umum: '', finishgood: '', material: '' })
    const [showAddForm, setShowAddForm] = useState(false)
    const [editingLink, setEditingLink] = useState(null)

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        url: '',
        description: ''
    })

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth')
        if (auth === 'true') {
            setIsAuthenticated(true)
            fetchAllData()
        }
    }, [])

    const fetchAllData = async () => {
        try {
            // Fetch all links
            const linksResponse = await fetch('/api/links')
            const linksData = await linksResponse.json()
            if (linksData.success) {
                const categorizedLinks = {
                    umum: linksData.categories.umum.links,
                    finishgood: linksData.categories.finishgood.links,
                    material: linksData.categories.material.links
                }
                setLinks(categorizedLinks)
            }

            // Fetch all PINs
            const pinsResponse = await fetch('/api/admin/pins')
            const pinsData = await pinsResponse.json()
            if (pinsData.success) {
                setPins(pinsData.pins)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const response = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            const data = await response.json()

            if (data.success) {
                sessionStorage.setItem('admin_auth', 'true')
                setIsAuthenticated(true)
                fetchAllData()
            } else {
                setError(data.message)
            }
        } catch (error) {
            setError('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    const handleAddLink = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category: activeTab,
                    ...formData
                }),
            })

            const data = await response.json()

            if (data.success) {
                await fetchAllData()
                setFormData({ title: '', url: '', description: '' })
                setShowAddForm(false)
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateLink = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                category: activeTab,
                id: editingLink.id,
                ...formData
            }

            console.log('Sending update request:', payload)

            const response = await fetch('/api/links', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json()
            console.log('Update response:', data)

            if (data.success) {
                await fetchAllData()
                setFormData({ title: '', url: '', description: '' })
                setEditingLink(null)
                alert('Link berhasil diupdate!')
            } else {
                alert(data.message || 'Gagal mengupdate link')
            }
        } catch (error) {
            console.error('Error updating link:', error)
            alert(`Terjadi kesalahan: ${error.message}`)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteLink = async (id) => {
        if (!confirm('Apakah Anda yakin ingin menghapus link ini?')) return

        try {
            const response = await fetch(`/api/links?category=${activeTab}&id=${id}`, {
                method: 'DELETE',
            })

            const data = await response.json()

            if (data.success) {
                await fetchAllData()
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert('Terjadi kesalahan. Silakan coba lagi.')
        }
    }

    const handleUpdatePin = async (category, newPin) => {
        if (!newPin || newPin.trim() === '') {
            alert('PIN tidak boleh kosong')
            return
        }

        try {
            const response = await fetch('/api/admin/pins', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category, pin: newPin }),
            })

            const data = await response.json()

            if (data.success) {
                await fetchAllData()
                alert('PIN berhasil diupdate')
            } else {
                alert(data.message)
            }
        } catch (error) {
            alert('Terjadi kesalahan. Silakan coba lagi.')
        }
    }

    const startEdit = (link) => {
        setEditingLink(link)
        setFormData({
            title: link.title,
            url: link.url,
            description: link.description || ''
        })
        setShowAddForm(false)
    }

    const cancelEdit = () => {
        setEditingLink(null)
        setFormData({ title: '', url: '', description: '' })
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.container}>
                <div className={styles.loginCard}>
                    <Link href="/" className={styles.backButton}>
                        ← Kembali ke Home
                    </Link>

                    <div className={styles.loginHeader}>
                        <div className={styles.adminIcon}>⚙️</div>
                        <h1 className={styles.title}>Admin Panel</h1>
                        <p className={styles.subtitle}>Kelola spreadsheet links dan PINs</p>
                    </div>

                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>
                                👤 Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input"
                                placeholder="Masukkan username"
                                required
                                autoFocus
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                🔒 Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder="Masukkan password"
                                required
                            />
                        </div>

                        {error && (
                            <div className={styles.error}>
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ width: '100%' }}
                        >
                            {loading ? 'Memverifikasi...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        )
    }

    const categories = [
        { id: 'umum', name: 'Umum', icon: '📋' },
        { id: 'finishgood', name: 'Finishgood', icon: '📦' },
        { id: 'material', name: 'Material', icon: '🏗️' }
    ]

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminHeader}>
                <div className={styles.headerLeft}>
                    <Link href="/" className={styles.backButton}>
                        ← Home
                    </Link>
                    <h1 className={styles.adminTitle}>
                        <span className={styles.adminIcon}>⚙️</span>
                        Admin Panel
                    </h1>
                </div>
                <div className={styles.headerRight}>
                    <ThemeToggle />
                    <button
                        onClick={() => {
                            sessionStorage.removeItem('admin_auth')
                            setIsAuthenticated(false)
                            setUsername('')
                            setPassword('')
                        }}
                        className={styles.logoutButton}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => {
                            setActiveTab(cat.id)
                            setShowAddForm(false)
                            setEditingLink(null)
                            setFormData({ title: '', url: '', description: '' })
                        }}
                        className={`${styles.tab} ${activeTab === cat.id ? styles.tabActive : ''}`}
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.name}</span>
                    </button>
                ))}
            </div>

            <div className={styles.content}>
                {/* PIN Management */}
                <div className={styles.pinSection}>
                    <h2 className={styles.sectionTitle}>🔐 PIN Kategori {categories.find(c => c.id === activeTab)?.name}</h2>
                    <div className={styles.pinCard}>
                        <div className={styles.pinDisplay}>
                            <span className={styles.pinLabel}>PIN saat ini:</span>
                            <code className={styles.pinCode}>{pins[activeTab]}</code>
                        </div>
                        <button
                            onClick={() => {
                                const newPin = prompt('Masukkan PIN baru:', pins[activeTab])
                                if (newPin) {
                                    handleUpdatePin(activeTab, newPin)
                                }
                            }}
                            className="btn btn-outline"
                        >
                            Ubah PIN
                        </button>
                    </div>
                </div>

                {/* Links Management */}
                <div className={styles.linksSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>📊 Spreadsheet Links</h2>
                        <button
                            onClick={() => {
                                setShowAddForm(!showAddForm)
                                setEditingLink(null)
                                setFormData({ title: '', url: '', description: '' })
                            }}
                            className="btn btn-success"
                        >
                            {showAddForm ? '✕ Batal' : '+ Tambah Link'}
                        </button>
                    </div>

                    {/* Add/Edit Form */}
                    {(showAddForm || editingLink) && (
                        <div className={styles.formCard}>
                            <h3 className={styles.formTitle}>
                                {editingLink ? '✏️ Edit Link' : '➕ Tambah Link Baru'}
                            </h3>
                            <form onSubmit={editingLink ? handleUpdateLink : handleAddLink}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Judul</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="input"
                                        placeholder="Contoh: Spreadsheet Inventory"
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>URL Spreadsheet</label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                        className="input"
                                        placeholder="https://docs.google.com/spreadsheets/d/..."
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Deskripsi (Opsional)</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className={`input ${styles.textarea}`}
                                        placeholder="Deskripsi singkat tentang spreadsheet ini"
                                        rows="3"
                                    />
                                </div>

                                <div className={styles.formActions}>
                                    {editingLink && (
                                        <button
                                            type="button"
                                            onClick={cancelEdit}
                                            className="btn btn-outline"
                                        >
                                            Batal
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading ? 'Menyimpan...' : (editingLink ? 'Update' : 'Tambah')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Links List */}
                    <div className={styles.linksList}>
                        {links[activeTab].length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>📭</div>
                                <p>Belum ada link di kategori ini</p>
                                <p className={styles.emptyHint}>Klik tombol "Tambah Link" untuk menambahkan</p>
                            </div>
                        ) : (
                            links[activeTab].map((link) => (
                                <div key={link.id} className={styles.linkItem}>
                                    <div className={styles.linkInfo}>
                                        <h3 className={styles.linkTitle}>{link.title}</h3>
                                        {link.description && (
                                            <p className={styles.linkDescription}>{link.description}</p>
                                        )}
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles.linkUrl}
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                    <div className={styles.linkActions}>
                                        <button
                                            onClick={() => startEdit(link)}
                                            className={styles.btnEdit}
                                            title="Edit"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDeleteLink(link.id)}
                                            className={styles.btnDelete}
                                            title="Hapus"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
