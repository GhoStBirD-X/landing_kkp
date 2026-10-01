# Rincian Perbaikan — Landing Page PT Karya Komponen Presisi

Tindak lanjut dari `qa-report-landingpage-2026-10-01.md`. Semua temuan diperbaiki dan diverifikasi ulang pada hari yang sama. Tidak ada tampilan yang berubah secara visual — semua perubahan di bawah bersifat teknis (performa, ketahanan, SEO, kebersihan repo).

## 🔴 #1 — Ketergantungan pada Tailwind CDN → dihapus

- Dibuat proses build lokal: `package.json`, `tailwind.config.js`, `src/tailwind-input.css` → di-compile jadi `assets/css/tailwind.css` (15 KB, minified) lewat `npm run build:css`.
- `<script src="https://cdn.tailwindcss.com">` dan inline `tailwind.config` dihapus dari `index.html` & `en.html`, diganti `<link rel="stylesheet" href="assets/css/tailwind.css?v=1">`.
- **Diverifikasi ulang:** mensimulasikan semua host eksternal diblokir (termasuk CDN Tailwind) — tinggi halaman tetap tepat 6558px, sama seperti kondisi normal, dan tampilan tetap utuh 100%. Sebelum perbaikan, skenario yang sama membuat tinggi halaman melonjak ke 22.734px dengan styling hilang total.

## 🟠 #2 — Performa lambat (LCP 8.2 detik) → turun ke 5.8 detik

Langkah yang diambil (akumulatif):
1. Menghapus Tailwind CDN (akar masalah blocking terbesar, ~789ms).
2. Font Google dipindah dari `@import` di CSS ke `<link rel="preconnect">` + `<link rel="stylesheet">` di `<head>`.
3. Logo & badge dikompres (lihat #3) — mengurangi total page weight.
4. Ditambahkan `<link rel="preload" as="image" href="assets/images/inside.jpeg">` supaya foto hero (elemen LCP) mulai diunduh lebih awal, paralel dengan CSS.

| Metrik | Sebelum | Sesudah |
|---|---|---|
| Lighthouse Performance | 66/100 | 74/100 |
| First Contentful Paint | 3.4 s | 2.8 s |
| **Largest Contentful Paint** | **8.2 s** | **5.8 s** |
| Speed Index | 4.6 s | 3.1 s |
| Time to Interactive | 8.4 s | 5.9 s |
| Total page weight | 1.852 KB | 1.229 KB |

Accessibility, Best Practices, dan SEO tetap 100/100 (tidak ada regresi).

## 🟠 #3 — Logo & badge kegedean → dikompresi ke ukuran tampil sebenarnya

Di-resize ke ~2x resolusi tampilnya (retina-ready) lalu dikompres ulang:

| File | Sebelum | Sesudah | Hemat |
|---|---|---|---|
| `client-mtm.png` | 191 KB | 20 KB | 90% |
| `iso-9001-badge.png` | 181 KB | 13 KB | 93% |
| `client-kyb.png` | 126 KB | 21 KB | 83% |
| `logo.png` | 118 KB | 35 KB | 70% |
| `client-fim-piston.png` | 10 KB | 8 KB | 18% |

Foto hero (`inside.jpeg`) dan foto "Tentang" (`outside.jpeg`, `factory-front.jpg`) juga dikompres ulang (quality 80, strip metadata) — total turun ~30 KB tanpa penurunan kualitas yang terlihat.

Semua gambar galeri (fasilitas, lab, logo klien, badge ISO, foto company, logo footer) sekarang diberi `loading="lazy"` kecuali yang tampil langsung di atas layar (logo navbar, foto hero).

## 🟡 #4 — Open Graph / Twitter Card → ditambahkan

`og:title`, `og:description`, `og:image`, `og:type`, `og:locale`, `og:site_name`, `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` ditambahkan ke kedua halaman. Link yang dibagikan ke WhatsApp/LinkedIn/Facebook sekarang akan menampilkan judul, deskripsi, dan foto fasad pabrik.

## 🟡 #5 — Data terstruktur (JSON-LD) → ditambahkan

Schema `Organization` dengan nama, alamat lengkap, email, tanggal berdiri, dan logo ditambahkan ke `<head>` kedua halaman (`<script type="application/ld+json">`).

## 🟡 #6 — `robots.txt` & `sitemap.xml` → ditambahkan

`robots.txt` (allow all + link sitemap) dan `sitemap.xml` (2 URL, dengan anotasi `hreflang` ID/EN) dibuat di root.

## 🟡 #7 — Title & meta description kepanjangan → dipersingkat

| | Sebelum | Sesudah |
|---|---|---|
| Title ID | 77 karakter | 48 karakter |
| Title EN | 81 karakter | — (title EN juga dipersingkat jadi versi singkat, `og:title` tetap pakai versi lengkap untuk social share) |
| Deskripsi ID | 168 karakter | 133 karakter |

`<link rel="canonical">` juga ditambahkan ke kedua halaman (sebelumnya tidak ada).

## 🟢 #8 — File PPT tak terpakai → dihapus (sesuai konfirmasi user)

`New Company Profile.ppt` dan folder `ppt_images/` (41 gambar) dihapus dari project. Catatan: keduanya ternyata sudah masuk `.gitignore` sejak awal (tidak pernah ikut ter-commit ke git), jadi tidak pernah benar-benar ter-deploy lewat GitHub — tapi tetap dibersihkan dari direktori kerja sesuai keputusan user. Entry `.gitignore` yang sudah tidak relevan untuk file-file ini juga dibersihkan, diganti dengan entry `node_modules/` untuk tooling build yang baru ditambahkan.

## 🟢 #9 — Gambar mati (dikomentari) → dihapus

Tag `<img>` yang dikomentari untuk `machine-02.jpg` dan `lab-cmm-operator.jpg` dihapus dari `index.html` & `en.html`. Kedua file gambar yang sudah tidak punya referensi sama sekali juga dihapus dari `assets/images/`.

---

## Verifikasi yang dijalankan setelah semua perbaikan

- **Lighthouse** (performance/accessibility/best-practices/seo) dijalankan ulang — hasil di atas.
- **Playwright + Chromium**, scroll realistis (bukan fast-scroll, supaya animasi reveal teruji benar) di 3 ukuran layar × 2 bahasa = 6 kombinasi: tidak ada console error atau resource gagal (selain flakiness jaringan sandbox pengujian ke host eksternal, bukan dari kode situs).
- **Tes interaksi ulang**: menu mobile, lightbox + keyboard, filter produk, form kontak saat Formspree gagal, anchor scroll — semua hasil identik dengan sebelum perbaikan (tidak ada regresi fungsional).
- **Simulasi pemblokiran total ke semua host eksternal** — halaman tetap tampil 100% utuh (tinggi halaman identik: 6558px), membuktikan Temuan #1 benar-benar teratasi.
- Tinggi halaman penuh (`scrollHeight`) index.html & en.html di ketiga ukuran layar **identik sebelum dan sesudah perbaikan** — membuktikan tidak ada perubahan layout/visual yang tidak diinginkan.

## File yang perlu di-build ulang jika HTML diubah lagi

Setelah ini, setiap kali ada class Tailwind baru dipakai di `index.html`/`en.html`, jalankan:

```bash
npm run build:css
```

untuk memperbarui `assets/css/tailwind.css`. Ada juga `npm run watch:css` untuk mode watch saat development.
