import './globals.css'

export const metadata = {
    title: 'PLI Bandung - Spreadsheet Links',
    description: 'Akses spreadsheet berdasarkan kategori dengan PIN protection',
}

export default function RootLayout({ children }) {
    return (
        <html lang="id">
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    const theme = localStorage.getItem('theme') || 'dark';
                                    document.documentElement.setAttribute('data-theme', theme);
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
