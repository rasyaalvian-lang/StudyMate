# AI LOGBOOK
## PROYEK STUDYMATE AI
**Tema: Solusi Digital untuk Kehidupan Sehari-hari Berbantuan Kecerdasan Artifisial**

**Nama Anggota Kelompok:**
1. Achmad Kamil Nabil Insan
2. Rasya Alvian Lutfi

**Kelas:** XI

**Mata Pelajaran:** IPA & IPS

---

# TAHAP 1 — EKSPLORASI IDE & PERANCANGAN SOLUSI

**Fokus: Interaksi AI dalam Menentukan Konsep Produk**

## A. Aktivitas dan Interaksi dengan AI

Pada tahap awal, kami mencari ide untuk membuat produk digital yang sesuai dengan tema tugas, yaitu “Solusi Digital untuk Kehidupan Sehari-hari Berbantuan Kecerdasan Artifisial”. Kami ingin mengembangkan sebuah website yang bermanfaat, menarik, dan dapat dibuat menggunakan HTML, CSS, serta JavaScript sesuai dengan kemampuan kami sebagai pemula.

Kami menggunakan ChatGPT untuk membantu mengeksplorasi ide website, menentukan tujuan produk, dan merancang fitur yang dapat dikembangkan. Melalui diskusi tersebut, kami mulai mempertimbangkan konsep website yang dapat membantu aktivitas sehari-hari, khususnya dalam bidang pendidikan dan pembelajaran.

Setelah mempertimbangkan kebutuhan pengguna dan tingkat kesulitan pengembangan, kami memilih konsep StudyMate AI sebagai proyek yang akan kami kerjakan.

## B. Hasil dari Bantuan AI

StudyMate AI merupakan website pendamping belajar yang dirancang untuk membantu siswa mengakses beberapa fitur pembelajaran dalam satu platform. Konsep awal yang kami susun mencakup fitur dashboard, catatan digital, kuis interaktif, flashcard, dan asisten belajar.

Teknologi yang kami pilih adalah HTML untuk menyusun struktur halaman, CSS untuk mengatur tampilan, dan JavaScript untuk menjalankan interaksi serta fungsi website. Kami juga merencanakan penggunaan localStorage untuk menyimpan data tertentu pada browser tanpa menggunakan database.

Pada tahap awal, kami memutuskan untuk tidak menggunakan API AI eksternal agar proses pengembangan lebih sederhana dan sesuai dengan kemampuan kami. Asisten belajar direncanakan menggunakan logika JavaScript sederhana sehingga belum memiliki kemampuan seperti model AI generatif yang terhubung melalui API.

## C. Validasi & Modifikasi Mandiri

Kami meninjau ide dan saran yang diberikan AI berdasarkan kesesuaian dengan tema tugas, manfaat bagi siswa, dan kemampuan teknis kami. Setelah mempertimbangkan beberapa kemungkinan, kami memilih StudyMate AI karena konsep tersebut memungkinkan kami mengembangkan beberapa fitur pembelajaran dalam satu website.

Kami menentukan sendiri fitur utama yang ingin dikembangkan serta membatasi penggunaan teknologi pada HTML, CSS, dan JavaScript tanpa API eksternal maupun database pada tahap awal. Keputusan ini bertujuan agar proses pengembangan lebih terarah dan dapat kami pahami secara bertahap.

Dengan demikian, AI berperan sebagai alat bantu dalam eksplorasi dan perancangan ide, sedangkan pemilihan konsep dan penentuan kebutuhan awal produk menjadi keputusan kami.

---

# TAHAP 2 — PENYUSUNAN KERANGKA KODE (SCAFFOLDING)

**Fokus: Interaksi AI dalam Menyusun Struktur Dasar Kode**

## A. Aktivitas dan Interaksi dengan AI

Setelah menentukan konsep StudyMate AI, kami melanjutkan proses dengan menyusun kerangka kode website. Kami meminta bantuan ChatGPT untuk membuat struktur HTML, menyusun CSS yang sesuai, dan mengembangkan JavaScript untuk mengatur fungsi serta interaksi pada setiap fitur.

Kami mengerjakan kode secara bertahap, dimulai dari HTML sebagai struktur dasar halaman, dilanjutkan dengan CSS untuk desain antarmuka, kemudian JavaScript untuk menjalankan fitur website. Kami juga meminta bantuan AI untuk memastikan ketiga bagian kode tersebut saling terhubung.

Dalam proses pengembangan, kami berusaha memahami fungsi setiap bagian kode agar dapat melakukan penyesuaian apabila ditemukan ketidakcocokan.

## B. Hasil dari Bantuan AI

Dari proses penyusunan kerangka kode, kami memperoleh rancangan website dengan beberapa halaman utama, yaitu dashboard, catatan digital, kuis, flashcard, dan asisten belajar.

Pada bagian JavaScript, kami menggunakan fungsi untuk mengatur navigasi halaman, mengelola catatan, menjalankan kuis, menampilkan jawaban flashcard, dan memberikan respons sederhana melalui asisten belajar. Kami juga menggunakan localStorage untuk menyimpan data tertentu agar tetap tersedia setelah halaman dimuat ulang.

Selain fitur awal tersebut, kami menambahkan file `auth.js` untuk mengembangkan fitur login akun. Penambahan ini merupakan pengembangan tambahan dari rancangan awal website.

## C. Validasi & Modifikasi Mandiri

Kami memeriksa kode yang diberikan AI dengan memperhatikan kesesuaian antara struktur HTML, aturan CSS, dan fungsi JavaScript. Kami meninjau penggunaan ID, class, serta pemanggilan fungsi agar tidak terjadi ketidakcocokan yang dapat mengganggu jalannya website.

Kami juga melakukan pengembangan tambahan berupa file `auth.js` untuk fitur login akun. Penambahan tersebut kami lakukan sebagai upaya mengembangkan fungsi website di luar fitur utama yang direncanakan pada awal proyek.

Melalui proses ini, kami memahami bahwa kode yang dihasilkan AI tidak selalu dapat langsung digunakan tanpa pemeriksaan. Kami perlu menyesuaikannya dengan struktur proyek dan kebutuhan fitur yang sedang dikembangkan.

---

# TAHAP 3 — PEMECAHAN MASALAH & PENANGANAN GALAT (DEBUGGING)

**Fokus: Interaksi AI dalam Mengidentifikasi dan Memperbaiki Kesalahan Kode**

## A. Aktivitas dan Interaksi dengan AI

Pada tahap pengembangan, kami menemukan perlunya penyesuaian antara kode HTML dan JavaScript agar fungsi website berjalan sesuai dengan rancangan. Oleh karena itu, kami menggunakan ChatGPT untuk membantu memeriksa ketidakcocokan kode dan mencari kemungkinan penyebab kesalahan.

Salah satu bagian yang kami periksa adalah fitur kuis, khususnya kesesuaian antara struktur HTML dan fungsi JavaScript yang digunakan untuk menjalankan kuis.

Kami meminta bantuan AI untuk meninjau kode dan memberikan arahan perbaikan agar elemen yang digunakan dalam JavaScript sesuai dengan elemen yang tersedia pada HTML.

## B. Hasil dari Bantuan AI

Melalui proses debugging, kami memperoleh arahan untuk memeriksa beberapa aspek penting dalam kode website, antara lain:

1. Kesesuaian ID dan class pada HTML dengan selector yang digunakan JavaScript.
2. Kesesuaian struktur elemen HTML dengan fungsi yang mengakses elemen tersebut.
3. Kesesuaian tombol navigasi dengan fungsi perpindahan halaman.
4. Kesesuaian struktur bagian kuis dengan logika JavaScript yang menjalankannya.
5. Penempatan dan pemanggilan JavaScript agar dapat mengakses elemen HTML yang diperlukan.

Proses tersebut membantu kami memahami bahwa kesalahan program dapat terjadi karena ketidakcocokan antara beberapa bagian kode, bukan hanya karena kesalahan penulisan pada satu baris.

## C. Validasi & Modifikasi Mandiri

Kami memeriksa saran perbaikan yang diberikan AI dengan membandingkannya terhadap struktur kode yang kami gunakan. Kami memusatkan perhatian pada hubungan antara elemen HTML dan fungsi JavaScript, terutama pada bagian kuis yang perlu disesuaikan dengan struktur halaman.

Kami menggunakan arahan AI sebagai referensi untuk menentukan bagian yang perlu diperbaiki. Setiap perubahan perlu disesuaikan dengan kode yang benar-benar digunakan agar tidak menimbulkan ketidakcocokan baru pada fitur lain.

Kami juga memahami bahwa saran AI tidak dapat langsung dianggap benar sebelum diperiksa. Oleh karena itu, hasil perbaikan perlu diuji kembali untuk mengetahui apakah fungsi yang bermasalah telah berjalan sesuai harapan.

Melalui proses ini, kami belajar bahwa debugging memerlukan ketelitian, pemahaman terhadap hubungan antarkomponen, dan evaluasi terhadap hasil perubahan kode.

---

# TAHAP 4 — REFLEKSI & PENJELASAN KODE

**Fokus: Pemahaman Kode, Evaluasi Produk, dan Refleksi Penggunaan AI**

## A. Aktivitas dan Interaksi dengan AI

Setelah melalui proses perancangan, penyusunan kode, dan debugging, kami meninjau kembali struktur serta fungsi website StudyMate AI. Kami menggunakan ChatGPT untuk membantu memahami peran HTML, CSS, dan JavaScript serta hubungan ketiganya dalam membangun website interaktif.

Kami juga mempelajari fungsi beberapa bagian program, seperti navigasi halaman, pengelolaan catatan, penyimpanan menggunakan localStorage, pelaksanaan kuis, pergantian flashcard, dan respons sederhana pada asisten belajar.

Melalui proses tersebut, kami berusaha memahami kode yang digunakan agar tidak hanya mengandalkan hasil yang diberikan AI, tetapi juga mengetahui tujuan dari setiap bagian program.

## B. Hasil Pemahaman terhadap Kode

Berdasarkan proses pengembangan, kami memahami fungsi teknologi yang digunakan sebagai berikut.

**1. HTML**

HTML digunakan untuk membentuk struktur halaman website, seperti menu navigasi, dashboard, formulir catatan, bagian kuis, flashcard, dan asisten belajar.

**2. CSS**

CSS digunakan untuk mengatur tampilan website, meliputi warna, ukuran elemen, jarak, tata letak, tipografi, dan desain antarmuka agar lebih rapi serta mudah digunakan.

**3. JavaScript**

JavaScript digunakan untuk mengatur interaksi website, seperti perpindahan halaman, pengelolaan catatan, perhitungan skor kuis, pergantian flashcard, dan respons sederhana dari asisten belajar.

**4. localStorage**

localStorage digunakan untuk menyimpan data tertentu pada browser sehingga data tersebut dapat tetap tersedia setelah halaman dimuat ulang, selama data belum dihapus dan mekanisme penyimpanannya berjalan dengan benar.

**5. auth.js**

File `auth.js` ditambahkan untuk mengembangkan fitur login akun. Implementasi dan tingkat keamanan fitur tersebut perlu disesuaikan dengan mekanisme yang benar-benar digunakan dalam kode proyek.

Kami juga memahami bahwa StudyMate AI pada versi awal belum menggunakan API AI eksternal. Asisten belajar masih mengandalkan logika JavaScript sederhana sehingga kemampuannya terbatas dibandingkan sistem yang terhubung dengan model AI generatif.

## C. Validasi & Modifikasi Mandiri

Kami meninjau kembali kode dan rancangan website untuk memastikan bahwa fitur yang dikembangkan sesuai dengan tujuan awal proyek. Kami menggunakan penjelasan AI sebagai referensi untuk memahami fungsi kode, kemudian mencocokkannya dengan struktur HTML, CSS, dan JavaScript yang kami gunakan.

Kami juga mengevaluasi keputusan untuk tidak menggunakan API eksternal pada tahap awal. Kami memahami bahwa pendekatan ini memudahkan proses pembelajaran dan pengembangan, tetapi membatasi kemampuan asisten belajar dalam menghasilkan jawaban yang lebih luas dan dinamis.

Selain itu, kami menyadari bahwa setiap saran AI perlu dipertimbangkan berdasarkan kebutuhan proyek. Kami tidak hanya berfokus pada banyaknya fitur, tetapi juga pada kesesuaian struktur kode, kemudahan penggunaan, dan kemampuan kami dalam memahami program.

## D. Refleksi Pembelajaran

Selama mengembangkan StudyMate AI, kami memperoleh pengalaman dalam merancang produk digital, menyusun kode, menyesuaikan hubungan antarkomponen, dan mempelajari proses debugging.

Kami memahami bahwa HTML, CSS, dan JavaScript memiliki peran yang berbeda tetapi saling berkaitan. Kesalahan pada satu bagian dapat memengaruhi fungsi bagian lain sehingga diperlukan pemeriksaan dan pengujian secara menyeluruh.

Penggunaan ChatGPT membantu kami memperoleh arahan, memahami struktur kode, dan mencari kemungkinan penyebab kesalahan. Namun, kami menyadari bahwa hasil dari AI tetap perlu ditinjau dan disesuaikan dengan kebutuhan proyek.

Kami juga belajar membagi pekerjaan menjadi beberapa tahap agar proses pengembangan lebih terarah. Melalui proyek ini, kami memahami bahwa AI merupakan alat bantu pembelajaran, sedangkan pemahaman, pertimbangan, dan keputusan dalam mengembangkan produk tetap menjadi tanggung jawab kami.

---

# KESIMPULAN AKHIR

Pengembangan StudyMate AI memberikan pengalaman kepada kami dalam memanfaatkan kecerdasan artifisial sebagai alat bantu untuk membuat produk digital. Proses pengembangan mencakup eksplorasi ide, perancangan solusi, penyusunan kerangka kode, debugging, serta refleksi dan pemahaman terhadap program yang digunakan.

Melalui setiap tahap, kami belajar bahwa saran AI perlu diperiksa dan disesuaikan dengan kebutuhan proyek. Kami juga memahami pentingnya menguji perubahan kode sebelum menyimpulkan bahwa suatu fitur telah berjalan dengan baik.

Kami menyimpulkan bahwa penggunaan AI dapat membantu proses pembelajaran dan pengembangan website, tetapi pemahaman mandiri, ketelitian, dan kemampuan mengambil keputusan tetap diperlukan agar produk yang dihasilkan sesuai dengan tujuan yang telah direncanakan.
