QuranApp Frontend

Aplikasi frontend untuk menampilkan daftar surah, ayat, dan tafsir dengan fitur pencarian dan navigasi, dibangun menggunakan React dan Tailwind CSS.

Getting Started

- Clone the repository:
  git clone https://github.com/defrindr/quranapp-frontend.git
  cd quranapp-frontend

- Install dependencies:
  npm install
  # atau jika menggunakan yarn
  yarn install

- Buat file .env di root direktori dengan isi:
  VITE_API_BASE_URL=http://localhost:8000/api

  (Ganti URL sesuai dengan alamat backend API kamu)

- Jalankan development server:
  npm run dev

- Buka browser dan akses:
  http://localhost:5173

Struktur Direktori

- src/
  - pages/               Halaman utama aplikasi (SurahPage, DetailSurahPage, SearchPage)
  - networks/            Konfigurasi pemanggilan API (fetchData)
  - main.jsx             Entry point aplikasi

Fitur

- Menampilkan daftar surah dari API
- Pencarian surah berdasarkan nama
- Menampilkan detail ayat dan tafsir per surah
- Pencarian potongan ayat menggunakan semantic search
- Navigasi menggunakan React Router
- Pagination untuk mengatur tampilan ayat
- Highlight dan scroll otomatis ke ayat tertentu dengan ?specific_ayah= di URL

Dependencies

- React
- React Router DOM
- Axios (melalui fetchData custom)
- Tailwind CSS
- Vite (sebagai dev server dan bundler)

Catatan

Pastikan backend API sudah berjalan dan endpoint tersedia sesuai dengan konfigurasi di .env. Jika kamu mengalami masalah CORS, pastikan backend mengizinkan akses dari frontend (localhost:5173).
