<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
  </a>
</p>

<h1 align="center">📸 PHOTOin!</h1>

<p align="center">
  <strong>Aplikasi Web Photobooth Digital — Ekspresikan Kreativitasmu, Kapan Saja & Di Mana Saja</strong>
</p>

<p align="center">
  <a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
  <img src="https://img.shields.io/badge/Mata%20Kuliah-Pengembangan%20Aplikasi%20Web-blue" alt="Mata Kuliah">
  <img src="https://img.shields.io/badge/Universitas-Brawijaya-red" alt="Universitas Brawijaya">
</p>

---

## 🏫 Informasi Akademik

| Keterangan         | Detail                         |
| ------------------ | ------------------------------ |
| **Mata Kuliah**    | Pengembangan Aplikasi Web      |
| **Dosen Pengampu** | Agi Putra Kharisma, S.T., M.T. |
| **Program Studi**  | Teknik Informatika             |
| **Jurusan**        | Teknik Informatika             |
| **Universitas**    | Universitas Brawijaya          |
| **Tahun**          | 2026                           |

---

## 👥 Anggota Kelompok — _nanti aja_

| No  | Nama                         | NIM             |
| --- | ---------------------------- | --------------- |
| 1   | Muhammad Azza Arsyada Roziqi | 245150200111062 |
| 2   | Sabrina Khairunnisa Qalby    | 245150201111039 |
| 3   | Aqeela Sahla                 | 245150201111039 |
| 4   | Ahmad Hilalul Fadli          | 245150201111045 |

---

## 📖 Tentang PHOTOin!

**PHOTOin!** adalah aplikasi web photobooth digital yang dapat diakses langsung melalui browser tanpa instalasi apapun. Dilengkapi dengan fitur filter foto, berbagai pilihan layout strip, dan keunggulan utamanya yaitu unggah frame custom — PHOTOin! hadir sebagai solusi photobooth yang personal, gratis, dan dapat dinikmati siapa saja tanpa batas tempat maupun waktu.

Dibangun di atas framework **Laravel** yang ekspresif dan elegan, PHOTOin! memanfaatkan ekosistem Laravel untuk membangun aplikasi web yang robust, scalable, dan mudah dikembangkan.

### Fitur Utama

- 📷 **Photobooth Digital** — Ambil foto langsung dari browser menggunakan kamera perangkat
- 🎨 **Filter Foto** — Berbagai pilihan filter untuk mempercantik hasil foto
- 🖼️ **Layout Strip** — Pilihan layout strip foto yang beragam
- ✨ **Frame Custom** — Unggah dan gunakan frame desain buatanmu sendiri
- 🌐 **Tanpa Instalasi** — Akses langsung dari browser, kapan saja dan di mana saja
- 💸 **Gratis** — Nikmati semua fitur tanpa biaya apapun

---

## 🌱 Latar Belakang

Foto kini bukan sekadar dokumentasi, melainkan bagian dari gaya hidup — terutama di kalangan generasi muda yang aktif di media sosial. Tren photobooth yang kini mudah ditemukan di pusat perbelanjaan dan kafe membuktikan bahwa kebutuhan akan pengalaman foto yang estetis dan menyenangkan sangat tinggi. Sayangnya, layanan ini mengharuskan pengguna datang ke lokasi tertentu, membayar per sesi, dan menerima pilihan frame yang sudah ditentukan tanpa bisa di-_custom_.

Keterbatasan itulah yang menjadi dasar lahirnya **PHOTOin!**. Pengguna seharusnya bisa menikmati pengalaman photobooth kapan saja dan di mana saja, tanpa biaya, dan dengan kebebasan penuh untuk mengekspresikan kreativitas mereka sendiri — termasuk menggunakan frame desain buatan mereka sendiri.

---

## 🚀 Cara Menjalankan Project

### Prasyarat

- PHP >= 8.2
- Composer
- Node.js & NPM
- Database (MySQL / PostgreSQL / SQLite)

### Langkah Instalasi

1. **Clone repository ini**

    ```bash
    git clone <url-repository>
    cd photoin
    ```

2. **Install dependensi PHP**

    ```bash
    composer install
    ```

3. **Install dependensi JavaScript**

    ```bash
    npm install
    ```

4. **Salin file environment**

    ```bash
    cp .env.example .env
    ```

5. **Generate application key**

    ```bash
    php artisan key:generate
    ```

6. **Konfigurasi database** di file `.env`, lalu jalankan migrasi

    ```bash
    php artisan migrate
    ```

7. **Jalankan server pengembangan**

    ```bash
    php artisan serve
    npm run dev
    ```

8. Buka browser dan akses `http://localhost:8000`

---

## 🛠️ Teknologi yang Digunakan

- **[Laravel](https://laravel.com)** — PHP web application framework
- **[Blade](https://laravel.com/docs/blade)** — Laravel templating engine
- **[Eloquent ORM](https://laravel.com/docs/eloquent)** — Database ORM yang ekspresif dan intuitif
- **[Laravel Queues](https://laravel.com/docs/queues)** — Background job processing
- **JavaScript / Canvas API** — Untuk fitur kamera dan manipulasi foto di sisi klien

---

## 📚 Referensi & Dokumentasi

- [Dokumentasi Laravel](https://laravel.com/docs)
- [Laracasts](https://laracasts.com) — Tutorial video Laravel & PHP
- [Laravel Learn](https://laravel.com/learn) — Panduan belajar Laravel

---

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik mata kuliah **Pengembangan Aplikasi Web**, Universitas Brawijaya 2026.

Framework Laravel yang digunakan merupakan perangkat lunak open-source berlisensi [MIT license](https://opensource.org/licenses/MIT).
