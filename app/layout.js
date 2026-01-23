import './globals.css'

export const metadata = {
    title: 'PLI Bandung - Spreadsheet Links',
    description: 'Akses spreadsheet berdasarkan kategori dengan PIN protection',
}

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <body>{children}</body>
        </html>
    )
}
