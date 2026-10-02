# Dokumentasi Sistem Desain & Panduan Pengembangan Estetika
## Narasi Kota Khatulistiwa: Pesona Budaya, Sejarah, dan Titik Nol Derajat

---

## 1. Ringkasan Eksekutif & Filosofi Desain

Proyek ini dibangun di atas filosofi desain **Terra — Organic Design ("Rooted Warmth")**, sebuah pendekatan estetika yang memadukan keanggunan majalah editorial independen kontemporer dengan kedalaman historis dan budaya lokal Kota Pontianak, Kalimantan Barat.

Berbeda dari situs pariwisata umum yang kaku, berbasis template generik, atau menggunakan pola bahasa mekanis buatan mesin (AI), arsitektur desain proyek ini mengutamakan **kejernihan narasi (narrative immersion)**, **keaslian kultural (local cultural authenticity)**, dan **kehalusan interaksi mikro (tactile micro-interactions)**.

```
       [ Filosofi "Rooted Warmth" ]
      ┌─────────────────────────────┐
      │  Warna Alam Pesisir & Rimba │
      │  Tipografi Klasik Editorial │
      │  Transisi Sinematik 120 FPS │
      │  Bahasa Jurnalistik Sastrawi│
      └──────────────┬──────────────┘
                     │
  ┌──────────────────┴──────────────────┐
  ▼                                     ▼
Implementasi Kode Nyata              Peluang Pengembangan
(Arsitektur & Komponen Aktif)        (Desain Masa Depan)
```

---

## 1.1. Palet Warna Resmi ("Rooted Warmth Palette")

Palet warna dirancang berdasarkan elemen geografis dan kultural asli Pontianak: gambut Kalimantan, kayu belian ulin, riak Sungai Kapuas, dedaunan hutan hujan tropis, dan kilau emas khatulistiwa.

| Nama Token Warna | Nilai HEX / RGBA | Asosiasi Filosofis & Elemen Alam | Penerapan Utama pada Antarmuka (UI) |
| :--- | :--- | :--- | :--- |
| **Canvas Ivory** | `#faf6f0` | Kertas buku ekspedisi tua, gading hangat | Latar belakang dasar halaman (`--color-terra-bg`), kartu editorial |
| **Surface Sand** | `#f4efe6` | Endapan pasir tepi muara Kapuas | Latar belakang panel sekunder (`--color-terra-surface`), modal dialog |
| **Surface Variant** | `#ede5d8` | Batu kerikil sungai & kayu lapuk | Latar kotak informasi khusus, hover state kartu |
| **Borneo Foliage** | `#4a7c59` | Daun rimba tropis & lumut pilar ulin | Warna primer brand (`--primary`), badge kategori, tombol aksi |
| **Borneo Hover** | `#3c6548` | Bayangan kanopi hutan lebat | State hover tombol primer, fokus interaktif |
| **Peat Ochre** | `#705c30` | Tanah gambut dalam & kayu belian tua | Aksen tersier (`--tertiary`), label koordinat, pembatas ornamen |
| **Equator Gold** | `#f5d070` | Sinar matahari tegak lurus (kulminasi) | Kilau partikel solar, badge transisi sinematik, panah kapsul `↗` |
| **Amber Spice** | `#d4a34b` | Kopi sangrai Hainan & rempah kuah kepiting | Aksen kuliner, label asal tradisi masakan khas |
| **Belian Charcoal** | `#2e3230` | Kayu besi belian yang tahan berabad-abad | Warna teks utama (`--text-main`), tipografi judul |
| **Morning Mist** | `#5d6660` | Kabut fajar di muara sungai | Teks sekunder/keterangan (`--text-muted`), kutipan kaki |
| **Deep Peat / Night**| `#232a25` | Malam pekat di tepian Sungai Kapuas | Panel sinematik, bingkai transisi layar penuh, footer |
| **Night Slate** | `#1c221e` | Kedalaman palung air Kapuas | Latar belakang terdalam modal & backdrop blur |
| **Kapuas Azure** | `#93c5d6` | Refleksi langit di permukaan riak air | Partikel air pada transisi Bab 4 (Waterfront & Kapuas) |

---

## 1.2. Sistem Tipografi Tiga Pilar (Tri-Font Typography Hierarchy)

Menggunakan 3 jenis font dari Google Fonts dengan fungsi semantik yang terpisah tegas:

1. **Literata (`font-serif`) — Suara Narasi Sastrawi**:
   - Dibuat khusus untuk kenyamanan membaca teks panjang dengan sentuhan sastra klasik.
   - Digunakan pada: Judul utama bab, judul kartu cagar budaya, kutipan puitis (`blockquote`), dan subjudul transisi.
2. **Nunito Sans (`font-sans`) — Kejelasan Humanis Modern**:
   - Tipografi sans-serif dengan proporsi ramah, kurva lembut, dan keterbacaan tinggi di berbagai ukuran layar.
   - Digunakan pada: Paragraf deskripsi sejarah, teks isi modal, daftar karakteristik arsitektur.
3. **JetBrains Mono (`font-mono`) — Ketepatan Geografis & Astronomis**:
   - Tipografi monospace teknis presisi tinggi.
   - Digunakan pada: Koordinat garis lintang dan bujur (`00°00'00"`, `0°02'46.0"S`), ketinggian mdpl, angka indeks bab, dan label metadata tombol kapsul.

---

## 1.3. Perlakuan Estetika Visual Khusus (Artistic Visual Treatment)

- **Filter Kehangatan Analog (`.film-warmth`)**:
  `filter: contrast(96%) saturate(90%) sepia(8%);`
  Diterapkan pada semua foto fotografi sejarah dan lanskap untuk menetralkan kilap digital kamera modern, memberikan nuansa hangat ala cetakan foto analog majalah *National Geographic* era klasik.
- **Vektor Garis Tenun Corak Insang (`.insang-path`)**:
  Animasi gambar garis SVG (`stroke-dashoffset`) yang meniru proses menenun kain tradisional corak insang Kesultanan Kadriah Pontianak.
- **Kaca Es Organik (Organic Frosted Glass)**:
  Kombinasi `backdrop-blur-md`, `bg-[#232a25]/85` atau `bg-[#faf6f0]/10`, dan batas garis `border-[#faf6f0]/20` untuk menghadirkan kedalaman tanpa visual yang berantakan.

---

## 2. Dekonstruksi Apa yang Dihasilkan oleh Kode Desain

### 2.1. Eliminasi Template Kaku & Bahasa Berpola Mesin (Anti-AI Copywriting)

Salah satu masalah estetika pada web kontemporer adalah penggunaan template frasa yang seragam dan mekanis, seperti penggunaan emoji peniti lokasi (`📍`), label tutorial kaku (*"Transisi Menuju Bab 01"*, *"Selamat Datang • Bab 01"*), serta instruksi perintah eksplisit (*"Gulir ke bawah untuk membuka bab"*).

Kode telah diperbarui secara menyeluruh dengan pendekatan **jurnalistik-sastrawi**:

| Komponen / Titik UI | Pola Lama (Template Kaku / Gaya AI) | Implementasi Baru (Editorial & Natural) | Makna Desain & Dampak Pengalaman Pengguna |
| :--- | :--- | :--- | :--- |
| **Hero Scroll Cue** | `Gulir ke bawah atau klik untuk masuk ↓` | `Mulai telusuri kisah kota ↓` | Menghadirkan undangan menjelajah yang puitis dan hangat, bukan instruksi teknis pengoperasian browser. |
| **Badge Transisi 1** | `Transisi Menuju Bab 01` | `01 • Titian Fajar` | Memosisikan nomor bab sebagai nomor bab jurnal perjalanan bernuansa fajar Sungai Kapuas. |
| **Pintu Masuk Bab 1**| `Selamat Datang • Bab 01` | `Memasuki Suaka I • Titik Temu Kubah & Menara` | Menghilangkan gaya sapaan chatbot; mengantarkan pembaca ke tema arsitektur religi Masjid Mujahidin & Katedral. |
| **Badge Transisi 2** | `Transisi Menuju Bab 02` | `02 • Jalinan Hayat` | Menggambarkan keterikatan tiga etnis besar (Dayak, Melayu, Tionghoa) dalam metafora akar hutan Kalimantan. |
| **Pintu Masuk Bab 2**| `Selamat Datang • Bab 02` | `Menyusuri Akar II • Tiga Pilar Satu Peradaban` | Memberi pembobotan budaya yang bermartabat dan menghargai sejarah. |
| **Badge Transisi 3** | `Transisi Menuju Bab 03` | `03 • Garis Horizon Nol` | Menegaskan identitas geografis global Pontianak pada lintang 00°00'00". |
| **Pintu Masuk Bab 3**| `Selamat Datang • Bab 03` | `Menapaki Titik III • Lintang Nol Derajat` | Refleksi astronomis dan sains Tugu Khatulistiwa. |
| **Badge Transisi 4** | `Transisi Menuju Bab 04` | `04 • Riak Alir Kapuas` | Meniru ritme air sungai dan hembusan angin senja di Waterfront. |
| **Pintu Masuk Bab 4**| `Selamat Datang • Bab 04` | `Merengkuh Senja IV • Denyut Tepian Kapuas` | Ajakan visual menikmati ruang publik tepi sungai terpanjang di Nusantara. |
| **Badge Transisi 5** | `Transisi Menuju Bab 05` | `05 • Ceret & Rempah` | Sentuhan sensorik langsung ke tradisi warkop dan kuliner legendaris. |
| **Pintu Masuk Bab 5**| `Selamat Datang • Bab 05` | `Mengecap Rasa V • Pusaka Kopi & Kuliner Legendaris` | Mengukuhkan warisan rasa Warung Kopi Asiang 1958 dan hidangan otentik. |
| **Scroll Indicator** | `Gulir ke bawah untuk membuka bab` | `Lanjutkan perjalanan` | Mikro-teks kontemplatif disertai animasi bounce minimalis berbobot ringan. |
| **Sub-gerbang Bab** | `Gulir Lanjut Menuju Isi Bab` | `Menyusuri kisah selengkapnya` | Narasi mengalir alami seperti membalik lembaran buku cerita. |
| **Aksi Lewati** | `Lewati ke Bab Selanjutnya` | `Langsung ke Bab Selanjutnya` | Opsi aksesibilitas ringkas tanpa terkesan seperti tombol skip iklan video. |

---

### 2.2. Sistem Tombol Kapsul Editorial Interaktif (Interactive Capsule Location System)

Sebelumnya, penanda lokasi menggunakan format template mentah seperti `<span>📍 Tugu Khatulistiwa Siantan</span>`. Format ini telah digantikan dengan **Tombol Kapsul Editorial Interaktif**:

#### Karakteristik Visual & Interaksi Komponen
1. **Bentuk Kapsul Halus (Full Pill Radius)**: Menggunakan `rounded-full` dengan padding presisi (`px-3.5 py-1.5` atau `px-4 py-2`).
2. **Ikonografi Vektor Presisi**: Menggantikan emoji unicode `📍` dengan SVG pin geografis dua lingkaran bergaris tajam (stroke width 2), yang berskala proporsional dengan tipografi di sebelahnya.
3. **Elevasi & Kedalaman Lapisan**:
   - Di atas latar gelap (Prolog & Transisi): Menggunakan latar semi-transparan `bg-[#faf6f0]/10` dengan garis tepi halus `border border-[#faf6f0]/20`, efek hover `hover:border-[#f5d070]/60`, dan aksen panah keemasan `↗`.
   - Di atas latar terang (Bab Religi, Budaya, & Kuliner): Menggunakan kombinasi hijau lumut hutan `bg-[#4a7c59]` atau emas tanah lempung `bg-[#705c30]/10`.
4. **Fungsionalitas Langsung**: Setiap tombol lokasi terhubung langsung ke **Modal Peta Google Maps Interaktif** terintegrasi, menampilkan peta embed satelit/peta jalan, koordinat derajat menit detik (DMS), alamat presisi, dan tombol petunjuk arah resmi tanpa perlu meninggalkan konteks halaman utama.

```tsx
// Cuplikan Standar Desain Tombol Kapsul Lokasi (Dark Mode / Glass)
<button
  type="button"
  onClick={() => setSelectedMapLocation(MAP_LOCATIONS.khatulistiwa)}
  className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf6f0]/10 hover:bg-[#faf6f0]/20 border border-[#faf6f0]/20 hover:border-[#f5d070]/60 text-[#faf6f0] text-xs font-mono transition-all duration-200 cursor-pointer shadow-sm"
>
  <svg className="w-3.5 h-3.5 text-[#f5d070] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
  <span className="font-medium text-[#faf6f0]/95">Tugu Khatulistiwa, Siantan</span>
  <span className="text-[10px] text-[#f5d070] group-hover:translate-x-0.5 transition-transform">↗</span>
</button>
```

---

### 2.3. Rekayasa Komponen Transisi Sinematik (`ChapterTransition.tsx`)

Komponen `ChapterTransition` merupakan elemen pembeda utama pada website ini. Komponen ini dirancang dengan standar performa visual 60–120 FPS tanpa menyebabkan *React re-renders* saat pengguna menggulir layar.

#### Fitur Arsitektur Komponen:
1. **Direct DOM Transform Loop**:
   - Membaca posisi relatif elemen pembungkus terhadap *viewport* (`getBoundingClientRect`).
   - Mengontrol properti CSS `transform: translate3d(...)` dan `opacity` secara langsung ke Node DOM melalui `requestAnimationFrame`.
2. **Ketinggian Scroll Khusus (Scroll Chamber)**:
   - Diberi tinggi fisik `300vh` dengan elemen visual `sticky top-0 h-screen`, memberikan ruang geser (*scroll runway*) yang cukup bagi pengguna untuk menikmati pembukaan tirai transisi secara bertahap.
3. **5 Tema Atmosferik Unik Pontianak**:
   - `mist-dew` (Prolog → Bab 1): Tirai vertikal kabut fajar Sungai Kapuas dengan partikel embun melayang.
   - `borneo-jungle` (Bab 1 → Bab 2): Tirai belantara daun tropis hijau yang terbelah ke kiri dan kanan dengan vektor daun berotasi.
   - `equator-solar` (Bab 2 → Bab 3): Belahan meridian garis khatulistiwa dengan kilau suar surya (solar flares) di titik kulminasi nol derajat.
   - `kapuas-waters` (Bab 3 → Bab 4): Sapuan riak gelombang air sungai dan percikan air perahu kayu tambang.
   - `coffee-spice` (Bab 4 → Bab 5): Tirai karung goni (*burlap*) kedai kopi dengan kepulan uap air panas mendidih dan percikan bara sangrai kopi.

---

## 3. Analisis Kritis & Saran Pengembangan Desain (Design Improvements)

Meskipun sistem desain saat ini telah mencapai mutu visual yang tinggi, berikut adalah evaluasi mendalam dan rekomendasi terstruktur untuk membawa estetika situs ke level **kelas dunia (editorial flagship benchmark)**:

---

### 🏛️ Pilar 1: Ritme Tipografi Editorial & Tata Letak Majalah

#### Kondisi Saat Ini
Tipografi saat ini mengandalkan kombinasi `font-serif` untuk judul utama dan kutipan naratif, `font-sans` untuk paragraf deskripsi, serta `font-mono` untuk metadata geografis (koordinat, ketinggian, tanggal). Struktur ini sudah rapi, namun variasi ritme tata letak masih didominasi format grid kartu 2 atau 3 kolom simetris.

#### Rekomendasi Peningkatan
1. **Drop Caps Berkarakter Nusantara / Melayu**:
   - Menambahkan huruf kapital pertama berukuran besar (*Initial Drop Cap*) setinggi 3-4 baris teks pada setiap paragraf pembuka bab, dengan ornamen sudut tipis khas insang Pontianak atau sulur daun ulin.
2. **Anotasi Marginalia (Side Notes)**:
   - Memanfaatkan ruang kosong (*gutter*) di samping kiri/kanan desktop untuk catatan tepi sejarah pendek (misal: asal-usul kayu belian, fakta kulminasi matahari, catatan perjalanan ekspedisi Belanda 1928), meniru estetika buku atlas ilmiah kuno.
3. **Hierarki Kontras Skala Ekstrem**:
   - Pada judul-judul pembuka bab (misal *"Pusat Bumi 00°00'00""*), naikkan skala tipografi menjadi `text-7xl` hingga `text-8xl` dengan kerning rapat (*tight tracking*) untuk menciptakan titik fokus visual (*focal punch*) yang dramatis sebelum mata pembaca turun ke teks penjelasan.

---

### 🌊 Pilar 2: Imersi Sensorik Audio & Soundscape Lingkungan

#### Kondisi Saat Ini
Pengalaman pengguna saat ini bersifat murni visual (teks, foto, dan animasi gerak partikel). Karakter Pontianak sebagai *Kota Air* dan *Ibu Kota Seribu Kedai Kopi* memiliki dimensi akustik yang sangat kuat yang belum terekspresikan.

#### Rekomendasi Peningkatan
1. **Soundscape Ambience Kontekstual Berdasarkan Posisi Scroll**:
   - **Prolog & Bab 4 (Kapuas)**: Suara lembut desau riak air sungai, gemercik haluan perahu, dan suara sayup burung air mangrove.
   - **Bab 1 (Religi)**: Nuansa akustik ruang katedral yang hening bercampur lembut dengan alunan angin di kubah masjid.
   - **Bab 2 (Budaya)**: Petikan lembut dawai alat musik tradisional *Sapeh* Dayak dengan dentang genta kelenteng.
   - **Bab 5 (Kopi Asiang)**: Suara atmosferik kedai kopi (dentang sendok teh membentur gelas kaca, desis uap ceret tembaga mendidih, riuh rendah obrolan pagi pengunjung warkop).
2. **Panel Kontrol Suara yang Elegan**:
   - Menyediakan tombol pemutar suara mengambang (*floating ambient audio toggle*) di sudut kiri bawah layar dengan visualisator equalizer mini 3-bar dinamis.
   - Default suara dalam kondisi senyap (*muted by default* untuk mematuhi etika web & performa), dengan notifikasi lembut *"Sentuh untuk mendengarkan denyut suara kota"*.

---

### 🗺️ Pilar 3: Navigasi Spasial & Timeline Mini-Map Interaktif

#### Kondisi Saat Ini
Saat ini pengguna mengetahui posisinya melalui sticky rail di sisi kiri bertuliskan *"Titik Hening"*, *"01 Suaka Religi"*, dll., serta tombol pembuka modal Google Maps di masing-masing kartu.

#### Rekomendasi Peningkatan
1. **Rel Sungai Kapuas Interaktif (River Path Progress Indicator)**:
   - Menggantikan garis lurus vertikal di sisi kiri dengan visualisasi kurva liku Sungai Kapuas (garis vektor SVG dinamis). Titik perahu kecil bergerak menyusuri lekukan sungai seiring dengan bertambahnya persentase scroll pengguna.
2. **Peta Mini Interaktif Selalu Terlihat (Floating Spatial Mini-Map)**:
   - Menambahkan opsi tampilan mini-map inset di pojok layar yang menampilkan peta skematik Pontianak Utara, Pontianak Kota, dan Pontianak Timur.
   - Setiap kali pembaca melewati bab tertentu, titik lokasi bersangkutan berpendar (*pulsing amber dot*), memberikan orientasi spasial nyata di mana letak objek budaya tersebut di peta geografis kota.

---

### 📱 Pilar 4: Optimasi Gerak, Haptik, & Gestur Layar Sentuh (Mobile/Touch)

#### Kondisi Saat Ini
Efek transisi gorden daun, belahan kabut, dan matahari telah dioptimalkan dengan Lenis dan transformasi CSS GPU. Namun pada layar smartphone, sebagian interaksi masih mengandalkan tarikan scroll jari yang panjang (*continuous swipe*).

#### Rekomendasi Peningkatan
1. **Dukungan Haptic Feedback**:
   - Memanfaatkan Web Vibration API (`navigator.vibrate`) pada perangkat Android saat pengguna berhasil menyelesaikan transisi tirai atau membuka modal peta (getaran mikro 15ms yang sangat halus seperti tombol kamera fisik).
2. **Pacing Transisi Adaptif Layar Sentuh**:
   - Pada layar di bawah 768px, perpendek ketinggian runway scroll transisi dari `300vh` menjadi `200vh` agar pengguna smartphone tidak merasa letih menggesek layar terlalu banyak sebelum mencapai konten utama bab.
3. **Mode Hemat Daya & Preferensi Aksesibilitas**:
   - Menambahkan deteksi otomatis `@media (prefers-reduced-motion: reduce)` yang secara instan mengganti animasi partikel dan tirai yang berat menjadi transisi cross-fade lembut 300ms bagi pengguna yang sensitif terhadap motion sickness atau mengaktifkan mode hemat baterai.

---

## 4. Matriks Ringkasan Roadmap Pengembangan Desain

| Bidang Pengembangan | Status Kode Saat Ini | Target Tahap Selanjutnya | Tingkat Kompleksitas | Dampak Estetika |
| :--- | :--- | :--- | :--- | :--- |
| **Gaya Bahasa Narasi** | Jurnalistik & Sastrawi (Bebas AI) | Kurasi kutipan sastra lokal Pontianak | Rendah | ⭐⭐⭐⭐⭐ (Sangat Tinggi) |
| **Tombol Lokasi** | Kapsul Pill SVG + Modal Peta | Integrasi navigasi rute estimasi waktu | Sedang | ⭐⭐⭐⭐ (Tinggi) |
| **Transisi Bab** | 5 Tema Partikel Sinematik 120 FPS | Penyesuaian responsif layar ponsel pintar | Sedang | ⭐⭐⭐⭐⭐ (Sangat Tinggi) |
| **Tata Letak Tipografi** | Responsive Multi-column Grid | Asymmetric Editorial + Marginalia | Sedang | ⭐⭐⭐⭐ (Tinggi) |
| **Audio Lingkungan** | Belum diimplementasikan | Spatial Soundscape Web Audio API | Menengah-Tinggi | ⭐⭐⭐⭐⭐ (Sangat Tinggi) |
| **Navigasi Spasial** | Sticky Rail Monospace | Kurva Vektor Sungai Kapuas Dinamis | Menengah | ⭐⭐⭐⭐ (Tinggi) |

---

## 5. Kesimpulan & Panduan Standar Kode Masa Depan

Seluruh modifikasi yang telah diterapkan di [src/components/ChapterTransition.tsx](file:///home/andrean/wisata-pontianak/src/components/ChapterTransition.tsx) dan [src/app/page.tsx](file:///home/andrean/wisata-pontianak/src/app/page.tsx) membuktikan bahwa situs web budaya dapat tampil **modern, mewah, dan berkelas dunia** tanpa kehilangan jiwa lokalnya.

**Prinsip yang Harus Dipertahankan Pengembang Selanjutnya**:
1. **Jangan kembali menggunakan emoji bawaan (seperti `📍`, `👉`, `🔥`)** di dalam teks narasi utama. Selalu gunakan SVG terukur dengan palet warna sistem (`#4a7c59`, `#705c30`, `#f5d070`).
2. **Hindari instruksi mesin eksplisit**. Gantilah kata-kata instruksi mekanis dengan frasa sastrawi yang menuntun pembaca secara intuitif.
3. **Pertahankan arsitektur animasi bebas render**. Setiap efek animasi scroll harus selalu menggunakan referensi langsung (*direct DOM manipulation*) melalui `useRef` dan `translate3d` demi menjaga kehalusan scroll 120 FPS di seluruh monitor modern.
