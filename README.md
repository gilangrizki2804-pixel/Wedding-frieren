# ⚜️ Undangan Pernikahan Pixel Bertema Frieren: Beyond Journey's End ⚜️

Undangan pernikahan digital interaktif bertema **Sousou no Frieren (Frieren: Beyond Journey's End)** dengan estetika **Retro Pixel Art RPG (16-bit JRPG)**.

---

## 🌟 Fitur Utama & Alur Interaktif

### 1. Halaman Awal (Opening Chest & Lingkaran Sihir)
- **Peti Tertutup**: Pada layar pembuka, tampil peti harta karun tertutup bergaya pixel art di bawah langit malam berbintang dengan partikel bunga/mana teratai biru melayang.
- **Klik Peti**:
  - Peti terbuka dengan animasi snap dan memunculkan sosok pixel **Frieren** yang lucu dengan dialog khasnya: *"Kurai yo! Kowai yo! ...Eh, kalian sudah datang?!"*.
  - **Lingkaran Sihir Frieren** muncul di belakang peti, berputar pelan lalu **berputar semakin lama semakin cepat dan memancarkan cahaya biru/cyan yang kian terang**.
  - Efek suara sintetis retro 8-bit (fanfare pembuka peti + dengungan sihir *Zoltraak* berakselerasi) melalui **Web Audio API** (tanpa perlu file audio eksternal).
  - Terjadi kilatan sihir putih (*Teleport Flash*) yang membawa pembaca berpindah ke halaman utama gereja!

### 2. Halaman Utama (Peta Gereja Pernikahan Katedral)
- Menampilkan pemandangan gereja katedral pernikahan isometrik pixel art definisi tinggi (*Himmel & Frieren di pelaminan bersama para sahabat*).
- **Penanda Interaktif (Hotspots & Pins)** di atas setiap karakter:
  - 💍 **Himmel & Frieren (Pelaminan Utama)**: Profil kedua mempelai, kutipan janji suci cinta, dan hitung mundur (*live countdown timer*) menuju hari pernikahan.
  - 📜 **Pendeta Heiter (Altar)**: Jadwal dan detail Ibadah Pemberkatan / Akad Nikah lengkap dengan tombol *Simpan ke Google Calendar*.
  - 🍗 **Prajurit Eisen (Sayap Kiri)**: Jadwal Pesta Resepsi & Jamuan Kerajaan, dress code, dan protokol tamu.
  - ⚔️ **Stark & Sahabat**: Linimasa Kisah Cinta (*Love Story Timeline*) perjalanan 10 tahun sang pahlawan dan penyihir.
  - 💌 **Fern & Methode**: Formulir RSVP interaktif (Konfirmasi Kehadiran, Jumlah Tamu, Doa Restu) yang langsung tersimpan di *localStorage* dan tampil di daftar ucapan.
  - 📍 **Pendeta Sein**: Denah lokasi katedral, alamat lengkap, dan sematan peta interaktif Google Maps.
  - 📖 **Grimoire / Buku Tamu (Pojok Kiri Bawah)**: Amplop Digital (Nomor Rekening BCA, Mandiri, QRIS) dengan tombol **Salin No. Rekening** satu kali klik dan alamat pengiriman kado fisik.
  - ✨ **Banner Gantung (Kanan Atas)**: Sambutan hangat keluarga besar kerajaan kepada para tamu.

### 3. Kontrol Tambahan & Pengalaman Pengguna (UX)
- **Musik BGM Retro 8-bit**: Melodi dongeng fantasi damai yang dimainkan secara prosedural via Web Audio API, dilengkapi tombol on/off.
- **Kamera Otomatis & Drag Pan**: Mengetuk menu atau karakter akan mengarahkan kamera gereja secara mulus (*smooth scrolling*) ke posisi karakter.
- **Zoom In / Zoom Out / Pusatkan**: Kontrol navigasi mengambang (*HUD controls*) untuk kenyamanan membaca di ponsel pintar maupun komputer.
- **Toggle Penanda**: Tombol untuk menampilkan atau menyembunyikan pin penanda karakter agar karya seni pixel gereja dapat dinikmati seutuhnya.
- **Replay Peti**: Tombol untuk mengulang kembali animasi pembukaan peti kapan saja.

---

## 🚀 Cara Menjalankan & Membuka

Cukup buka file `index.html` langsung di browser favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari):

```bash
# Atau klik ganda (double-click) pada file index.html di File Explorer
```

### Navigasi Cepat Menggunakan URL Hash:
- Buka langsung ke peta gereja: `index.html#main`
- Buka dialog mempelai: `index.html#himmel-frieren`
- Buka dialog jadwal pemberkatan: `index.html#heiter`
- Buka formulir RSVP: `index.html#fern`
- Buka amplop digital: `index.html#grimoire`
- Preview peti terbuka: `index.html#open-preview`

---

## 🎨 Struktur Berkas Proyek

```
Undangan Freiren/
│
├── index.html                           # Struktur HTML utama aplikasi
├── style.css                            # Tata letak pixel, efek sihir, & tema JRPG
├── script.js                            # Logika interaktif, Web Audio synth, modal dialog, & RSVP
├── README.md                            # Panduan dokumentasi lengkap
│
└── assets/
    ├── chest_closed.png                 # Sprite pixel art peti tertutup (transparan)
    ├── chest_open.png                   # Sprite pixel art peti terbuka dengan Frieren
    ├── magic_circle_transparent.png     # Lingkaran sihir Frieren berputar (transparan)
    ├── wedding_map.jpg                  # Peta isometrik gereja katedral pernikahan
    ├── avatar_himmel.png                # Avatar dialog pixel Himmel
    ├── avatar_frieren.png               # Avatar dialog pixel Frieren
    ├── avatar_heiter.png                # Avatar dialog pixel Heiter
    ├── avatar_eisen.png                 # Avatar dialog pixel Eisen
    ├── avatar_stark.png                 # Avatar dialog pixel Stark
    ├── avatar_fern.png                  # Avatar dialog pixel Fern
    ├── avatar_sein.png                  # Avatar dialog pixel Sein
    ├── avatar_methode.png               # Avatar dialog pixel Methode
    └── avatar_grimoire.png              # Avatar dialog pixel Buku Tamu Grimoire
```

---

## ✏️ Panduan Kustomisasi Informasi Pernikahan

Untuk menyesuaikan nama calon pengantin, tanggal, dan nomor rekening Anda:
1. Buka file `script.js`.
2. Temukan objek `characterData`:
   - Ganti nama pengantin di bagian `'himmel-frieren'`.
   - Ganti tanggal acara dan jam di bagian `'heiter'` dan `'eisen'`.
   - Ubah nomor rekening bank BCA / Mandiri / E-Wallet pada bagian `'grimoire'`.
   - Sesuaikan tanggal hitung mundur pada fungsi `startCountdown()` (default: `2026-10-24`).
