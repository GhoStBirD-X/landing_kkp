# Laporan QA — Landing Page PT Karya Komponen Presisi

**Tanggal:** 2026-10-01 · **Branch:** main · **Mode:** Full (awalnya report-only, seluruh temuan kemudian diperbaiki atas permintaan user pada hari yang sama) · **Target:** `index.html` (ID) + `en.html` (EN), statis HTML/CSS/JS, berjalan tanpa server/API.

> **Update 2026-10-01:** Semua temuan di bawah ini sudah diperbaiki. Lihat [`PERBAIKAN-2026-10-01.md`](./PERBAIKAN-2026-10-01.md) untuk rincian perbaikan dan hasil verifikasi ulang (before/after Lighthouse, screenshot, tes fungsional). Isi laporan asli di bawah dipertahankan sebagai riwayat/bukti temuan.

**Metode:** baca semua source (HTML/CSS/JS), audit gambar & link, Lighthouse (performance/accessibility/best-practices/SEO), dan simulasi browser nyata (Chromium via Playwright) di 3 ukuran layar — desktop 1440px, tablet 768px, mobile 390px — termasuk mengetes klik menu mobile, lightbox galeri, filter produk, dan form kontak saat jaringan gagal.

---

## Ringkasan cepat

| Area | Status |
|---|---|
| Konten & copy | ✅ Rapi, konsisten ID/EN |
| Navigasi & link internal | ✅ Semua anchor & gambar terhubung benar |
| Fungsionalitas (menu, galeri, filter, form) | ✅ Semua teruji jalan dengan baik |
| Responsivitas (mobile/tablet/desktop) | ✅ Layout aman di semua ukuran |
| Accessibility (Lighthouse) | ✅ 100/100 |
| Best Practices & SEO dasar (Lighthouse) | ✅ 100/100 |
| **Performa (Lighthouse)** | 🔴 **66/100** — lihat Temuan #1 |
| **Ketahanan terhadap gangguan jaringan** | 🔴 **Satu titik kegagalan kritis** — lihat Temuan #1 |
| SEO lanjutan (share link, metadata sosial) | 🟡 Beberapa hal belum ada |

Kesimpulan singkat: **konten, desain, dan fitur interaktif situs ini sudah solid** — tidak ada bug fungsional yang ditemukan setelah pengujian langsung di browser. Masalah paling serius justru bukan di kode HTML yang terlihat, tapi di satu baris `<script>` yang membuat seluruh tampilan situs bergantung pada layanan pihak ketiga.

---

## 🔴 Temuan Kritis

### 1. Seluruh tampilan situs bisa rusak total jika satu CDN gagal dimuat

**Lokasi:** `index.html:11` dan `en.html:11` — `<script src="https://cdn.tailwindcss.com"></script>`

**Apa yang terjadi:** Situs ini memuat framework styling (Tailwind CSS) langsung dari CDN publik, dieksekusi di browser pengunjung setiap kali halaman dibuka. Ini adalah mode "demo/development" dari Tailwind — [dokumentasi resminya menyebut secara eksplisit bahwa ini tidak boleh dipakai di production](https://tailwindcss.com/docs/installation/play-cdn), karena tidak ada file CSS yang sudah jadi — semua style dibuat ulang oleh JavaScript setiap kali halaman dimuat.

**Saya membuktikan dampaknya langsung:** dengan memblokir CDN tersebut (mensimulasikan pemblokiran firewall kantor klien, ad-blocker, gangguan CDN, atau koneksi lambat), halaman yang terbuka berubah menjadi HTML polos tanpa gaya sama sekali — navbar jadi teks biasa menumpuk, tinggi halaman melonjak dari ~6.500px menjadi **22.734px**, dan seluruh identitas visual perusahaan (warna brand, layout, logo, galeri) hilang total.

**Kenapa ini penting untuk bisnis ini secara khusus:** PT Karya Komponen Presisi melayani klien otomotif (Kayaba, FIM Piston, MTM) yang kemungkinan mengakses situs ini dari jaringan kantor/korporat dengan firewall ketat — jenis jaringan yang paling sering memblokir CDN eksternal yang tidak dikenal. Saat itu terjadi, calon klien akan melihat halaman rusak, bukan sekadar lambat.

**Bukti juga muncul saat pengujian normal** — satu dari enam kali pengujian otomatis gagal karena koneksi sempat terputus sesaat ke CDN ini, dan langsung memunculkan error `tailwind is not defined` di console browser.

**Rekomendasi:** build Tailwind CSS menjadi satu file `.css` statis (proses build sekali di komputer, bukan di browser pengunjung) lalu host sendiri bersama `assets/css/style.css` yang sudah ada. Ini pekerjaan satu kali, tidak mengubah tampilan sama sekali, dan menghilangkan risiko ini selamanya.

---

## 🟠 Temuan Performa (Lighthouse)

### 2. Waktu tampil konten utama (LCP) sangat lambat: 8.2 detik

| Metrik | Nilai | Standar Google |
|---|---|---|
| First Contentful Paint | 3.4 detik | idealnya < 1.8 detik |
| **Largest Contentful Paint** | **8.2 detik** | idealnya < 2.5 detik |
| Speed Index | 4.6 detik | idealnya < 3.4 detik |
| Skor Performance Lighthouse | **66 / 100** | — |

**Sebab utamanya** (diverifikasi lewat Lighthouse "render-blocking" audit):
- Script Tailwind CDN (127 KB) — blocking ~789 ms, **ini akar masalah yang sama dengan Temuan #1**. Memperbaiki #1 otomatis memperbaiki sebagian besar dari masalah ini.
- Font Google (Poppins & Inter) dimuat lewat `@import` di CSS — blocking ~803 ms. Lebih cepat kalau dipindah jadi `<link rel="preconnect">` + `<link rel="stylesheet">` di `<head>` HTML.
- Logo klien dan badge ISO berukuran file jauh lebih besar dari kebutuhan tampilnya (lihat Temuan #3).

### 3. Gambar logo kecil dengan ukuran file sangat besar — buang-buang kuota & waktu loading

| File | Ukuran file | Ukuran tampil di halaman |
|---|---|---|
| `client-mtm.png` | 191 KB | tinggi ~44px |
| `iso-9001-badge.png` | 181 KB | tinggi ~24–40px |
| `client-kyb.png` | 126 KB | tinggi ~48px |

Logo-logo ini kemungkinan diunggah langsung dari file resolusi tinggi aslinya tanpa dikompres. Mengubahnya ke PNG terkompresi atau WEBP (seperti foto mesin produksi yang sudah pakai `.webp` dengan baik) bisa memangkas ukurannya hingga 90% tanpa kelihatan beda di layar.

---

## 🟡 Temuan Menengah — SEO & Social Sharing

### 4. Tidak ada preview saat link dibagikan ke WhatsApp/LinkedIn/Facebook

Tidak ditemukan tag Open Graph (`og:title`, `og:description`, `og:image`) maupun Twitter Card di kedua halaman. Untuk perusahaan B2B yang linknya sering dibagikan lewat WhatsApp oleh sales/marketing ke calon klien, ini berarti pesan yang muncul saat link ditempel akan kosong atau asal-asalan (tergantung platform), bukan menampilkan logo/judul perusahaan yang rapi.

**Rekomendasi:** tambahkan 4–5 baris meta tag `og:*` di `<head>` memakai judul, deskripsi, dan satu foto fasilitas/logo yang representatif.

### 5. Tidak ada data terstruktur (JSON-LD) untuk Google Business/Knowledge Panel

Alamat, nama perusahaan, dan sertifikasi ISO sudah ada sebagai teks, tapi tidak ditandai sebagai `LocalBusiness`/`Organization` lewat JSON-LD. Ini membantu Google menampilkan info perusahaan lebih kaya di hasil pencarian (lokasi, jam operasional, dll). Tidak wajib, tapi "cepat dan murah" untuk ditambahkan karena semua datanya sudah ada di halaman.

### 6. Tidak ada `robots.txt` maupun `sitemap.xml`

Tidak krusial untuk situs sekecil ini (2 halaman), tapi keduanya adalah praktik standar SEO yang sering dicek oleh Google Search Console.

### 7. Title tag sedikit melebihi batas tampil di hasil pencarian

Title ID: 77 karakter, title EN: 81 karakter. Google biasanya memotong tampilan di sekitar 60 karakter, jadi bagian akhir judul ("...untuk Industri Otomotif") kemungkinan terpotong di hasil pencarian. Meta description (168–171 karakter) juga sedikit di atas batas aman ~155–160 karakter.

---

## 🟢 Catatan Kebersihan Repo (tidak berdampak ke pengunjung situs)

### 8. File company profile PPT (41 gambar + 1 file `.ppt`) tidak terpakai oleh situs

Folder `ppt_images/` (41 file PNG) dan `New Company Profile.ppt` di root project **tidak direferensikan sama sekali** oleh `index.html` atau `en.html`. Jika folder project ini di-deploy apa adanya ke hosting, file-file ini ikut terupload dan bisa diakses publik tanpa guna (ukurannya cukup besar secara total). Aman untuk dipindahkan ke luar folder yang di-deploy, atau dihapus dari situs jika memang hanya arsip internal.

### 9. Dua foto di bagian "Tentang" sudah dinonaktifkan (dikomentari), bukan dihapus

Di `index.html:136-137` dan `en.html:136-137`, ada 2 tag `<img>` untuk `machine-02.jpg` dan `lab-cmm-operator.jpg` yang dinonaktifkan lewat komentar HTML. File gambarnya masih ada di `assets/images/` tapi tidak pernah tampil. Bukan bug — kemungkinan sengaja disembunyikan — tapi perlu dipastikan apakah itu memang keputusan final atau tertinggal dari eksperimen layout sebelumnya.

---

## ✅ Yang Sudah Diuji dan Berfungsi Baik (bukti, bukan asumsi)

Saya menjalankan browser asli (Chromium headless via Playwright) dan benar-benar mengklik/menekan tombol, bukan hanya membaca kode:

- **Menu mobile (hamburger):** terbuka, `aria-expanded` berubah dengan benar, dan otomatis tertutup setelah link di dalamnya diklik.
- **Lightbox galeri foto:** terbuka saat foto diklik, tombol Next/Prev bekerja dan tetap dalam grup galeri yang benar (`2 / 5` saat di galeri fasilitas mesin), serta tertutup dengan tombol `Escape`.
- **Filter kategori produk:** klik "Cylinder Guide" dengan benar menyisakan hanya 2 kartu produk yang cocok, sisanya tersembunyi.
- **Form kontak saat gagal kirim** (disimulasikan dengan memutus koneksi ke Formspree): pesan error berbahasa Indonesia yang tepat muncul ("Pesan gagal terkirim. Periksa koneksi internet Anda..."), dan tombol kirim kembali aktif — tidak macet dalam kondisi "disabled" selamanya.
- **Navigasi anchor (#tentang, #produk, dst.):** halaman scroll ke posisi yang benar, section tidak tertutup navbar yang fixed di atas.
- **Semua gambar yang dirujuk di HTML benar-benar ada di folder**, tidak ada broken image. Semua gambar di folder juga benar-benar dipakai (kecuali 2 yang dikomentari di atas).
- **Tampilan di 3 ukuran layar** (390px mobile, 768px tablet, 1440px desktop): tidak ada elemen yang terpotong, menumpuk, atau meluber ke luar layar, baik di versi ID maupun EN.
- **Accessibility:** skor Lighthouse 100/100 — label aria pada tombol menu/lightbox lengkap, kontras warna lolos cek otomatis, form punya `<label>` yang terhubung benar ke setiap input.
- **Domain produksi `www.karyakomponen.com` aktif dan menyajikan versi halaman yang sama** dengan yang ada di branch ini — tidak ada halaman basi (stale) antara repo dan yang live.

**Yang sengaja tidak diuji:** pengiriman form kontak yang sesungguhnya ke Formspree (hanya disimulasikan gagalnya) — ini dihindari agar tidak mengirim pesan uji coba palsu ke kotak masuk email bisnis yang sebenarnya. Jika ingin memastikan form benar-benar meneruskan email, lakukan satu kali pengiriman manual dan konfirmasi email masuk.

---

## Prioritas yang disarankan (bukan perbaikan — hanya urutan jika ingin ditindaklanjuti)

1. **Build Tailwind secara lokal, hosting sendiri CSS-nya** (Temuan #1 & #2) — dampak terbesar, mengatasi risiko total-rusak sekaligus mayoritas masalah kecepatan.
2. **Kompres logo client & badge ISO** (Temuan #3) — cepat, hampir tanpa risiko.
3. **Tambahkan Open Graph tags** (Temuan #4) — cepat, langsung berdampak ke tampilan link yang dibagikan sales/marketing.
4. Sisanya (#5–#9) bersifat penyempurnaan, bisa menyusul kapan saja.
