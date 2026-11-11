# Tugas Akhir Learning Labs: Backend Development
## Nama Project: LiteraBook Store REST API

Dokumentasi ini dibuat untuk memenuhi syarat penilaian Tugas Akhir Learning Labs pada kelas Backend Development.

---

## 1. Deskripsi Singkat Project
LiteraBook Store API adalah layanan REST API backend yang dirancang khusus untuk mengelola operasional platform toko buku online. Sistem ini berfokus pada arsitektur server-side untuk menangani manajemen inventaris buku, kategori produk, data pelanggan, alur pemesanan transaksi, hingga pencatatan detail item belanjaan secara terintegrasi dan aman.

---

## 2. ERD / Skema Database
Database proyek ini menggunakan sistem basis data relasional PostgreSQL yang terdiri dari **5 tabel utama** yang saling terhubung untuk mendukung integritas data transaksi.

### Gambar Diagram ERD
Berikut adalah tautan visual skema database yang dibuat melalui platform diagramming:
![ERD Diagram](https://drawsql.app) 
*(Catatan: Pastikan Anda mengganti URL gambar di atas dengan tautan gambar ekspor dari drawsql.app atau dbdiagram.io milik Anda sendiri)*

### Deskripsi Relasi Antar Tabel:
* **`users` ➡️ `orders` (*One-to-Many*):** Satu pelanggan (`user`) dapat melakukan banyak kali transaksi pemesanan (`orders`), tetapi satu lembar nota pesanan hanya dimiliki oleh satu pelanggan spesifik melalui foreign key `user_id`.
* **`orders` ➡️ `order_items` (*One-to-Many*):** Satu nota pesanan (`orders`) dapat memuat banyak item buku yang dibeli (`order_items`) melalui pencatatan foreign key `order_id`.
* **`books` ➡️ `order_items` (*One-to-Many*):** Satu produk buku (`books`) dapat tercatat di dalam banyak detail transaksi item belanjaan (`order_items`) yang berbeda melalui foreign key `book_id`.
* **`categories` ➡️ `books` (*One-to-Many*):** Satu kategori genre (`categories`) dapat menampung banyak koleksi buku (`books`), sedangkan satu buku hanya boleh terdaftar dalam satu kategori utama menggunakan foreign key `category_id`.

---

## 3. Link URL Deployment
Aplikasi backend ini telah dideploy secara live di cloud platform dan dapat diakses publik melalui tautan berikut:
👉 **[https://vercel.app](https://vercel.app)**

---

## 4. Cara Menjalankan Project Secara Lokal

Ikuti instruksi di bawah ini untuk memasang dan menjalankan server backend ini di komputer lokal Anda:

1. **Clone Repository dari GitHub:**
   ```bash
   git clone https://github.com
   cd literabook-store-api
   ```

2. **Install Dependencies Proyek:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment Variables (`.env`):**
   Buat berkas baru bernama `.env` pada root folder proyek, lalu masukkan kredensial database cloud (Supabase / Neon Anda). *Pastikan file ini tidak ikut ter-commit ke GitHub!*
   ```env
   PORT=3000
   DATABASE_URL="postgres://postgres.abcde:my-secret-password@://supabase.com"
   JWT_SECRET="super-secret-key-labs"
   ```

4. **Jalankan Database Migration (Jika menggunakan ORM seperti Prisma/Sequelize):**
   ```bash
   npx prisma db push
   ```

5. **Jalankan Aplikasi Server:**
   ```bash
   npm run dev
   ```
   Server backend sekarang aktif berjalan lokal di `http://localhost:3000`.

---

## 5. Daftar Seluruh Endpoint (Dokumentasi Pemanggilan API)

### 1. Nama Endpoint: Tambah Buku Baru (CRUD - Create)
* **Method** : `POST`
* **URL** : `https://vercel.app/books`
* **Deskripsi** : Menambahkan data informasi buku baru ke dalam katalog penyimpanan sistem database.
* **Headers** : `Content-Type: application/json`
* **Request Body** :
  ```json
  {
    "title": "Belajar Python",
    "price": 85000,
    "category_id": 1
  }
  ```
* **Response Sukses (201 Created)** :
  ```json
  {
    "message": "Buku berhasil ditambahkan",
    "data": { 
      "id": 10, 
      "title": "Belajar Python",
      "price": 85000,
      "category_id": 1
    }
  }
  ```
* **Response Error (400 Bad Request)** :
  ```json
  {
    "error": "Field title wajib diisi"
  }
  ```

### 2. Nama Endpoint: Ambil Semua Koleksi Buku (CRUD - Read)
* **Method** : `GET`
* **URL** : `https://vercel.app/books`
* **Deskripsi** : Mengambil seluruh daftar koleksi buku yang tersedia di dalam database toko.
* **Headers** : Tidak membutuhkan headers khusus
* **Response Sukses (200 OK)** :
  ```json
  [
    {
      "id": 10,
      "title": "Belajar Python",
      "price": 85000,
      "category_id": 1
    }
  ]
  ```

### 3. Nama Endpoint: Ambil Informasi Detail Buku Spesifik (CRUD - Read)
* **Method** : `GET`
* **URL** : `https://vercel.app/books/10`
* **Deskripsi** : Mengambil satu data buku secara spesifik berdasarkan parameter ID yang dikirim.
* **Response Sukses (200 OK)** :
  ```json
  {
    "id": 10,
    "title": "Belajar Python",
    "price": 85000,
    "category_id": 1
  }
  ```
* **Response Error (404 Not Found)** :
  ```json
  {
    "error": "Buku tidak ditemukan"
  }
  ```

### 4. Nama Endpoint: Perbarui Data Buku Berdasarkan ID (CRUD - Update)
* **Method** : `PUT` / `PATCH`
* **URL** : `https://vercel.app/books/10`
* **Deskripsi** : Mengubah data informasi buku yang sudah tersimpan sebelumnya (seperti update harga jual).
* **Request Body** :
  ```json
  {
    "price": 90000
  }
  ```
* **Response Sukses (200 OK)** :
  ```json
  {
    "message": "Buku berhasil diperbarui",
    "data": {
      "id": 10,
      "title": "Belajar Python",
      "price": 90000,
      "category_id": 1
    }
  }
  ```

### 5. Nama Endpoint: Hapus Buku Berdasarkan ID (CRUD - Delete)
* **Method** : `DELETE`
* **URL** : `https://vercel.app/books/10`
* **Deskripsi** : Menghapus record data buku secara permanen dari sistem database.
* **Response Sukses (200 OK)** :
  ```json
  {
    "message": "Buku berhasil dihapus"
  }
  ```

---

## 6. Bukti Pengujian (Thunder Client / Postman)
Berkas pengujian berupa ekspor *koleksi pengujian* otomatis dapat diunduh langsung di dalam repositori ini pada file bertipe data JSON:
📂 `postman_collection.json` 

*(Catatan: Anda juga dapat menyisipkan screenshot bukti pemanggilan API sukses di bagian ini jika diperlukan).*

---

## 7. Vercel Speed Insights Integration

Proyek ini telah diintegrasikan dengan **Vercel Speed Insights** untuk monitoring performa aplikasi secara real-time. Speed Insights membantu menganalisis Core Web Vitals dan performa loading halaman.

### Fitur Speed Insights:
- ✅ Monitoring Core Web Vitals (LCP, FID, CLS)
- ✅ Real-time performance tracking
- ✅ Otomatis terintegrasi saat deploy ke Vercel
- ✅ Dashboard analytics di Vercel

### Implementasi:
Speed Insights telah ditambahkan pada:
1. **Landing Page** (`/`): Halaman HTML dengan dokumentasi visual API
2. **Speed Insights Middleware**: Tracking route information untuk API endpoints
3. **Konfigurasi**: File `src/speed-insights.js` untuk pengaturan monitoring

**Catatan:** Speed Insights utamanya bekerja untuk frontend monitoring. Untuk REST API murni, data performa dikumpulkan ketika user mengakses landing page.

---

## Checklist Sebelum Mengumpulkan
- [x] Minimal 5 tabel dengan relasi foreign key terpasang.
- [x] Ada endpoint lengkap method GET, POST, PUT/PATCH, dan DELETE.
- [x] API sudah live dideploy di Vercel dan bisa diakses lancar secara publik.
- [x] Semua fungsi endpoint sudah lolos dites lewat Postman / Thunder Client.
- [x] Dokumentasi README terstruktur lengkap dan URL skema ERD tersedia.
- [x] Tidak ada kebocoran kredensial password database atau secret key di berkas repositori (menggunakan tab Environment Variables di dashboard Vercel).
- [x] Vercel Speed Insights telah diintegrasikan untuk monitoring performa.
