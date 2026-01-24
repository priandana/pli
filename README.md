# Gudang Prakasa - Spreadsheet Links Website

Website untuk menampilkan link spreadsheet dengan 3 kategori yang dilindungi PIN, plus admin panel untuk manajemen link.

## 🌟 Fitur

- ✅ **3 Kategori Terpisah**: Umum, Finishgood, Material
- 🔒 **PIN Protection**: Setiap kategori dilindungi dengan PIN yang berbeda
- ⚙️ **Admin Panel**: Kelola link dan PIN dengan mudah
- 🎨 **Modern UI**: Dark mode dengan glassmorphism dan animasi smooth
- 📱 **Responsive**: Tampil sempurna di semua perangkat
- 🚀 **Vercel Ready**: Siap deploy ke Vercel

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔐 Default Credentials

### PIN Kategori (Default)
- **Umum**: `1234`
- **Finishgood**: `5678`
- **Material**: `9012`

### Admin Login (Default)
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **PENTING**: Ubah PIN dan kredensial admin setelah deployment pertama melalui Admin Panel atau edit file `data/links.json`

## 📁 Struktur Project

```
gudang-prakasa-website/
├── app/
│   ├── admin/              # Admin panel
│   ├── umum/               # Kategori Umum
│   ├── finishgood/         # Kategori Finishgood
│   ├── material/           # Kategori Material
│   ├── api/                # API routes
│   │   ├── links/          # CRUD links
│   │   ├── verify-pin/     # Verifikasi PIN
│   │   └── admin/          # Admin auth & PIN management
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Landing page
├── data/
│   └── links.json          # Data storage
└── package.json
```

## 🎯 Cara Menggunakan

### Untuk Pengunjung

1. Buka website
2. Pilih kategori yang ingin diakses
3. Masukkan PIN kategori
4. Akses spreadsheet links

### Untuk Admin

1. Klik "Admin Panel" di halaman utama
2. Login dengan username dan password
3. Pilih tab kategori yang ingin dikelola
4. Tambah/edit/hapus link spreadsheet
5. Ubah PIN kategori jika diperlukan

## 📝 Menambah Link Baru

### Via Admin Panel (Recommended)

1. Login ke Admin Panel
2. Pilih kategori
3. Klik "Tambah Link"
4. Isi form:
   - **Judul**: Nama spreadsheet
   - **URL**: Link Google Sheets
   - **Deskripsi**: (Opsional) Deskripsi singkat
5. Klik "Tambah"

### Via File JSON (Manual)

Edit file `data/links.json`:

```json
{
  "categories": {
    "umum": {
      "pin": "1234",
      "links": [
        {
          "id": "unique-id",
          "title": "Nama Spreadsheet",
          "url": "https://docs.google.com/spreadsheets/d/...",
          "description": "Deskripsi spreadsheet"
        }
      ]
    }
  }
}
```

## 🚀 Deploy ke Vercel

### Method 1: Via Vercel Dashboard

1. Push code ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Import repository
4. Deploy!

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### Setelah Deploy

1. Akses website Anda
2. Login ke Admin Panel
3. **SEGERA ubah PIN dan kredensial admin default!**

## 🔧 Konfigurasi

### Mengubah PIN

**Via Admin Panel:**
1. Login ke Admin Panel
2. Pilih kategori
3. Klik "Ubah PIN"
4. Masukkan PIN baru

**Via File JSON:**
Edit `data/links.json`:
```json
{
  "categories": {
    "umum": {
      "pin": "PIN_BARU_ANDA"
    }
  }
}
```

### Mengubah Admin Credentials

Edit `data/links.json`:
```json
{
  "admin": {
    "username": "username_baru",
    "password": "password_baru"
  }
}
```

## 🎨 Customization

### Mengubah Warna

Edit `app/globals.css` di bagian `:root`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-purple: #667eea;
  /* ... */
}
```

### Menambah Kategori Baru

1. Tambah kategori di `data/links.json`
2. Buat folder baru di `app/[nama-kategori]/`
3. Copy file dari kategori lain dan sesuaikan
4. Update landing page di `app/page.js`

## 📦 Build untuk Production

```bash
npm run build
npm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS dengan modern design system
- **Data Storage**: JSON file-based
- **Deployment**: Vercel-optimized

## 🔒 Keamanan

- PIN protection per kategori
- Admin authentication
- Session-based access control
- Input validation di API routes

> ⚠️ **Catatan**: Untuk production yang lebih aman, pertimbangkan:
> - Menggunakan environment variables untuk credentials
> - Implementasi password hashing
> - Menggunakan database (MongoDB, PostgreSQL, dll)
> - Menambahkan rate limiting

## 📞 Support

Jika ada pertanyaan atau masalah, silakan hubungi administrator website.

## 📄 License

© 2026 Gudang Prakasa. All rights reserved.
