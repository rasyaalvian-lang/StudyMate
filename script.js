
/* ========================================
   STUDYMATE - SCRIPT.JS
   Interaksi website tanpa API dan database
======================================== */

"use strict";

/* ========================================
   1. FUNGSI PENYIMPANAN LOCALSTORAGE
======================================== */

/* MODIFIKASI */
const STORAGE_KEYS = {
    notes: "studymate_notes",
    quizCount: "studymate_quiz_count",
    quizProgress: "studymate_quiz_progress"
};

function loadData(key, fallback) {
    try {
        const saved = localStorage.getItem(key);
        return saved === null ? fallback : JSON.parse(saved);
    } catch (error) {
        console.warn("Data tidak dapat dibaca:", error);
        return fallback;
    }
}

function saveData(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error("Data tidak dapat disimpan:", error);
        alert("Data tidak dapat disimpan. Periksa pengaturan penyimpanan browser.");
        return false;
    }
}

let notes = loadData(STORAGE_KEYS.notes, []);
if (!Array.isArray(notes)) notes = [];

let quizCount = Number(loadData(STORAGE_KEYS.quizCount, 0)) || 0;
let quizProgress = Number(loadData(STORAGE_KEYS.quizProgress, 0)) || 0;


/* ========================================
   2. UTILITAS DOM
======================================== */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}


/* ========================================
   3. NAVIGASI ANTARHALAMAN
======================================== */

function showPage(pageId) {
    const targetPage = document.getElementById(pageId);
    if (!targetPage || !targetPage.classList.contains("page")) return;

    $$(".page").forEach((page) => {
        const isActive = page.id === pageId;
        page.classList.toggle("active", isActive);
        page.hidden = !isActive;
    });

    $$(".nav-link").forEach((button) => {
        const isActive = button.dataset.page === pageId;
        button.classList.toggle("active", isActive);

        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
}

$$(".nav-link").forEach((button) => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

$$("[data-go]").forEach((button) => {
    button.addEventListener("click", () => {
        showPage(button.dataset.go);
    });
});


/* ========================================
   4. CATATAN DIGITAL
======================================== */

const noteForm = $("#note-form");
const noteTitleInput = $("#note-title");
const noteSubjectInput = $("#note-subject");
const noteContentInput = $("#note-content");
const notesList = $("#notes-list");

let editingNoteId = null;

function resetNoteForm() {
    noteForm.reset();
    editingNoteId = null;

    const submitButton = $('button[type="submit"]', noteForm);
    if (submitButton) submitButton.textContent = "Simpan Catatan";
}

function renderNotes() {
    notesList.replaceChildren();

    if (notes.length === 0) {
        notesList.appendChild(
            createElement(
                "p",
                "empty-state",
                "Belum ada catatan. Yuk, buat catatan pertamamu!"
            )
        );
        updateDashboard();
        return;
    }

    notes.forEach((note) => {
        const card = createElement("article", "note-item");
        const subject = createElement("span", "note-subject", note.subject);
        const title = createElement("h4", "", note.title);
        const content = createElement("p", "note-content", note.content);
        const actions = createElement("div", "note-actions");

        const editButton = createElement("button", "", "Edit");
        editButton.type = "button";
        editButton.addEventListener("click", () => {
            editingNoteId = note.id;
            noteTitleInput.value = note.title;
            noteSubjectInput.value = note.subject;
            noteContentInput.value = note.content;

            const submitButton = $('button[type="submit"]', noteForm);
            if (submitButton) submitButton.textContent = "Perbarui Catatan";

            noteForm.scrollIntoView({ behavior: "smooth", block: "start" });
            noteTitleInput.focus();
        });

        const deleteButton = createElement("button", "delete-note", "Hapus");
        deleteButton.type = "button";
        deleteButton.addEventListener("click", () => {
            const confirmed = window.confirm(
                `Hapus catatan "${note.title}"?`
            );
            if (!confirmed) return;

            notes = notes.filter((item) => item.id !== note.id);
            saveData(STORAGE_KEYS.notes, notes);

            if (editingNoteId === note.id) resetNoteForm();
            renderNotes();
        });

        actions.append(editButton, deleteButton);
        card.append(subject, title, content, actions);
        notesList.appendChild(card);
    });

    updateDashboard();
}

noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = noteTitleInput.value.trim();
    const subject = noteSubjectInput.value;
    const content = noteContentInput.value.trim();

    if (!title || !subject || !content) {
        alert("Silakan lengkapi semua kolom catatan.");
        return;
    }

    if (editingNoteId !== null) {
        notes = notes.map((note) =>
            note.id === editingNoteId
                ? {
                    ...note,
                    title,
                    subject,
                    content,
                    updatedAt: new Date().toISOString()
                }
                : note
        );
    } else {
        notes.unshift({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            title,
            subject,
            content,
            createdAt: new Date().toISOString()
        });
    }

    if (saveData(STORAGE_KEYS.notes, notes)) {
        resetNoteForm();
        renderNotes();
    }
});


/* ========================================
   5. BANK SOAL KUIS
======================================== */

const quizQuestions = [
    {
        question: "Organ tubuh yang berfungsi memompa darah ke seluruh tubuh adalah ...",
        options: ["Paru-paru", "Jantung", "Lambung", "Ginjal"],
        answer: 1,
        explanation: "Jantung memompa darah agar oksigen dan nutrisi dapat diedarkan ke seluruh tubuh."
    },
    {
        question: "Hasil dari 12 × 8 adalah ...",
        options: ["86", "92", "96", "108"],
        answer: 2,
        explanation: "12 dikalikan 8 sama dengan 96."
    },
    {
        question: "Proses tumbuhan membuat makanan dengan bantuan cahaya disebut ...",
        options: ["Respirasi", "Evaporasi", "Fotosintesis", "Adaptasi"],
        answer: 2,
        explanation: "Fotosintesis menggunakan energi cahaya untuk membantu tumbuhan membuat makanan."
    },
    {
        question: "Planet tempat manusia tinggal adalah ...",
        options: ["Mars", "Venus", "Jupiter", "Bumi"],
        answer: 3,
        explanation: "Bumi adalah planet tempat manusia dan berbagai makhluk hidup tinggal."
    },
    {
        question: "Sinonim kata 'cerdas' adalah ...",
        options: ["Lalai", "Pandai", "Lambat", "Lemah"],
        answer: 1,
        explanation: "Cerdas memiliki makna yang dekat dengan pandai atau pintar."
    },
    {
        // ===== IPA (1-5) =====
        subject : "IPA",
        question: "Organ tubuh manusia yang berfungsi memompa darah adalah ...",
        options: ["Paru-paru", "Jantung", "Hati", "Ginjal"],
        answer: 1,
        explanation: "Jantung berfungsi memompa darah ke seluruh tubuh."
    },
    {
        subject : "IPA",
        question: "Perubahan air menjadi uap air disebut ...",
        options: ["Membeku", "Mencair", "Menguap", "Mengembun"],
        answer: 2,
        explanation: "Menguap adalah perubahan wujud zat cair menjadi gas."
    },
    {
        subject : "IPA",
        question: "Sumber energi utama bagi Bumi adalah ...",
        options: ["Bulan", "Matahari", "Angin", "Batu bara"],
        answer: 1,
        explanation: "Matahari memberikan cahaya dan panas yang mendukung kehidupan di Bumi."
    },
    {
        subject : "IPA",
        question: "Gas yang dibutuhkan manusia untuk bernapas adalah ...",
        options: ["Nitrogen", "Karbon dioksida", "Oksigen", "Hidrogen"],
        answer: 2,
        explanation: "Manusia membutuhkan oksigen untuk proses respirasi."
    },
    {
        subject : "IPA",
        question: "Hubungan antara lebah dan bunga yang saling menguntungkan disebut ...",
        options: ["Parasitisme", "Komensalisme", "Mutualisme", "Predasi"],
        answer: 2,
        explanation: "Lebah memperoleh nektar, sedangkan bunga terbantu proses penyerbukannya."
    },
    {
        // ===== IPS (6-10) =====
        subject : "IPS",
        question: "Kegiatan menghasilkan barang atau jasa disebut ...",
        options: ["Konsumsi", "Produksi", "Distribusi", "Investasi"],
        answer: 1,
        explanation: "Produksi adalah kegiatan menghasilkan atau menambah nilai guna barang dan jasa."
    },
    {
        subject : "IPS",
        question: "Garis khayal yang membagi Bumi menjadi belahan utara dan selatan adalah ...",
        options: ["Garis bujur", "Garis lintang", "Garis khatulistiwa", "Garis tanggal"],
        answer: 2,
        explanation: "Garis khatulistiwa membagi Bumi menjadi belahan utara dan selatan."
    },
    {
        subject : "IPS",
        question: "ASEAN didirikan pada tahun ...",
        options: ["1945", "1955", "1967", "1975"],
        answer: 2,
        explanation: "ASEAN didirikan pada 8 Agustus 1967 melalui Deklarasi Bangkok."
    },
    {
        subject : "IPS",
        question: "Kegiatan menyalurkan barang dari produsen kepada konsumen disebut ...",
        options: ["Produksi", "Distribusi", "Konsumsi", "Eksplorasi"],
        answer: 1,
        explanation: "Distribusi adalah kegiatan menyalurkan barang atau jasa kepada konsumen."
    },
    {
        subject : "IPS",
        question: "Organisasi yang menjadi dasar berdirinya ASEAN dibentuk oleh negara-negara di kawasan ...",
        options: ["Asia Tenggara", "Asia Timur", "Eropa Barat", "Amerika Selatan"],
        answer: 0,
        explanation: "ASEAN merupakan organisasi kerja sama negara-negara di kawasan Asia Tenggara."
    },
    {
        // ===== MATEMATIKA (11-15) =====
        subject : "Matematika",
        question: "Hasil dari 15 × 6 adalah ...",
        options: ["80", "85", "90", "95"],
        answer: 2,
        explanation: "15 × 6 = 90."
    },
    {
        subject : "Matematika",
        question: "Hasil dari 144 ÷ 12 adalah ...",
        options: ["10", "11", "12", "14"],
        answer: 2,
        explanation: "144 dibagi 12 sama dengan 12."
    },
    {
        subject : "Matematika",
        question: "Jika x + 7 = 15, nilai x adalah ...",
        options: ["6", "7", "8", "9"],
        answer: 2,
        explanation: "Kurangi kedua ruas dengan 7: x = 15 - 7 = 8."
    },
    {
        subject : "Matematika",
        question: "Luas persegi dengan panjang sisi 9 cm adalah ...",
        options: ["18 cm²", "36 cm²", "72 cm²", "81 cm²"],
        answer: 3,
        explanation: "Luas persegi = sisi × sisi = 9 × 9 = 81 cm²."
    },
    {
        subject : "Matematika",
        question: "Hasil dari 3/4 + 1/4 adalah ...",
        options: ["1/2", "1", "1 1/2", "2"],
        answer: 1,
        explanation: "Penyebutnya sama, jadi 3/4 + 1/4 = 4/4 = 1."
    },
    {
        // ===== BAHASA INGGRIS (16-20) =====
        subject : "Bahasa Inggris",
        question: 'What is the English word for "buku"?',
        options: ["Pen", "Table", "Book", "Chair"],
        answer: 2,
        explanation: '"Buku" dalam bahasa Inggris adalah "book".'
    },
    {
        subject : "Bahasa Inggris",
        question: 'Choose the correct sentence: "Saya seorang siswa."',
        options: ["I are a student.","I am a student.","I is a student.",
                  "I be a student."],
        answer: 1,
        explanation: '"I am a student" berarti "Saya seorang siswa."'
    },
    {
        subject : "Bahasa Inggris",
        question: 'What is the past tense of "go"?',
        options: ["Goed", "Going", "Goes", "Went"],
        answer: 3,
        explanation: 'Bentuk lampau (simple past) dari "go" adalah "went".'
    },
    {
        subject : "Bahasa Inggris",
        question: 'What is the opposite of "big"?',
        options: ["Tall", "Small", "Long", "Wide"],
        answer: 1,
        explanation: '"Small" berarti kecil dan merupakan lawan kata "big" (besar).'
    },
    {
        subject : "Bahasa Inggris",
        question: 'Complete the sentence: "She ___ a student."',
        options: ["am", "are", "is", "be"],
        answer: 2,
        explanation: 'Subjek "she" menggunakan "is" dalam simple present tense.'
    },
];

const quizContainer = $("#quiz-container");
const startQuizButton = $("#start-quiz");
const quizQuestionCount = $("#quiz-question-count");
const quizScoreLabel = $("#quiz-score");

let currentQuestionIndex = 0;
let currentScore = 0;
let quizFinished = false;
let questionAnswered = false;


function startQuiz() {
    const subjectSelect = document.querySelector("#quiz-subject");
    const selectedSubject = subjectSelect
        ? subjectSelect.value
        : "campuran";

    // Ambil soal sesuai mata pelajaran yang dipilih
    let filteredQuestions;

    if (selectedSubject === "campuran") {
        filteredQuestions = quizQuestions;
    } else {
        filteredQuestions = quizQuestions.filter(
            (question) => question.subject === selectedSubject
        );
    }

    // Periksa apakah soal tersedia
    if (filteredQuestions.length === 0) {
        alert("Belum ada soal untuk mata pelajaran ini.");
        return;
    }

    // Mulai kuis
    currentQuestionIndex = 0;
    currentScore = 0;
    quizFinished = false;
    questionAnswered = false;

    // Simpan soal yang dipilih untuk sesi kuis ini
    window.currentQuizQuestions = filteredQuestions;

    quizScoreLabel.textContent = "Skor: 0";
    startQuizButton.textContent = "Mulai Ulang Kuis";

    renderQuestion();
}


function renderQuestion() {
    quizContainer.replaceChildren();

    const activeQuestions = window.currentQuizQuestions || quizQuestions;
      if (currentQuestionIndex >= activeQuestions.length) {
        finishQuiz();
        return;
    }

    questionAnswered = false;
    
    const question = activeQuestions[currentQuestionIndex];

    
    quizQuestionCount.textContent =
          `Soal ${currentQuestionIndex + 1} dari ${activeQuestions.length}`;

    const heading = createElement(
        "h3",
        "quiz-question",
        question.question
    );

    const optionsContainer = createElement("div", "quiz-options");

    question.options.forEach((option, index) => {
        const button = createElement("button", "quiz-option", option);
        button.type = "button";

        button.addEventListener("click", () => {
            if (questionAnswered) return;
            questionAnswered = true;

            const isCorrect = index === question.answer;

            if (isCorrect) currentScore++;

            $$(".quiz-option", optionsContainer).forEach((optionButton, optionIndex) => {
                optionButton.disabled = true;

                if (optionIndex === question.answer) {
                    optionButton.classList.add("correct");
                } else if (optionIndex === index && !isCorrect) {
                    optionButton.classList.add("incorrect");
                }
            });

            quizScoreLabel.textContent = `Skor: ${currentScore}`;

            const feedback = createElement(
                "div",
                "quiz-feedback",
                `${isCorrect ? "Benar!" : "Belum tepat."} ${question.explanation}`
            );

            const nextButton = createElement(
                "button",
                "primary-button",
               currentQuestionIndex === activeQuestions.length - 1
                ? "Lihat Hasil"
                : "Soal Berikutnya →"
            );
            nextButton.type = "button";
            nextButton.addEventListener("click", () => {
                currentQuestionIndex++;
                renderQuestion();
            });

            quizContainer.append(feedback, nextButton);
        });

        optionsContainer.appendChild(button);
    });

    quizContainer.append(heading, optionsContainer);
}


function finishQuiz() {
    if (quizFinished) return;
    quizFinished = true;

    // Gunakan jumlah soal sesuai mata pelajaran yang dipilih
    const activeQuestions =
        window.currentQuizQuestions || quizQuestions;

    const totalQuestions = activeQuestions.length;

    // Hitung persentase berdasarkan soal yang dikerjakan
    const percentage = totalQuestions > 0
        ? Math.round((currentScore / totalQuestions) * 100)
        : 0;

    quizCount++;
    quizProgress = percentage;

    saveData(STORAGE_KEYS.quizCount, quizCount);
    saveData(STORAGE_KEYS.quizProgress, quizProgress);

    quizQuestionCount.textContent = "Kuis selesai";
    quizScoreLabel.textContent =
        `Skor: ${currentScore}/${totalQuestions}`;

    quizContainer.replaceChildren();

    const result = createElement("div", "quiz-result");
    const title = createElement("h3", "", `${percentage}%`);

    const message = createElement(
        "p",
        "",
        `Kamu menjawab ${currentScore} dari ${totalQuestions} soal dengan benar.`
    );

    const encouragement = createElement(
        "p",
        "",
        percentage >= 80
            ? "Hebat! Pertahankan semangat belajarmu."
            : "Terus berlatih. Baca kembali materi dan coba lagi."
    );

    result.append(title, message, encouragement);
    quizContainer.appendChild(result);

    startQuizButton.textContent = "Coba Lagi";
    updateDashboard();
}

startQuizButton.addEventListener("click", startQuiz);


/* ========================================
   6. FLASHCARD
======================================== */

const flashcards = [
    {
        question: "Apa yang dimaksud dengan fotosintesis?",
        answer: "Proses tumbuhan membuat makanan dengan memanfaatkan energi cahaya."
    },
    {
        question: "Apa rumus luas persegi?",
        answer: "Luas persegi = sisi × sisi."
    },
    {
        question: "Apa yang dimaksud dengan gravitasi?",
        answer: "Gaya tarik antara benda-benda yang memiliki massa."
    }
];

const flashcardButton = $("#flashcard");
const flashcardLabel = $("#flashcard-label");
const flashcardText = $("#flashcard-text");
const flashcardCount = $("#flashcard-count");
const previousCardButton = $("#previous-card");
const nextCardButton = $("#next-card");

let currentFlashcardIndex = 0;
let flashcardFlipped = false;

function renderFlashcard() {
    const card = flashcards[currentFlashcardIndex];

    flashcardLabel.textContent =
        flashcardFlipped ? "JAWABAN" : "PERTANYAAN";

    flashcardText.textContent =
        flashcardFlipped ? card.answer : card.question;

    flashcardCount.textContent =
        `${currentFlashcardIndex + 1} / ${flashcards.length}`;

    flashcardButton.classList.toggle("is-flipped", flashcardFlipped);
}

flashcardButton.addEventListener("click", () => {
    flashcardFlipped = !flashcardFlipped;
    renderFlashcard();
});

previousCardButton.addEventListener("click", () => {
    currentFlashcardIndex =
        (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    flashcardFlipped = false;
    renderFlashcard();
});

nextCardButton.addEventListener("click", () => {
    currentFlashcardIndex =
        (currentFlashcardIndex + 1) % flashcards.length;
    flashcardFlipped = false;
    renderFlashcard();
});


/* ========================================
   7. BANK PENGETAHUAN ASSISTANT
   Berbasis kata kunci, bukan AI generatif
======================================== */

const knowledgeBase = [
    {
        keywords: ["fotosintesis", "tumbuhan membuat makanan"],
        answer: "Fotosintesis adalah proses tumbuhan membuat makanan dengan bantuan cahaya. Proses ini menggunakan air dan karbon dioksida, serta menghasilkan glukosa dan oksigen."
    },
    {
        keywords: ["gravitasi", "gaya tarik bumi"],
        answer: "Gravitasi adalah gaya tarik antara benda yang memiliki massa. Gravitasi Bumi membuat benda jatuh ke tanah dan membantu menjaga planet tetap mengorbit Matahari."
    },
    {
        keywords: ["belajar", "cara belajar", "tips belajar", "fokus"],
        answer: "Cobalah belajar dalam sesi singkat, tentukan satu tujuan, jauhkan gangguan, lalu uji pemahaman dengan menjawab pertanyaan tanpa melihat catatan. Istirahat secara teratur juga membantu menjaga konsentrasi."
    },
    {
        keywords: ["matematika", "rumus luas persegi", "luas persegi"],
        answer: "Luas persegi dihitung dengan rumus sisi × sisi. Contoh: jika panjang sisi 4 cm, luasnya adalah 4 × 4 = 16 cm²."
    },
    {
        keywords: ["jantung", "peredaran darah"],
        answer: "Jantung adalah organ yang memompa darah ke paru-paru dan seluruh tubuh. Darah membawa oksigen serta nutrisi yang dibutuhkan oleh sel."
    },
    {
        keywords: ["planet", "tata surya"],
        answer: "Tata surya terdiri dari Matahari dan benda-benda langit yang terikat oleh gravitasinya, termasuk delapan planet yang mengorbit Matahari."
    },
    {
        keywords: ["halo", "hai", "hello", "assalamualaikum"],
        answer: "Halo! Senang bisa menemanimu belajar. Kamu bisa bertanya tentang fotosintesis, gravitasi, matematika dasar, atau tips belajar."
    }
];

function getAssistantAnswer(question) {
    const normalizedQuestion = question
        .toLocaleLowerCase("id-ID")
        .replace(/[?!.,;:]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (!normalizedQuestion) {
        return "Silakan tuliskan pertanyaan terlebih dahulu.";
    }

    let bestMatch = null;
    let highestScore = 0;

    knowledgeBase.forEach((item) => {
        let score = 0;

        item.keywords.forEach((keyword) => {
            const normalizedKeyword = keyword.toLocaleLowerCase("id-ID");

            if (normalizedQuestion.includes(normalizedKeyword)) {
                // Frasa yang lebih spesifik mendapat bobot lebih tinggi.
                score = Math.max(score, normalizedKeyword.length);
            }
        });

        if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
        }
    });

    if (bestMatch) return bestMatch.answer;

    return "Maaf, aku belum menemukan materi yang cocok dengan pertanyaanmu. Coba gunakan kata kunci seperti fotosintesis, gravitasi, matematika, jantung, atau tips belajar.";
}


/* ========================================
   8. TAMPILKAN PESAN CHAT DENGAN AMAN
======================================== */

const chatForm = $("#chat-form");
const chatInput = $("#chat-input");
const chatMessages = $("#chat-messages");

function addChatMessage(message, sender) {
    const messageElement = createElement(
        "div",
        `chat-message ${sender === "user" ? "user-message" : "assistant-message"}`
    );

    const paragraph = createElement("p", "", message);

    // Menggunakan textContent agar teks pengguna tidak diperlakukan sebagai HTML.
    messageElement.appendChild(paragraph);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendAssistantQuestion(question) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    addChatMessage(trimmedQuestion, "user");

    const answer = getAssistantAnswer(trimmedQuestion);
    addChatMessage(answer, "assistant");
}

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const question = chatInput.value;
    if (!question.trim()) return;

    sendAssistantQuestion(question);
    chatInput.value = "";
    chatInput.focus();
});

$$(".suggestion-chip").forEach((button) => {
    button.addEventListener("click", () => {
        const question = button.dataset.question;
        sendAssistantQuestion(question);
    });
});


/* ========================================
   9. STATISTIK DASHBOARD
======================================== */

function updateDashboard() {
    const totalNotesElement = $("#total-notes");
    const totalQuizzesElement = $("#total-quizzes");
    const totalMaterialsElement = $("#total-materials");
    const learningProgressElement = $("#learning-progress");

    if (totalNotesElement) {
        totalNotesElement.textContent = String(notes.length);
    }

    if (totalQuizzesElement) {
        totalQuizzesElement.textContent = String(quizCount);
    }

    if (totalMaterialsElement) {
        totalMaterialsElement.textContent = String(knowledgeBase.length);
    }

    if (learningProgressElement) {
        learningProgressElement.textContent = `${quizProgress}%`;
    }
}


/* ========================================
   10. INISIALISASI WEBSITE
======================================== */

function initializeStudyMate() {
    renderNotes();
    renderFlashcard();
    updateDashboard();
    showPage("dashboard");
}

initializeStudyMate();

// Background partikel digital StudyMate
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId;

function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Batasi jumlah partikel agar tetap ringan
    const total = Math.min(
        45,
        Math.floor(window.innerWidth / 25)
    );

    particles = Array.from({ length: total }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
    }));
}

function drawParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > window.innerWidth) {
            p.speedX *= -1;
        }

        if (p.y < 0 || p.y > window.innerHeight) {
            p.speedY *= -1;
        }

        // Titik cahaya
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(91, 108, 255, 0.45)";
        ctx.fill();

        // Garis tipis antartitik yang berdekatan
        for (let j = i + 1; j < particles.length; j++) {
            const other = particles[j];
            const dx = p.x - other.x;
            const dy = p.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 110) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(other.x, other.y);

                ctx.strokeStyle =
                    `rgba(111, 92, 255, ${0.12 * (1 - distance / 110)})`;

                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    animationId = requestAnimationFrame(drawParticles);
}

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

function startParticles() {
    cancelAnimationFrame(animationId);

    if (reduceMotion.matches) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        return;
    }

    drawParticles();
}

resizeCanvas();
startParticles();

window.addEventListener("resize", () => {
    resizeCanvas();
});

reduceMotion.addEventListener("change", startParticles);
