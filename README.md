```markdown
## Instalasi

Berikut adalah langkah-langkah instalasi untuk menjalankan proyek ini secara lokal.

1. Clone repositori ke mesin lokal Anda.

```

2. Install dependensi menggunakan npm.

```bash
npm install
```

4. Konfigurasi BASE_URL di file `src/Data/config/apiBase.jsx` dengan URL server backend.

```jsx
// src/Data/config/apiBase.jsx

export const API_BASE = 'http://localhost:8000/'; // Ganti dengan URL backend Anda
```

5. Jalankan aplikasi menggunakan npm.

```bash
npm start
```

Aplikasi sekarang dapat diakses melalui `http://localhost:3000` atau port lain yang mungkin digunakan oleh React secara default.

## Penggunaan

Untuk masuk, gunakan kredensial berikut:

- Admin: admin@admin.com, password: 12345678
- Sales: sales@sales.com, password: 12345678

Pastikan untuk menggunakan kredensial yang sesuai dengan peran yang ingin Anda uji.
