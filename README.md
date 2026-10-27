# StudyMate — Platform Belajar Digital Interaktif

## A. Judul dan Deskripsi

### Nama Produk

**StudyMate — Platform Belajar Digital Interaktif**

### Latar Belakang Masalah

Kami membuat StudyMate sebagai solusi digital untuk membantu pelajar belajar dengan lebih teratur, praktis, dan interaktif. Kami melihat bahwa pelajar sering mengalami kesulitan dalam mengatur catatan, mengingat materi pelajaran, serta menguji pemahaman mereka setelah belajar.

Oleh karena itu, kami mengembangkan StudyMate sebagai website yang menggabungkan beberapa fitur belajar dalam satu platform. Dengan adanya website ini, kami berharap kegiatan belajar menjadi lebih mudah, terorganisasi, dan menarik.

### Target Pengguna

Target pengguna StudyMate adalah pelajar tingkat SMP, SMA, dan SMK yang ingin mengelola kegiatan belajar secara lebih efektif melalui website sederhana yang mudah digunakan.

### Fitur Utama

1. **Login dan Akun:** Memungkinkan pengguna masuk ke akun untuk mengakses platform belajar. Fitur pendaftaran akun juga disediakan agar pengguna dapat membuat akun baru.
2. **Dashboard:** Menampilkan ringkasan aktivitas belajar.
3. **Catatan:** Memungkinkan pengguna menambahkan, mengedit, dan menghapus catatan pelajaran.
4. **Kuis Interaktif:** Membantu pengguna menguji pemahaman materi dan melihat hasil kuis.
5. **Flashcard:** Membantu pengguna mengingat konsep penting melalui kartu tanya jawab.
6. **Asisten Belajar:** Memberikan respons berdasarkan kata kunci dari pertanyaan yang dimasukkan pengguna.

## B. Teknologi yang Digunakan

Dalam mengembangkan StudyMate, kami menggunakan teknologi berikut:

- **HTML5:** Untuk membuat struktur dan elemen halaman website.
- **CSS3:** Untuk mengatur tampilan, warna, tata letak, dan responsivitas website.
- **JavaScript:** Untuk membuat fitur website menjadi interaktif.
- **DOM API:** Untuk mengakses dan mengubah elemen HTML melalui JavaScript.
- **LocalStorage:** Untuk menyimpan data tertentu di browser sehingga data tetap tersedia setelah halaman dimuat ulang.
- **Live Server:** Sebagai pilihan untuk menjalankan dan menguji website secara lokal.
- **GitHub:** Untuk menyimpan kode sumber proyek.
- **GitHub Pages:** Sebagai platform yang dapat kami gunakan untuk memublikasikan website agar dapat diakses secara online.

Kami memilih teknologi tersebut karena relatif sederhana dan sesuai dengan kemampuan kami dalam mempelajari pengembangan website menggunakan HTML, CSS, dan JavaScript.

## C. Pengungkapan Penggunaan AI (AI Usage Disclosure)

Dalam proses pengembangan StudyMate, kami menggunakan **ChatGPT sebagai alat bantu pembelajaran dan pengembangan kode**. Kami memanfaatkannya untuk mendapatkan referensi struktur HTML, desain CSS, logika JavaScript, serta penjelasan ketika menemukan kesalahan dalam kode.

### Contoh Prompt yang Kami Gunakan

1. "Kami adalah pemula dalam pembuatan HTML, CSS, dan JavaScript. Kami mendapatkan sebuah proyek untuk membuat website dengan tema 'Solusi Digital untuk Kehidupan Sehari-hari Berbantuan Kecerdasan Artifisial'. Tolong buatkan ide-ide yang dapat membantu kami mengembangkan website dari tema tersebut."
2. "Bantu kami merancang proyek website bertema Solusi Digital untuk Kehidupan Sehari-hari Berbantuan Kecerdasan Artifisial. Pilihan proyek: StudyMate. Kemampuan: Pemula. Gaya desain: Profesional. Pendekatan AI: Tanpa API. Penyimpanan: Tanpa database."
3. "Tolong periksa kecocokan kode HTML, CSS, dan JavaScript kami serta jelaskan bagian yang perlu diperbaiki."

### Penyesuaian dan Perbaikan yang Kami Lakukan

Dalam pengembangan StudyMate, kami menggunakan HTML, CSS, dan JavaScript untuk membangun website belajar yang memiliki beberapa fitur dalam satu platform. Kami melakukan penyesuaian pada login akun, tampilan, navigasi, pengelolaan catatan, kuis interaktif, flashcard, dan asisten belajar.

Pada bagian tampilan, kami menyusun halaman menggunakan sidebar, dashboard, kartu statistik, serta tata letak responsif agar website dapat menyesuaikan ukuran layar. Kami juga menggunakan variabel CSS untuk mengatur warna dan menambahkan animasi partikel sebagai elemen visual.

Pada bagian fungsionalitas, kami menggunakan JavaScript untuk menghubungkan navigasi, mengelola catatan, memproses jawaban kuis, menghitung skor, dan memperbarui statistik dashboard. Kami juga menggunakan LocalStorage agar catatan dan statistik tertentu tetap tersimpan di browser setelah halaman dimuat ulang.

Kami mengembangkan fitur kuis dengan kumpulan soal yang dikelompokkan berdasarkan mata pelajaran. Kami menambahkan pilihan mata pelajaran, umpan balik jawaban, penjelasan soal, dan perhitungan persentase hasil kuis. Pada fitur flashcard, kami menggunakan logika untuk menampilkan pertanyaan dan jawaban secara bergantian.

Kami juga mengembalikan fitur asisten belajar ke versi tanpa API. Asisten tersebut menggunakan pencocokan kata kunci dan materi yang telah disiapkan di dalam JavaScript. Dengan demikian, website dapat dijalankan tanpa API key atau backend AI eksternal.

Dalam proses pengembangan, kami memeriksa keterhubungan elemen HTML dengan selector JavaScript, mengatur tampilan melalui CSS, serta menambahkan penanganan kesalahan dan beberapa atribut aksesibilitas. Kami menggunakan bantuan AI sebagai referensi dan perlu memastikan kembali kode serta fungsi yang digunakan melalui pengujian.

Penyesuaian tersebut membantu kami memahami bahwa pengembangan website tidak hanya mencakup tampilan, tetapi juga logika program, penyimpanan data, interaksi pengguna, dan pengujian fungsi.

## D. Panduan Penggunaan

StudyMate merupakan website berbasis HTML, CSS, dan JavaScript sehingga dapat dijalankan melalui browser.

### Cara Menjalankan Website Secara Lokal

1. Siapkan seluruh file proyek StudyMate, termasuk `index.html`, `style.css`, dan `script.js`.
2. Simpan semua file tersebut dalam satu folder proyek.
3. Buka folder proyek menggunakan Visual Studio Code.
4. Pastikan file CSS dan JavaScript sudah terhubung dengan benar ke file HTML.
5. Buka file `index.html` melalui browser atau gunakan ekstensi Live Server di Visual Studio Code.
6. Setelah website terbuka, pilih fitur yang ingin digunakan melalui menu navigasi.

### Cara Menggunakan Fitur

1. **Login dan Akun:** Masuk menggunakan akun yang tersedia atau buat akun baru jika fitur pendaftaran telah diterapkan.
2. **Dashboard:** Melihat ringkasan aktivitas belajar.
3. **Catatan:** Menambahkan catatan baru, mengedit catatan yang sudah ada, atau menghapus catatan.
4. **Kuis:** Memulai kuis, memilih jawaban, dan melihat hasilnya.
5. **Flashcard:** Membuka kartu untuk mempelajari pertanyaan dan jawabannya.
6. **Asisten Belajar:** Menuliskan pertanyaan yang berkaitan dengan materi yang telah didukung oleh sistem.

### Tautan Website

- **Repository GitHub:** [https://github.com/rasyaalvian-lang/StudyMate]
- **Website aktif:** [https://rasyaalvian-lang.github.io/StudyMate/]

Jika website belum dipublikasikan, kami dapat menjalankannya secara lokal terlebih dahulu. Tautan website aktif akan kami isi setelah proses publikasi selesai.

## E. Identitas Pengembang

- **Nama Lengkap:** Rasya Alvian Lutfi dan Achmad Kamil Nabil Insan
- **Kelas:** XI
- **Jurusan:** IPA dan IPS
- **Asal Sekolah:** SMAS Al-Rifa'ie Gondanglegi
- **Nama Produk:** StudyMate
- **Tahun Pembuatan:** 2026

---

### Penutup

Melalui StudyMate, kami ingin menerapkan pengetahuan yang kami pelajari dalam pengembangan website untuk menghasilkan solusi digital yang bermanfaat bagi pelajar. Proyek ini juga menjadi sarana bagi kami untuk meningkatkan kemampuan dalam menggunakan HTML, CSS, dan JavaScript, sekaligus memahami proses perancangan, pengembangan, pengujian, dan publikasi sebuah website.
